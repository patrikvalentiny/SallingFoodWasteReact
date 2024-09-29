import StoreComponent from "../components/storeComponent"
import restService from "../utils/restService"
import { Store } from "../models/store"
import { useEffect, useState } from "react"
import SearchStore from "../components/searchStore"

const StorePage = () => {
    const [stores, setStores] = useState<Store[]>([])

    useEffect(() => {
        getStores()
    }, [])

    async function getStores() {
        setStores(await restService.getStores())
    }
    return (
        <div className="p-2">
            <SearchStore setStores={setStores} />
            {/* <button className="btn btn-primary" onClick={getStores}>Get Store</button> */}
            {stores.map((store) => (
                <StoreComponent key={store.id} store={store} />
            ))}
        </div>
    )
}

export default StorePage