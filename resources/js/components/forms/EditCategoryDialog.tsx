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
import { Category } from '@/types';
import { useForm } from '@inertiajs/react';
import { Edit, Loader } from 'lucide-react';
import { FormEventHandler } from 'react';
import { Textarea } from '../ui/textarea';

const EditCategoryDialog = ({ category }: { category: Category }) => {
    const { data, setData, put, processing, errors, clearErrors, reset } = useForm({
        name: category.name || '',
        description: category.description || '',
    });
    const createCategory: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('category.update', category.id), {
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
                <span className="cursor-pointer rounded font-bold text-sky-500">
                    <Edit className="mr-3" />
                </span>
            </DialogTrigger>
            <DialogContent className="w-full max-w-screen-md">
                <DialogHeader>
                    <DialogTitle>Add Category</DialogTitle>
                    <DialogDescription>.</DialogDescription>
                </DialogHeader>
                <form onSubmit={createCategory} className="flex w-full flex-col gap-4">
                    <div className="grid w-full gap-3">
                        <Label htmlFor="name">
                            Category Name <span className="ml-2 text-lg text-red-500">*</span>
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
                                'Submit'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditCategoryDialog;
