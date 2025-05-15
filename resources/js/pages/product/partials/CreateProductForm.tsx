import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import { Loader } from 'lucide-react';
import { FormEventHandler } from 'react';

const CreateProductForm = () => {
    const { data, setData, errors, post, processing } = useForm({
        name: '',
        description: '',
        cases: '',
        units: '',
        cost: '',
        price: '',
        shop: '',
        image: null as File | null, // Initialize as empty string
    });

    const createProduct: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('product.store'), {
            preserveScroll: true,
        });
    };

    return (
        <form onSubmit={createProduct} className="flex w-full flex-col gap-4">
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

            {/* Cases and Items per Case */}
            <div className="mt-2 flex flex-col gap-2 md:flex-row">
                {/* Shop Selection */}
                <div className="grid gap-3">
                    <Label htmlFor="shop">Shop Name</Label>
                    <Select value={data.shop_id} onValueChange={(value) => setData('shop_id', value)}>
                        <SelectTrigger id="shop" className={`w-full ${errors.cases ? 'border-red-500' : ''}`}>
                            <SelectValue placeholder="Select a shop" />
                        </SelectTrigger>
                        <SelectContent>
                            {shops.map((shop: Shop) => (
                                <SelectItem value={String(shop.id)} key={shop.id}>
                                    {shop.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={errors.shop_id} className="mt-2" />
                </div>
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

            {/* Cases and Items per Case */}
            <div className="mt-2 flex flex-col gap-2 md:flex-row">
                <div className="grid w-full gap-3">
                    <Label htmlFor="cases">Cases (cases)</Label>
                    <Input
                        id="cases"
                        type="number"
                        tabIndex={3}
                        autoComplete="cases"
                        value={data.cases}
                        onChange={(e) => setData('cases', e.target.value)}
                        disabled={processing}
                        className={errors.cases ? 'border-red-500' : ''}
                    />
                    <InputError message={errors.cases} className="mt-2" />
                </div>
                <div className="grid w-full gap-3">
                    <Label htmlFor="units">Items / Case</Label>
                    <Input
                        id="units"
                        type="number"
                        tabIndex={4}
                        autoComplete="units"
                        value={data.units}
                        onChange={(e) => setData('units', e.target.value)}
                        disabled={processing}
                        className={errors.units ? 'border-red-500' : ''}
                    />
                    <InputError message={errors.units} className="mt-2" />
                </div>
            </div>

            {/* Price */}
            <div className="mt-2 flex flex-col gap-2 md:flex-row">
                <div className="grid w-full gap-3">
                    <Label htmlFor="price">Cost</Label>
                    <Input
                        id="cost"
                        type="number"
                        step="0.01"
                        tabIndex={5}
                        autoComplete="cost"
                        value={data.cost}
                        onChange={(e) => setData('cost', e.target.value)}
                        disabled={processing}
                        className={errors.cost ? 'border-red-500' : ''}
                    />
                    <InputError message={errors.cost} className="mt-2" />
                </div>
                <div className="grid w-full gap-3">
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

export default CreateProductForm;
