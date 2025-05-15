import ProductDropdown from '@/components/product-dropdown';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PaginatedData, Product } from '@/types';
import { Image } from 'lucide-react';
const ProductTable = ({ products, query }: { products: PaginatedData<Product>; query: string }) => {
    /* search queries */
    const filteredProducts = products.data.filter((product: Product) => {
        const lowerCaseQuery = query.toLowerCase();
        return product.name.toLowerCase().includes(lowerCaseQuery) || product.description.toLowerCase().includes(lowerCaseQuery);
    });

    console.log(products);
    return products.data.length >= 1 ? (
        <>
            <Table>
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                <TableHeader>
                    <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Image</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Cost</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Unit</TableHead>
                        <TableHead>Created Date</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredProducts.map((product: Product, idx) => (
                        <TableRow key={product.id} className="text-start">
                            <TableCell className="font-medium">{idx}</TableCell>
                            <TableCell>
                                <Avatar className="size-8 overflow-hidden rounded-full">
                                    <AvatarImage src={`files/products/${product.image}`} alt={product.name} />
                                    <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                        <Image />
                                    </AvatarFallback>
                                </Avatar>
                            </TableCell>
                            <TableCell>
                                {product.name}
                                {product.brand != null && <>({product.brand.name})</>}
                            </TableCell>
                            <TableCell>{product.description}</TableCell>
                            <TableCell>{product.quantity}</TableCell>
                            <TableCell>{product.cost}</TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell>
                                {product.unit != null && (
                                    <>
                                        {product.unit.type}({product.unit.symbol})
                                    </>
                                )}
                            </TableCell>
                            <TableCell>{product.created_at}</TableCell>
                            <TableCell className="text-right">
                                <ProductDropdown productId={product.id} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    ) : (
        <>
            <p className="ny-10 text-bold rounded bg-red-300 px-10 py-4 text-center text-lg">No products Found</p>
        </>
    );
};

export default ProductTable;
