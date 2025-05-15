import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Product } from '@/types';
import { useForm } from '@inertiajs/react';
import { Loader } from 'lucide-react';
import { FormEventHandler } from 'react';

const EditProductForm = ({ product }: { product: Product }) => {
    const { data, setData, errors, put, processing } = useForm({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        units: product.inventory.units || '',
        cases: product.inventory.cases || '',
        image: null as File | null,
    });

    const updateProduct: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('product.update', product.id), {
            preserveScroll: true,
            preserveState: true,
        });
    };
    return (
        <form onSubmit={updateProduct} className="flex w-full flex-col gap-4">
            {/* Product Name */}
            <div className="grid gap-3">
                <Label htmlFor="name">Product Name</Label>
                <Input
                    id="name"
                    type="text"
                    autoFocus
                    tabIndex={1}
                    autoComplete="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    disabled={processing}
                    className={errors.name ? 'border-red-500' : ''}
                />
                <InputError message={errors.name} className="mt-2" />
            </div>

            {/* Product Image */}
            <div className="grid gap-3">
                <Label htmlFor="image">Product Image</Label>
                <Input
                    id="image"
                    type="file"
                    tabIndex={2}
                    onChange={(e) => setData('image', e.target.files?.[0] || null)}
                    disabled={processing}
                    className={errors.image ? 'border-red-500' : ''}
                    accept="image/*"
                />
                <InputError message={errors.image} className="mt-2" />
            </div>

            {/* Quantity and Items per Case */}
            <div className="mt-2 flex flex-col gap-2 md:flex-row">
                <div className="grid w-full gap-3">
                    <Label htmlFor="quantity">Quantity (cases)</Label>
                    <Input
                        id="quantity"
                        type="number"
                        tabIndex={3}
                        autoComplete="quantity"
                        value={data.cases}
                        onChange={(e) => setData('cases', e.target.value)}
                        disabled={processing}
                        className={errors.cases ? 'border-red-500' : ''}
                    />
                    <InputError message={errors.cases} className="mt-2" />
                </div>
                <div className="grid w-full gap-3">
                    <Label htmlFor="case_quantity">Items / Case</Label>
                    <Input
                        id="case_quantity"
                        type="number"
                        tabIndex={4}
                        autoComplete="case_quantity"
                        value={data.units}
                        onChange={(e) => setData('units', e.target.value)}
                        disabled={processing}
                        className={errors.units ? 'border-red-500' : ''}
                    />
                    <InputError message={errors.units} className="mt-2" />
                </div>
            </div>

            {/* Price */}
            <div className="grid gap-3">
                <Label htmlFor="price">Price</Label>
                <Input
                    id="price"
                    type="number"
                    step="0.01"
                    tabIndex={5}
                    autoComplete="price"
                    value={data.price}
                    onChange={(e) => setData('price', e.target.value)}
                    disabled={processing}
                    className={errors.price ? 'border-red-500' : ''}
                />
                <InputError message={errors.price} className="mt-2" />
            </div>

            {/* Description */}
            <div className="mt-4 grid gap-3">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    rows={6}
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    disabled={processing}
                    className={errors.description ? 'border-red-500' : ''}
                />
                <InputError message={errors.description} className="mt-2" />
            </div>

            {/* Submit Button */}
            <div className="mt-4">
                <Button disabled={processing} className={!processing ? 'cursor-pointer' : 'cursor-progress'}>
                    {processing ? (
                        <span className="flex gap-4">
                            <Loader className="animate-spin" /> Submitting
                        </span>
                    ) : (
                        'Submit'
                    )}
                </Button>
            </div>
        </form>
    );
};

export default EditProductForm;
