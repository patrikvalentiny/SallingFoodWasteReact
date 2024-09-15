import httpService from './httpService';
import storageService from './storageService';
import { StorageKey } from './storageService';
import { Clearance } from '../models/clearance';
import { Store } from '../models/store'; // Assuming you have a Store model
import { AxiosInstance } from 'axios';

class RestService {
  private http: AxiosInstance;

  constructor() {
    this.http = httpService.getInstance();
  }

  setToken(token: string): void {
    this.http.defaults.headers['Authorization'] = `Bearer ${token}`;
    storageService.setItem(StorageKey.TOKEN, token);
  }

  async getStores(): Promise<Store[]> {
    const response = await this.http.get<Store[]>('/v2/stores');
    return response.data;
  }

  async getStoreById(storeId: string): Promise<Store> {
    const response = await this.http.get<Store>(`/v2/stores/${storeId}`);
    return response.data;
  }

  async getStoreClearances(storeId: string): Promise<Clearance[]> {
    const response = await this.http.get<{ clearances: Clearance[] }>(`/v1/food-waste/${storeId}`);
    return response.data.clearances;
  }
}

const restService = new RestService();
export default restService;