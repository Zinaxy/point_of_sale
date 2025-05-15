import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import { Loader } from 'lucide-react';
import { FormEventHandler } from 'react';

const CreateShopForm = () => {
    const { data, setData, errors, post, processing } = useForm({
        name: '',
        address: '',
        phone: '',
        email: '',
    });

    const createFeature: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('shop.store'), {
            preserveScroll: true,
        });
    };
    return (
        <form onSubmit={createFeature} className="flex w-full flex-col gap-4">
            <div className="grid gap-3">
                <Label htmlFor="name">Shop Name</Label>
                <Input
                    id="name"
                    type="text"
                    autoFocus
                    tabIndex={1}
                    autoComplete="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    disabled={processing}
                    placeholder="Full name"
                    className={errors.name && 'border-red-500'}
                />
                <InputError message={errors.name} className="mt-2" />
            </div>
            <div className="grid gap-3">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                    id="phone"
                    type="text"
                    tabIndex={2}
                    autoComplete="phone"
                    value={data.phone}
                    onChange={(e) => setData('phone', e.target.value)}
                    disabled={processing}
                    placeholder="Phone Number"
                    className={errors.phone && 'border-red-500'}
                />
                <InputError message={errors.phone} className="mt-2" />
            </div>
            <div className="grid gap-3">
                <Label htmlFor="email">Shop Name</Label>
                <Input
                    id="email"
                    type="email"
                    tabIndex={3}
                    autoComplete="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    disabled={processing}
                    placeholder="Email"
                    className={errors.email && 'border-red-500'}
                />
                <InputError message={errors.email} className="mt-2" />
            </div>
            <div className="mt-4 grid gap-3">
                <Label htmlFor="name">Address</Label>
                <Textarea
                    id="address"
                    rows={6}
                    value={data.address}
                    onChange={(e) => setData('address', e.target.value)}
                    disabled={processing}
                    placeholder="Address"
                    className={errors.address && 'border-red-500'}
                ></Textarea>
                <InputError message={errors.address} className="mt-2" />
            </div>
            <div className="mt-4">
                <Button disabled={processing} className={!processing ? 'cursor-pointer' : 'cursor-progress'}>
                    {processing ? (
                        <span className="flex gap-4">
                            <Loader /> Submitting
                        </span>
                    ) : (
                        'Submit'
                    )}
                </Button>
            </div>
        </form>
    );
};

export default CreateShopForm;
