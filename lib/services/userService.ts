import axiosInstance from "../axios";

export interface User {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    is_active: boolean;
    date_joined: string;
    last_login: string | null;
    ip_address?: string | null;
    status: boolean;
    // Add other fields as needed from the response example
    phone?: string;
    country?: string;
    address?: string;
    city?: string;
}

export interface CustomerListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: {
        user: User[];
    };
}

export interface OnlineCustomerResponse {
    data: any[]; // The example showed data: [], assuming it returns users or similar
    // The example also showed "tok" object, which might be stats or specific user token info?
    // Let's type 'data' as User[] later if confirmed, for now any[]
}

export interface CustomerDetailsResponse {
    user: User;
    commentsList: any[]; // Type this better if we have structure, for now any
}

export const userService = {
    // Customers List
    getCustomers: async (page = 1): Promise<CustomerListResponse> => {
        // Assuming page param can be passed if supported, but prompt didn't strictly specify paging param in URL example. 
        // Standard django paging usually supports ?page=N
        const response = await axiosInstance.get(`/api/users/customers/?page=${page}`);
        return response.data;
    },

    // Online Customers
    getOnlineCustomers: async (): Promise<OnlineCustomerResponse> => {
        const response = await axiosInstance.get('/api/users/online-customers/');
        return response.data;
    },

    logoutOnlineCustomer: async (id: number) => {
        const response = await axiosInstance.post(`/api/users/${id}/logout-online-customer/`);
        return response.data;
    },

    // Search
    searchCustomers: async (query: string): Promise<CustomerListResponse> => {
        // Using GET as per example: GET: {{localhost}}/api/users/customer-search/?data=john@example.com
        const response = await axiosInstance.get(`/api/users/customer-search/?data=${query}`);
        return response.data;
    },

    // Customer Details & Notes
    getCustomerDetails: async (id: number): Promise<CustomerDetailsResponse> => {
        const response = await axiosInstance.get(`/api/users/${id}/leave-notes/`);
        return response.data;
    },

    createLeaveNote: async (id: number, data: any) => {
        // POST: {{localhost}}/api/users/1/create-leave-note/
        // Body isn't fully specified but typically { comments: "..." } or similar.
        // I will assume a standard payload structure or just pass 'data' through.
        const response = await axiosInstance.post(`/api/users/${id}/create-leave-note/`, data);
        return response.data;
    }
};
