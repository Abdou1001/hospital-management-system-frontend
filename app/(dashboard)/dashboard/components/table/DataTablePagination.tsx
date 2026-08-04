"use client";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface DataTablePaginationProps {
    page: number;
    totalPages: number;
    totalResults: number;
    onPageChange: (page: number) => void;
}

export function DataTablePagination({
    page,
    totalPages,
    totalResults,
    onPageChange,
}: DataTablePaginationProps) {
    const generatePages = () => {
        const pages: (number | "...")[] = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);

            if (page > 3) {
                pages.push("...");
            }

            const start = Math.max(2, page - 1);
            const end = Math.min(totalPages - 1, page + 1);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (page < totalPages - 2) {
                pages.push("...");
            }

            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className="mt-4 flex flex-col items-center justify-between gap-4 border-t pt-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
                إجمالي النتائج: {totalResults}
            </p>

            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();

                                if (page > 1) {
                                    onPageChange(page - 1);
                                }
                            }}
                            aria-disabled={page === 1}
                            className={
                                page === 1
                                    ? "pointer-events-none opacity-50"
                                    : ""
                            }
                        />
                    </PaginationItem>

                    {generatePages().map((item, index) => (
                        <PaginationItem key={index}>
                            {item === "..." ? (
                                <PaginationEllipsis />
                            ) : (
                                <PaginationLink
                                    href="#"
                                    isActive={item === page}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onPageChange(item);
                                    }}>
                                    {item}
                                </PaginationLink>
                            )}
                        </PaginationItem>
                    ))}

                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();

                                if (page < totalPages) {
                                    onPageChange(page + 1);
                                }
                            }}
                            aria-disabled={page === totalPages}
                            className={
                                page === totalPages
                                    ? "pointer-events-none opacity-50"
                                    : ""
                            }
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
