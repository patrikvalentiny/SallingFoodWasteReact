class StorageService {
    private storage: Storage;
  
    constructor() {
      this.storage = localStorage;
    }
  
    getItem(key: string): string | null {
      return this.storage.getItem(key);
    }
  
    setItem(key: string, value: string): void {
      this.storage.setItem(key, value);
    }
  
    removeItem(key: string): void {
      this.storage.removeItem(key);
    }
  
    clear(): void {
      this.storage.clear();
    }
  }
  
  const storageService = new StorageService();
  export default storageService;

  export enum StorageKey {
    TOKEN = 'token',
    LAST_STORE_ID = 'lastStoreId',
    STORES = 'stores',
  }