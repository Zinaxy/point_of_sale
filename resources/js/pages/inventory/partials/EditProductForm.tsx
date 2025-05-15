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
    });

    const createFeature: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('product.update', product.id), {
            preserveScroll: true,
            preserveState: true,
        });
    };
    return (
        <form onSubmit={createFeature} className="flex w-full flex-col gap-4">
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
                    placeholder="Full name"
                    className={errors.name && 'border-red-500'}
                />
                <InputError message={errors.name} className="mt-2" />
            </div>
            <div className="grid gap-3">
                <Label htmlFor="price">Price</Label>
                <Input
                    id="price"
                    type="text"
                    tabIndex={2}
                    autoComplete="price"
                    value={data.price}
                    onChange={(e) => setData('price', e.target.value)}
                    disabled={processing}
                    placeholder="Price Number"
                    className={errors.price && 'border-red-500'}
                />
                <InputError message={errors.price} className="mt-2" />
            </div>

            <div className="mt-4 grid gap-3">
                <Label htmlFor="name">Description</Label>
                <Textarea
                    id="description"
                    rows={6}
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    disabled={processing}
                    placeholder="Address"
                    className={errors.description && 'border-red-500'}
                ></Textarea>
                <InputError message={errors.description} className="mt-2" />
            </div>
            <div className="mt-4">
                <Button disabled={processing} className={!processing ? 'cursor-pointer' : 'cursor-progress'}>
                    {processing ? (
                        <span className="flex gap-4">
                            <Loader /> Submitting
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
