import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
    baseURL: '/api',
});

export const apiRequest = async <T>(config: AxiosRequestConfig): Promise<T> => {
    try {
        const response = await axiosInstance(config);
        return response.data;
    } catch (error) {
        throw error;
    }
};