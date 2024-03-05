'use client';

import React from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { SearchIcon } from 'lucide-react';

interface SearchProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  action: (searchParam: string) => void;
}

export default function Search({ search, setSearch, action }: SearchProps) {
  return (
    <div>
      <Label htmlFor="search">Buscar</Label>
      <div className="flex items-center justify-between gap-2">
        <Input
          id="search"
          placeholder="Introduce el titulo del trabajo que buscas"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <Button size="icon" onClick={() => action(search)}>
          <SearchIcon size={18} />
        </Button>
      </div>
    </div>
  );
}
