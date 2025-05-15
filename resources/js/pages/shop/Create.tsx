import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import CreateShopForm from './partials/CreateShopForm';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Shop',
        href: '/shop/create',
    },
];

const Create = () => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Shop" />
            <div className="m-20 flex h-full flex-1 flex-col items-center justify-baseline gap-4 rounded-xl p-4">
                <div className="w-1/2">
                    <CreateShopForm />
                </div>
            </div>
        </AppLayout>
    );
};

export default Create;
