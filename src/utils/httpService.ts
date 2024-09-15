import axios, { AxiosInstance } from "axios";
import storage from "./storageService";

class HttpService {
  private axiosInstance: AxiosInstance;

  constructor() {
    const token: string | null = storage.getItem('token');
    this.axiosInstance = axios.create({
      baseURL: 'https://api.sallinggroup.com',
      headers: { 'Authorization': `Bearer ${token}` }
    });
  }

  getInstance(): AxiosInstance {
    return this.axiosInstance;
  }
}

const httpService = new HttpService();
export default httpService;