import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import storage from "./storageService";
import { StorageKey } from "./storageService";
import toast from "react-hot-toast";

class HttpService {
  private axiosInstance: AxiosInstance;
  private requestLimit: number;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'https://api.sallinggroup.com',
    });
    this.requestLimit = 1;

    // Add a request interceptor
    this.axiosInstance.interceptors.request.use(
      (config : InternalAxiosRequestConfig) => {
        const token = storage.getItem(StorageKey.TOKEN);
        if (token) {
          config.headers!['Authorization'] = `Bearer ${token}`;
        } else {
          config.headers!['Authorization'] = 'Bearer e40b6042-6213-4c0a-bd78-13e8c422e7c0';
        }

        if (this.isRateLimited() && false) {
          toast.error('Rate limit exceeded. Please create you own API key.');
          return Promise.reject(new Error('Rate limit exceeded. Please create you own API key.'));
        }

        // Update request count
        const requestCount = this.getRequestCount();
        this.setRequestCount(requestCount + 1);

        return config;
      },
      (error) => {
        toast.error('Request failed. Please try again later.');
        return Promise.reject(error);
      }
    );
  }

  getInstance(): AxiosInstance {
    return this.axiosInstance;
  }

  setToken(token: string): void {
    storage.setItem('token', token);
    this.axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  private getRequestCount(): number {
    const requestCount = storage.getItem('requestCount');
    return requestCount ? parseInt(requestCount, 10) : 0;
  }

  private setRequestCount(count: number): void {
    storage.setItem('requestCount', count.toString());
  }

  private isRateLimited(): boolean {
    if (storage.getItem(StorageKey.TOKEN) !== null) {
      return false;
    }
    const requestCount = this.getRequestCount();
    return requestCount >= this.requestLimit;
  }
}

const httpService = new HttpService();
export default httpService;