import React from 'react';
import { Search as SearchIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';

interface SearchProps {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    handleSearch: (e: React.FormEvent) => void;
}

function Search({ search, setSearch, handleSearch }: SearchProps) {
    return (
        <form onSubmit={handleSearch} className="relative w-full rounded-md">
            <Input
                type="search"
                placeholder="Cari nama lahan..."
                className="w-full lg:w-1/2 pl-12"
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 flex items-center rounded-l-md border bg-primary px-2">
                <SearchIcon className="text-primary-foreground" />
            </div>
        </form>
    );
}

export default Search;
