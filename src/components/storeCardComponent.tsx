import { Store } from "../models/store"
import storageService, { StorageKey } from "../utils/storageService";



export default function StoreCardComponent({ store, localStores, setLocalStores }: { store: Store, localStores: Store[], setLocalStores: (localStores: Store[]) => void }) {

    const alreadyAdded : boolean = localStores.some((localStore) => localStore.id === store.id);
    
    function addStore() {
        setLocalStores([...localStores, store]);
        const storeIds = [...localStores, store].map((store) => store.id);
        
        storageService.setItem(StorageKey.STORES, JSON.stringify(storeIds));
    };

    function removeStore(): void {
        const newStores = localStores.filter((localStore) => localStore.id !== store.id);
        setLocalStores(newStores);
        const storeIds = newStores.map((store) => store.id);
        storageService.setItem(StorageKey.STORES, JSON.stringify(storeIds));
    }

    return (
        <div className="card bg-base-100 flex-1 basis-1/3 min-w-64 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{store.name}</h2>
                <p>{store.address?.street ?? ''}, {store.address?.zip} {store.address?.city}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary"  onClick={alreadyAdded ? removeStore: addStore}>{alreadyAdded ? 'Remove Store':'Add Store' } </button>
                </div>
            </div>
        </div>
    )
}
