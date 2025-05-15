import Dropdown from '@/components/dropdown';
import LinkBtn from '@/components/LinkBtn';
import SearchInput from '@/components/searchInput';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, PaginatedData, Shop } from '@/types';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Shops',
        href: '/shop',
    },
];

const Index = ({ success, shops }: { success: string; shops: PaginatedData<Shop> }) => {
    useEffect(() => {
        if (success) {
            toast.success(success); // Trigger toast notification for success
        }
    }, [success]);

    /* search queries */
    const [query, setQuery] = useState('');

    const filteredShops = shops.data.filter((shop: Shop) => {
        const lowerCaseQuery = query.toLowerCase();
        return shop.name.toLowerCase().includes(lowerCaseQuery) || shop.address.toLowerCase().includes(lowerCaseQuery);
    });
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Shops" />
            <div className="m-10">
                <div className="">
                    <div className="mt-1 mb-3 flex w-full items-center justify-between pl-3">
                        <div>
                            <h3 className="my-2 text-lg font-semibold">Shops / branches</h3>
                            <LinkBtn linkUrl="shop.create" className="my-4">
                                Add Shop
                            </LinkBtn>
                        </div>
                        <div className="ml-3">
                            <div className="relative w-full max-w-sm min-w-[200px]">
                                <div className="relative">
                                    <SearchInput
                                        placeholder="Search Shop"
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
                                    <TableHead>Address</TableHead>
                                    <TableHead>Phone</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Created Date</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredShops.map((shop: Shop, idx) => (
                                    <TableRow key={shop.id}>
                                        <TableCell className="font-medium">{idx}</TableCell>
                                        <TableCell>{shop.name}</TableCell>
                                        <TableCell>{shop.address}</TableCell>
                                        <TableCell>{shop.phone}</TableCell>
                                        <TableCell>{shop.email}</TableCell>
                                        <TableCell>{shop.created_at}</TableCell>
                                        <TableCell className="text-right">
                                            <Dropdown shopId={shop.id} />
                                        </TableCell>
                                    </TableRow>
                                ))}
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
