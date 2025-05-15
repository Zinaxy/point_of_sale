import { Link } from '@inertiajs/react';

const LinkBtn = ({ linkUrl, className, children, ...props }: { linkUrl: string; className: string; children: React.ReactNode }) => {
    return (
        <Link href={route(linkUrl)} className={`bg-primary cursor-pointer rounded px-4 py-2 text-gray-950 ${className}`} {...props}>
            {children}
        </Link>
    );
};

export default LinkBtn;
