import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import CreateProductForm from './partials/CreateProductForm';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Product',
        href: '/product/create',
    },
];

const Create = () => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Product" />
            <div className="m-20 flex h-full flex-1 flex-col items-center justify-baseline gap-4 rounded-xl p-4">
                <div className="w-1/2">
                    <CreateProductForm />
                </div>
            </div>
        </AppLayout>
    );
};

export default Create;
