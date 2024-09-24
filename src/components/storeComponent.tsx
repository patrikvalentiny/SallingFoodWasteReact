import { Store } from "../models/store"


interface StoreComponentProps {
    store: Store
}

const StoreComponent : React.FC<StoreComponentProps> = (store) => {

    return (
        <div>
            {store.store.name}
        </div>
    )
}

export default StoreComponent