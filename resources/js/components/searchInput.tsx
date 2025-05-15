const SearchInput = ({ ...props }) => {
    return (
        <div>
            <input
                className="border-input bg-background ring-offset-background file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                {...props}
            />
            {/*  <button className="absolute top-1 right-1 my-auto flex h-8 w-8 items-center rounded px-2" type="button">
                <Search className="text-muted-foreground h-8 w-8" />
            </button> */}
        </div>
    );
};

export default SearchInput;
