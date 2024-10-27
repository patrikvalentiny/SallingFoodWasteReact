import React, { useState } from 'react';
import restService from '../utils/restService';
import { Store } from '../models/store';

export default function SearchStoreComponent({ setStores }: { setStores: (stores: Store[]) => void }) {
    const [query, setQuery] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleSearch(event.target.value);
        setQuery(event.target.value);
    };

    const handleSearch = async (q: string) => {
        if (q.length < 3) {
            return;
        }
        const num = Number(q);
        if (!isNaN(num) && q.length === 4) {
            const stores : Store[] = await restService.getStoreByZip(num);
            setStores(stores);
        } else if  (isNaN(num)){
            const stores : Store[] = await restService.getStoreByCity(q);
            setStores(stores);
        }
    };

    return (
        <div>
            <label className="input input-bordered flex items-center gap-2">
                <input
                    type="text"
                    className="grow"
                    placeholder="Search by zip code or city"
                    value={query}
                    onChange={handleInputChange}
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path
                        fillRule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clipRule="evenodd" />
                </svg>
            </label>
        </div>
    );
}