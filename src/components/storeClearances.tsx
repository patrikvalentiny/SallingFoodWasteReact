import React, { useState, useEffect } from 'react';
import restService from '../utils/restService';
import storageService, { StorageKey } from '../utils/storageService';
import { Store } from '../models/store';
import { Clearance } from '../models/clearance';
import OfferCardComponent from './offerCard';

const StoreClearancesComponent: React.FC = () => {
  const [storeIdInput, setStoreIdInput] = useState<string>('');
  const [storeNameInput, setStoreNameInput] = useState<string>('');
  const [stores, setStores] = useState<Store[]>([]);
  const [clearances, setClearances] = useState<Clearance[]>([]);
  const [storeSelect, setStoreSelect] = useState<string>('');


  useEffect(() => {
    const storedStores = JSON.parse(storageService.getItem(StorageKey.STORES) ?? '[]');
    setStores(storedStores);
    const lastStoreId = storageService.getItem(StorageKey.LAST_STORE_ID);
    setStoreSelect(lastStoreId ?? '');
  }, []);

  const getClearances = async () => {
    if (storeSelect) {
      const clearances = await restService.getStoreClearances(storeSelect);
      setClearances(clearances);
      storageService.setItem(StorageKey.LAST_STORE_ID, storeSelect);
    }
  };

  const addStoreButton = () => {
    if (storeNameInput && storeIdInput) {
      addStore(storeNameInput, storeIdInput);
    }
  };

  const addStore = (name: string, id: string) => {
    const newStore: Store = { name, id };
    const updatedStores = [...stores, newStore];
    setStores(updatedStores);
    storageService.setItem(StorageKey.STORES, JSON.stringify(updatedStores));
  };

  return (
    <div className="flex flex-col gap-4 p-2">
      <div className="flex flex-row gap-2 w-full">
        <input
          className="input input-secondary w-full"
          type="text"
          placeholder="Enter store name here"
          value={storeNameInput}
          onChange={(e) => setStoreNameInput(e.target.value)}
        />
        <input
          className="input input-secondary w-full"
          type="text"
          placeholder="Enter store ID here"
          value={storeIdInput}
          onChange={(e) => setStoreIdInput(e.target.value)}
        />
        <button
          className="btn btn-secondary"
          onClick={addStoreButton}
          disabled={!storeIdInput || !storeNameInput}
        >
          Add Store
        </button>
      </div>
      <div>
        <div className="w-full flex flex-row gap-2">
          <select
            className="select select-primary w-full"
            value={storeSelect}
            onChange={(e) => setStoreSelect(e.target.value)}
          >
            <option value="" disabled>Select a store</option>
            {stores.map((store) => (
              <option key={store.id} value={store.id}>
                {store.name}
              </option>
            ))}
          </select>
          <button
            className="btn btn-primary"
            onClick={getClearances}
            disabled={!storeSelect}
          >
            Get Clearances
          </button>
        </div>
        <p>{storeSelect}</p>
      </div>
      <div className="flex flex-row flex-wrap gap-4">
        {clearances.map((clearance) => (
          <OfferCardComponent key={clearance.offer.ean} clearance={clearance} />
        ))}
      </div>
    </div>
  );
};

export default StoreClearancesComponent;