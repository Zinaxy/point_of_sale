import LinkBtn from '@/components/LinkBtn';
import ProductDropdown from '@/components/product-dropdown';
import SearchInput from '@/components/searchInput';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, PaginatedData, Product } from '@/types';
import { Head } from '@inertiajs/react';
import { DollarSignIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/product',
    },
];

const Index = ({ success, products }: { success: string; products: PaginatedData<Product> }) => {
    useEffect(() => {
        if (success) {
            toast.success(success); // Trigger toast notification for success
        }
    }, [success]);

    /* search queries */
    const [query, setQuery] = useState('');

    const filteredProducts = products.data.filter((product: Product) => {
        const lowerCaseQuery = query.toLowerCase();
        return product.name.toLowerCase().includes(lowerCaseQuery) || product.description.toLowerCase().includes(lowerCaseQuery);
    });
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className="m-10">
                <div className="">
                    <div className="mt-1 mb-3 flex w-full items-center justify-between pl-3">
                        <div>
                            <h3 className="my-2 text-lg font-semibold">Products Details</h3>
                            <LinkBtn linkUrl="product.create" className="my-4">
                                Add Product
                            </LinkBtn>
                        </div>
                        <div className="ml-3">
                            <div className="relative w-full max-w-sm min-w-[200px]">
                                <div className="relative">
                                    <SearchInput
                                        placeholder="Search Product"
                                        onChange={(e: { target: { value: string } }) => setQuery(e.target.value.toLowerCase())}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative mt-10 flex h-full w-full flex-col rounded-lg bg-clip-border shadow-md">
                        <Table>
                            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead className="flex items-center gap-2">
                                        <DollarSignIcon size={20} />
                                        Price
                                    </TableHead>
                                    <TableHead>Created Date</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredProducts.length >= 1 ? (
                                    filteredProducts.map((product: Product, idx) => (
                                        <TableRow key={product.id}>
                                            <TableCell className="font-medium">{idx}</TableCell>
                                            <TableCell>{product.name}</TableCell>
                                            <TableCell>{product.description}</TableCell>
                                            <TableCell>{product.price}</TableCell>
                                            <TableCell>{product.created_at}</TableCell>
                                            <TableCell className="text-right">
                                                <ProductDropdown productId={product.id} />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow className="my-10">
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell className="ny-10 text-bold rounded bg-red-300 px-10 py-4 text-center text-lg">
                                            No products Found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>

                        {/* <div className="flex items-center justify-between px-4 py-3">
                            <div className="text-sm text-slate-500">
                                Showing <b>1-5</b> of 45
                            </div>
                            <div className="flex space-x-1">
                                <button className="ease min-h-9 min-w-9 rounded border border-slate-200 bg-white px-3 py-1 text-sm font-normal text-slate-500 transition duration-200 hover:border-slate-400 hover:bg-slate-50">
                                    Prev
                                </button>
                                <button className="ease min-h-9 min-w-9 rounded border border-slate-800 bg-slate-800 px-3 py-1 text-sm font-normal text-white transition duration-200 hover:border-slate-600 hover:bg-slate-600">
                                    1
                                </button>
                                <button className="ease min-h-9 min-w-9 rounded border border-slate-200 bg-white px-3 py-1 text-sm font-normal text-slate-500 transition duration-200 hover:border-slate-400 hover:bg-slate-50">
                                    2
                                </button>
                                <button className="ease min-h-9 min-w-9 rounded border border-slate-200 bg-white px-3 py-1 text-sm font-normal text-slate-500 transition duration-200 hover:border-slate-400 hover:bg-slate-50">
                                    3
                                </button>
                                <button className="ease min-h-9 min-w-9 rounded border border-slate-200 bg-white px-3 py-1 text-sm font-normal text-slate-500 transition duration-200 hover:border-slate-400 hover:bg-slate-50">
                                    Next
                                </button>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Index;
