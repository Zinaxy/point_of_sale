import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Product } from '@/types';
import { Head } from '@inertiajs/react';
import EditProductForm from './partials/EditProductForm';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit Product',
        href: '/product',
    },
];

const Edit = ({ product }: { product: Product }) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Product" />
            <div className="m-20 flex h-full flex-1 flex-col items-center justify-baseline gap-4 rounded-xl p-4">
                <div className="w-1/2">
                    <EditProductForm product={product} />
                </div>
            </div>
        </AppLayout>
    );
};

export default Edit;
