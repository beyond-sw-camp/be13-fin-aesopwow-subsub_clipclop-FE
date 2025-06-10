import axiosInstance from "@/infrastructure/api/Axios";

export interface ApiRequestItem {
    requireListNo: number;
    analysisNo: number;
    companyNo: number;
    infoDbNo: number;
    title?: string;
    department?: string;
    createdAt: string;
    updatedAt: string;
}

// export async function fetchRequestById(requireListNo: number): Promise<{ data: RequestItem }> {
//     const res = await axiosInstance.get(`/request-list/${requireListNo}`);
//     return res.data;
export async function fetchRequestById(requireListNo: number): Promise<{ data: ApiRequestItem }> {
    if (!requireListNo || requireListNo <= 0) {
        throw new Error('유효하지 않은 요청 번호입니다.');
    }
    
    try {
        const res = await axiosInstance.get(`/request-list/${requireListNo}`);
        return res.data;
    } catch (error) {
        // console.error('요청 데이터 조회 실패:', error);
        throw error;
    }
}
