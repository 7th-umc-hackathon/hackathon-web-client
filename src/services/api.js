import axios from 'axios';

// Base URL 설정
const apiClient = axios.create({
    baseURL: 'http://test2.shop:42021', // API의 기본 URL을 여기에 설정
    timeout: 10000, // 요청 타임아웃
});

// 요청 인터셉터: accessToken 추가
apiClient.interceptors.request.use(
    (config) => {
        // localStorage에서 accessToken 가져오기
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers.Authorization = accessToken; // Bearer 포함된 상태로 설정
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 응답 인터셉터: 에러 처리 및 갱신 로직 추가 가능
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                console.error('Unauthorized: 엑세스 토큰을 확인하세요');
                // 필요시, 사용자 로그아웃 처리 또는 토큰 재요청 로직 추가
            }
        } else {
            console.error('네트워크 에러 혹은 서버 에러');
        }
        return Promise.reject(error);
    }
);

// 로그인 성공 시 accessToken 저장 함수
export const saveAccessToken = (token) => {
    localStorage.setItem('accessToken', token); // accessToken을 localStorage에 저장
};

// GET 요청
export const getRequest = (url, params = {}) => {
    return apiClient.get(url, { params });
};

// POST 요청
export const postRequest = (url, data = {}) => {
    return apiClient.post(url, data);
};

// PUT 요청
export const putRequest = (url, data = {}) => {
    return apiClient.put(url, data);
};

// DELETE 요청
export const deleteRequest = (url, data = {}) => {
    return apiClient.delete(url, { data });
};

// 기본 apiClient 내보내기
export default apiClient;
