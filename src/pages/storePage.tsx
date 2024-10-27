import StoreComponent from "../components/storeCardComponent"
import restService from "../utils/restService"
import { Store } from "../models/store"
import { useEffect } from "react"
import SearchStoreComponent from "../components/searchStore"

export default function StorePage({localStores, setLocalStores, searchStores, setSearchStores}: {localStores: Store[], setLocalStores: (localStores: Store[]) => void, searchStores: Store[], setSearchStores:(searchStores: Store[]) => void}) {

    useEffect(() => {
        getStores()
    }, [])

    async function getStores() {
        setSearchStores(await restService.getStores())
    }
    return (
        <div className="flex flex-col gap-2 p-2">
            <SearchStoreComponent setStores={setSearchStores} />
            {/* <button className="btn btn-primary" onClick={getStores}>Get Store</button> */}
            <div className="flex flex-row flex-wrap gap-2">
                {searchStores.map((store) => (
                    <StoreComponent key={store.id} store={store} localStores={localStores} setLocalStores={setLocalStores} />
                ))}
            </div>
        </div>
    )
}
