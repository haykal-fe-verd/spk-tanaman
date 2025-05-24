import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from '@/lib/utils';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface PaginationProps {
    pagination: {
        pageIndex: number;
        pageSize: number;
    };
    setPagination: React.Dispatch<
        React.SetStateAction<{
            pageIndex: number;
            pageSize: number;
        }>
    >;
    currentPage: number;
    lastPage: number;
}

function Pagination({ pagination, setPagination, currentPage, lastPage }: PaginationProps) {
    return (
        <div
            className={cn(
                'flex w-full flex-col-reverse items-center justify-between gap-4 overflow-auto p-1 sm:flex-row sm:gap-8'
            )}
        >
            {/* kiri */}
            <div className="flex-1 whitespace-nowrap text-muted-foreground text-sm">
                <div className="flex items-center space-x-2">
                    <p className="whitespace-nowrap font-medium text-sm">Baris per halaman</p>
                    <Select
                        value={pagination.pageSize.toString()}
                        onValueChange={e =>
                            setPagination(prev => ({
                                ...prev,
                                pageSize: Number(e),
                                pageIndex: 0,
                            }))
                        }
                    >
                        <SelectTrigger className="h-8 w-[4.5rem] [&[data-size]]:h-8">
                            <SelectValue placeholder={pagination.pageSize.toString()} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[6, 9, 15, 30].map(pageSize => (
                                <SelectItem key={pageSize} value={`${pageSize}`}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
                <div className="flex items-center justify-center font-medium text-sm">
                    Halaman {currentPage} dari {lastPage}
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        aria-label="Go to previous page"
                        variant="outline"
                        size="icon"
                        className="size-8"
                        onClick={() =>
                            setPagination(prev => ({
                                ...prev,
                                pageIndex: currentPage - 2,
                            }))
                        }
                        disabled={currentPage <= 1}
                    >
                        <ChevronLeft />
                    </Button>
                    <Button
                        aria-label="Go to next page"
                        variant="outline"
                        size="icon"
                        className="size-8"
                        disabled={currentPage >= lastPage}
                        onClick={() =>
                            setPagination(prev => ({
                                ...prev,
                                pageIndex: currentPage,
                            }))
                        }
                    >
                        <ChevronRight />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Pagination;
