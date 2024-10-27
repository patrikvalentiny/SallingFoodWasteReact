import { useCallback, useEffect } from "react";
import { Clearance } from "../models/clearance";
import { Store } from "../models/store";
import restService from "../utils/restService";
import storageService, { StorageKey } from "../utils/storageService";

export default function StoreSelectorComponent({ localStores, selectedStore, setSelectedStore, setClearances }: { localStores: Store[], selectedStore: Store | null, setSelectedStore: (store: Store) => void, setClearances: (clearances: Clearance[]) => void }) {
    
    const setStore = useCallback(async (store: Store) => {
        setSelectedStore(store);
        if (store.id) {
            const clearances = await restService.getStoreClearances(store.id);
            setClearances(clearances);
        }
        storageService.setItem(StorageKey.LAST_STORE_ID, store.id);
    }, [setSelectedStore, setClearances]);

    useEffect(() => {
        const lastStoreId = storageService.getItem(StorageKey.LAST_STORE_ID);
        const store = localStores.find((store) => store.id === lastStoreId);
        if (store) {
            setStore(store);
        }
    }, [localStores, setStore])

    return (
        <div className="flex flex-row overflow-x-auto">
            {localStores.map((store) => (
                <div>
                    <button className='btn btn-ghost' key={store.id} onClick={() => setStore(store)}>
                        {store.name}
                    </button>
                    <div className={selectedStore?.id === store.id ? 'border-b-primary border-b-4 rounded-btn shadow-md shadow-pri' : ''}/>
                </div>
            ))}
        </div>
    )

}