import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Shop } from '@/types';
import { Head } from '@inertiajs/react';
import EditShopForm from './partials/EditShopForm';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit Shop',
        href: '/shop',
    },
];

const Edit = ({ shop }: { shop: Shop }) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Shop" />
            <div className="m-20 flex h-full flex-1 flex-col items-center justify-baseline gap-4 rounded-xl p-4">
                <div className="w-1/2">
                    <EditShopForm shop={shop} />
                </div>
            </div>
        </AppLayout>
    );
};

export default Edit;
