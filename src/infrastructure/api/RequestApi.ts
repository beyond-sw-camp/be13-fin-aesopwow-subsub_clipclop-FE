import axiosInstance from "@/infrastructure/api/Axios";

export interface RequestItem {
    requireListNo: number;
    analysisNo: number;
    companyNo: number;
    infoDbNo: number;
    createdAt: string;
    updatedAt: string;
}

export async function fetchRequestById(requireListNo: number): Promise<{ data: RequestItem }> {
    const res = await axiosInstance.get(`/request-list/${requireListNo}`);
    return res.data;
}
