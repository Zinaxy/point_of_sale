import SearchInput from '@/components/searchInput';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Category, PaginatedData } from '@/types';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
// Components...

import CreateCategoryDialog from '@/components/forms/CreateCategoryDialog';
import PaginationUi from '@/components/PaginationUi';
import CategoryTable from './partials/CategoryTable';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/product',
    },
];

const Index = ({ success, categories }: { success: string; categories: PaginatedData<Category> }) => {
    useEffect(() => {
        if (success) {
            toast.success(success); // Trigger toast notification for success
        }
    }, [success]);
    // console.log(products);
    /* search queries */
    const [query, setQuery] = useState('');
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className="m-10">
                <div className="">
                    <div className="mt-1 mb-3 flex w-full items-baseline justify-between pl-3">
                        <div className="w-full">
                            <h3 className="my-4 text-lg font-semibold">Products Details</h3>
                            <CreateCategoryDialog />
                        </div>
                        <div className="ml-3 w-full">
                            <div className="relative w-full">
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
                        <div className="mb-4">
                            <CategoryTable categories={categories} query={query} />
                        </div>
                        <div className="">
                            <PaginationUi />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Index;
