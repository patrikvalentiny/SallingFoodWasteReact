import React, { useEffect, useState } from "react"
import StoreClearancesComponent from "../components/storeClearances"
import StorePage from "./storePage";
import { Store } from "../models/store";
import { StorageKey } from "../utils/storageService";
import restService from "../utils/restService";
import StoreSelectorComponent from "../components/storeSelector";
import { Clearance } from "../models/clearance";


const HomePage: React.FC = () => {
    const modal: HTMLDialogElement = document.getElementById('stores_modal') as HTMLDialogElement;
    const [localStores, setLocalStores] = useState<Store[]>([]);
    const [searchStores, setSearchStores] = useState<Store[]>([])
    const [selectedStore, setSelectedStore] = useState<Store | null>(null);
    const [clearances, setClearances] = useState<Clearance[]>([]);


    useEffect(() => {
        const storesIds: string[] = JSON.parse(localStorage.getItem(StorageKey.STORES) ?? '[]');
        const fetchStores = async () => {
            const stores: Store[] = await Promise.all(storesIds.map((id) => getStore(id)));
            setLocalStores(stores);
        };
        fetchStores();
    }, [])

    async function getStore(id: string): Promise<Store> {
        return await restService.getStoreById(id);
    }

    return (
        <div className="">
            {/* <TokenInputComponent></TokenInputComponent> */}
            <dialog id="stores_modal" className="modal">
                <div className="modal-box w-11/12 max-w-screen-2xl">
                    <div className="flex flex-row justify-between items-center">
                        <h3 className="font-bold text-lg">Add Store</h3>
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-circle btn-ghost">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </form>
                    </div>
                    <StorePage localStores={localStores} setLocalStores={setLocalStores}
                        searchStores={searchStores} setSearchStores={setSearchStores}
                    ></StorePage>
                </div>
                {/* <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form> */}
            </dialog>
            <div className="flex flex-row w-full justify-between p-2 gap-2 fixed top-0 left-0 h-auto z-10 bg-base-100 no-scrollbar">

                <StoreSelectorComponent localStores={localStores} selectedStore={selectedStore} setSelectedStore={setSelectedStore} setClearances={setClearances}></StoreSelectorComponent>
                <button className="btn" onClick={() => modal.showModal()}>+ Add Stores</button>

            </div>
            <StoreClearancesComponent clearances={clearances}></StoreClearancesComponent>
        </div>
    )
}

export default HomePage