import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Brand, Category, PaginatedData, Product, Shop, Unit } from '@/types';
import { useForm } from '@inertiajs/react';
import { Barcode, Loader, PlusCircleIcon } from 'lucide-react';
import { FormEventHandler } from 'react';
import { Textarea } from '../ui/textarea';

const CreateProductDialog = ({
    shops,
    brands,
    categories,
    units,
    success,
}: {
    shops: PaginatedData<Shop>;
    products: PaginatedData<Product>;
    brands: PaginatedData<Brand>;
    units: PaginatedData<Unit>;
    categories: PaginatedData<Category>;
    success: string;
}) => {
    const { data, setData, post, processing, errors, clearErrors, reset } = useForm({
        name: '',
        barcode: '',
        description: '',
        cases: '',
        units: '',
        cost: '',
        price: '',
        shop_id: '',
        brand_id: '',
        category_id: '',
        unit_id: '',
        image: null as File | null, // Initialize as empty string
    });
    const createProduct: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('product.store'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        clearErrors();
        reset();
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" className="justify-start border">
                    New Product <PlusCircleIcon className="ml-2 h-4 w-10" />
                </Button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-screen-md">
                <DialogHeader>
                    <DialogTitle>Add Inventory</DialogTitle>
                    <DialogDescription>Add inventory details for to your shops</DialogDescription>
                </DialogHeader>
                <form onSubmit={createProduct} className="flex w-full flex-col gap-4">
                    {/* Product Name */}
                    <div className="mt-2 flex flex-col gap-2 md:flex-row">
                        <div className="grid w-full gap-3">
                            <Label htmlFor="name">
                                Product Name <span className="ml-2 text-lg text-red-500">*</span>
                            </Label>
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
                        <div className="grid w-full gap-3">
                            <Label htmlFor="barcode">
                                Barcode <span className="ml-2 text-lg text-red-500"></span>
                            </Label>
                            <div className="relative">
                                <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500">
                                    <Barcode />
                                </span>
                                <Input
                                    id="barcode"
                                    type="text"
                                    tabIndex={2}
                                    autoComplete="barcode"
                                    value={data.barcode}
                                    onChange={(e) => setData('barcode', e.target.value)}
                                    disabled={processing}
                                    className={`pl-12 ${errors.barcode ? 'border-red-500' : ''}`}
                                />
                            </div>

                            <InputError message={errors.barcode} className="mt-2" />
                        </div>
                    </div>
                    {/* Cases and Items per Case */}
                    <div className="mt-2 flex flex-col gap-2 md:flex-row">
                        {/* Shop Selection */}
                        <div className="grid w-full gap-3">
                            <Label htmlFor="shop">Shop Name</Label>
                            <Select value={data.shop_id} onValueChange={(value) => setData('shop_id', value)}>
                                <SelectTrigger id="shop" className={`w-full ${errors.shop_id ? 'border-red-500' : ''}`}>
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
                        {/* Brand Selection */}
                        <div className="grid w-full gap-3">
                            <Label htmlFor="brand">Brand Name</Label>
                            <Select value={data.brand_id} onValueChange={(value) => setData('brand_id', value)}>
                                <SelectTrigger id="brand" className={`w-full ${errors.brand_id ? 'border-red-500' : ''}`}>
                                    <SelectValue placeholder="Select a brand" />
                                </SelectTrigger>
                                <SelectContent>
                                    {brands.map((brand: Brand) => (
                                        <SelectItem value={String(brand.id)} key={brand.id}>
                                            {brand.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.brand_id} className="mt-2" />
                        </div>
                    </div>
                    <div className="mt-2 flex flex-col gap-2 md:flex-row">
                        {/* Category Selection */}
                        <div className="grid w-full gap-3">
                            <Label htmlFor="shop">Category</Label>
                            <Select value={data.category_id} onValueChange={(value) => setData('category_id', value)}>
                                <SelectTrigger id="category" className={`w-full ${errors.category_id ? 'border-red-500' : ''}`}>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category: Category) => (
                                        <SelectItem value={String(category.id)} key={category.id}>
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.category_id} className="mt-2" />
                        </div>
                        {/* Unit Selection */}
                        <div className="grid w-full gap-3">
                            <Label htmlFor="brand">Unit Name</Label>
                            <Select value={data.unit_id} onValueChange={(value) => setData('unit_id', value)}>
                                <SelectTrigger id="unit" className={`w-full ${errors.unit_id ? 'border-red-500' : ''}`}>
                                    <SelectValue placeholder="Select a unit" />
                                </SelectTrigger>
                                <SelectContent>
                                    {units.map((unit: Unit) => (
                                        <SelectItem value={String(unit.id)} key={unit.id}>
                                            {`${unit.name} - ${unit.type}(${unit.symbol})`}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.unit_id} className="mt-2" />
                        </div>
                    </div>

                    {/* Product Image */}
                    <div className="grid gap-3">
                        <Label htmlFor="image">
                            Product Image <span className="ml-2 text-2xl text-red-500"></span>
                        </Label>
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
                            <Label htmlFor="cases">
                                Cases (cases) <span className="ml-2 text-lg text-red-500">*</span>
                            </Label>
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
                            <Label htmlFor="units">
                                Items / Case <span className="ml-2 text-2xl text-red-500"></span>
                            </Label>
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
                            <Label htmlFor="price">
                                Cost<span className="ml-2 text-lg text-red-500">*</span>
                            </Label>
                            <div className="relative">
                                <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500">$</span>
                                <Input
                                    id="cost"
                                    type="number"
                                    step="0.01"
                                    tabIndex={5}
                                    autoComplete="cost"
                                    value={data.cost}
                                    onChange={(e) => setData('cost', e.target.value)}
                                    disabled={processing}
                                    className={`pl-8 ${errors.cost ? 'border-red-500' : ''}`}
                                />
                            </div>

                            <InputError message={errors.cost} className="mt-2" />
                        </div>
                        <div className="grid w-full gap-3">
                            <Label htmlFor="price">
                                Price <span className="ml-2 text-lg text-red-500">*</span>
                            </Label>
                            <div className="relative">
                                <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500">$</span>
                                <Input
                                    id="price"
                                    type="number"
                                    step="0.01"
                                    tabIndex={5}
                                    autoComplete="price"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    disabled={processing}
                                    className={`pl-8 ${errors.price ? 'border-red-500' : ''}`}
                                />
                            </div>
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
                    <DialogFooter className="gap-2">
                        <DialogClose asChild>
                            <Button variant="outline" onClick={closeModal}>
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button type="submit" disabled={processing} className="min-w-[120px]">
                            {processing ? (
                                <span className="flex items-center gap-2">
                                    <Loader className="h-4 w-4 animate-spin" />
                                    Saving...
                                </span>
                            ) : (
                                'Save Inventory'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateProductDialog;
