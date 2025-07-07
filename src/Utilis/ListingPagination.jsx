import React from 'react'

const ListingPagination = ({ page, total_pages, onPageChange }) => {

    const generatePageNumbers = () => {
        const visiblePages = 5;
        const pages = [];

        let start = Math.max(1, page - Math.floor(visiblePages / 2));
        let end = start + visiblePages - 1;

        if (end > total_pages) {
            end = total_pages;
            start = Math.max(1, end - visiblePages + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    };

    const pageNumbers = generatePageNumbers();


    return (
        <div className="flex space-x-1 justify-end  text-sm font-medium">
            {/* First & Prev */}
            <button
                className="px-2 py-1 border rounded hover:bg-gray-200"
                onClick={() => onPageChange(1)}
                disabled={page === 1}
            >
                &lt;
            </button>

            <button
                className="px-2 py-1 border rounded hover:bg-gray-200"
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
            >
                &lt;&lt;
            </button>

            {/* Left Ellipsis */}
            {pageNumbers[0] > 1 && <span className="px-2">...</span>}

            {/* Page Numbers */}
            {pageNumbers.map((num) => (
                <button
                    key={num}
                    onClick={() => onPageChange(num)}
                    className={`px-3 py-1 border rounded ${num === page
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'hover:bg-gray-200'
                        }`}
                >
                    {num}
                </button>
            ))}

            {/* Right Ellipsis */}
            {pageNumbers[pageNumbers.length - 1] < total_pages && (
                <span className="px-2">...</span>
            )}

            {/* Next & Last */}
            <button
                className="px-2 py-1 border rounded hover:bg-gray-200"
                onClick={() => onPageChange(page + 1)}
                disabled={page === total_pages}
            >
                &gt;&gt;
            </button>

            <button
                className="px-2 py-1 border rounded hover:bg-gray-200"
                onClick={() => onPageChange(total_pages)}
                disabled={page === total_pages}
            >
                &gt;
            </button>
        </div>
    )
}

export default ListingPagination
