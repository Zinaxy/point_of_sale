import EditCategoryDialog from '@/components/forms/EditCategoryDialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Category, PaginatedData } from '@/types';
import { Link } from '@inertiajs/react';
import { Trash } from 'lucide-react';

const CategoryTable = ({ categories, query }: { categories: PaginatedData<Category>; query: string }) => {
    /* search queries */
    const filteredCategories = categories.data.filter((category: Category) => {
        const lowerCaseQuery = query.toLowerCase();
        return category.name.toLowerCase().includes(lowerCaseQuery) || category.description.toLowerCase().includes(lowerCaseQuery);
    });

    return (
        <Table>
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader>
                <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Products</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {filteredCategories.length >= 1 ? (
                    filteredCategories.map((category: Category, idx) => (
                        <TableRow key={category.id} className="text-start">
                            <TableCell className="font-medium">{idx}</TableCell>
                            <TableCell>{category.name}</TableCell>
                            <TableCell className="flex">
                                {category.description.slice(0, 120)}
                                ....
                            </TableCell>
                            <TableCell className="">{category.products.length}</TableCell>
                            <TableCell className="flex">
                                <EditCategoryDialog category={category} />
                                {/*                                 <Link href={route('category.index')}>
                                    <span className="rounded font-bold text-sky-500">
                                        <Edit className="mr-3" />
                                    </span>
                                </Link> */}
                                <Link method="delete" href={route('category.destroy', category.id)}>
                                    <span className="rounded font-bold text-red-500">
                                        <Trash className="mr-3" />
                                    </span>
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow className="my-10">
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell className="ny-10 text-bold rounded bg-red-300 px-10 py-4 text-center text-lg">No categories Found</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default CategoryTable;
