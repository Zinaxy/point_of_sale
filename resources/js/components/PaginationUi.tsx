const PaginationUi = () => {
    return (
        <div className="flex items-center justify-between px-4 py-3">
            <div className="text-sm text-slate-500">
                Showing <b>1-5</b> of 45
            </div>
            <div className="flex space-x-1">
                <button className="ease min-h-9 min-w-9 rounded border border-slate-200 bg-white px-3 py-1 text-sm font-normal text-slate-500 transition duration-200 hover:border-slate-400 hover:bg-slate-50">
                    Prev
                </button>
                <button className="ease min-h-9 min-w-9 rounded border border-slate-800 bg-slate-800 px-3 py-1 text-sm font-normal text-white transition duration-200 hover:border-slate-600 hover:bg-slate-600">
                    1
                </button>
                <button className="ease min-h-9 min-w-9 rounded border border-slate-200 bg-white px-3 py-1 text-sm font-normal text-slate-500 transition duration-200 hover:border-slate-400 hover:bg-slate-50">
                    2
                </button>
                <button className="ease min-h-9 min-w-9 rounded border border-slate-200 bg-white px-3 py-1 text-sm font-normal text-slate-500 transition duration-200 hover:border-slate-400 hover:bg-slate-50">
                    3
                </button>
                <button className="ease min-h-9 min-w-9 rounded border border-slate-200 bg-white px-3 py-1 text-sm font-normal text-slate-500 transition duration-200 hover:border-slate-400 hover:bg-slate-50">
                    Next
                </button>
            </div>
        </div>
    );
};

export default PaginationUi;
