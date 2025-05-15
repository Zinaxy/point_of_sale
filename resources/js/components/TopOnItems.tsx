import { useInitials } from '@/hooks/use-initials';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

const TopOnItems = () => {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const getInitials = useInitials();
    return (
        <>
            <div className="mt-5 flex flex-row items-center justify-between px-5">
                <div className="">
                    <div className="text-xs font-bold">Cashier</div>
                    <div className="text-xl font-bold">{auth.user.name}</div>
                    <span className="text-xs">Location ID#SIMON123</span>
                </div>
                {/*  <div className="flex items-center">
                    <div className="mr-4 text-center text-sm">
                        <div className="font-light text-gray-500">last synced</div>
                        <span className="font-semibold">3 mins ago</span>
                    </div>
                    <div>
                        <span className="rounded bg-gray-200 px-4 py-2 font-semibold text-gray-800">Help</span>
                    </div>
                </div>

                <div className="mt-5 flex flex-row px-5">
                    <span className="mr-4 rounded-2xl bg-yellow-500 px-5 py-1 text-sm text-white">All items</span>
                    <span className="mr-4 rounded-2xl px-5 py-1 text-sm font-semibold">Food</span>
                    <span className="mr-4 rounded-2xl px-5 py-1 text-sm font-semibold">Cold Drinks</span>
                    <span className="mr-4 rounded-2xl px-5 py-1 text-sm font-semibold">Hot Drinks</span>
                </div> */}
            </div>
        </>
    );
};

export default TopOnItems;
