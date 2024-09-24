import StoreComponent from "../components/storeComponent"
import restService from "../utils/restService"
import { Store } from "../models/store"
import { useState } from "react"

const StorePage = () => {
    const [stores, setStores] = useState<Store[]>([])
    async function getStore() {
        setStores(await restService.getStores())
    }
    return (
        <div>
            <button className="btn btn-primary" onClick={getStore}>Get Store</button>
            {stores.map((store) => (
                <StoreComponent key={store.id} store={store} />
            ))}
        </div>
    )
}

export default StorePage