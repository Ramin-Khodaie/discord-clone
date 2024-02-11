import { apiRequest } from "@/config/axios";
import { Server } from "@prisma/client";
import { AxiosRequestConfig } from "axios"

export const newCode = async (serverId: string): Promise<Server> => {
    const config: AxiosRequestConfig = {
        method: 'PATCH',
        url: `/servers/${serverId}/invite-code`
    }

    return await apiRequest<Server>(config)
}