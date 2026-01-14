import axiosInstance from "../axios";

export interface Bonus {
    id: number;
    bonus_name: string;
    deposit_method: string | null;
    min_loss: string | number | null;
    bonus_code: string | null;
    type: string;
    bonus_amount: number | null;
    free_spin: number;
    game: string | null;
    bet_size: number;
    lines: number;
    wagering_req: number;
    from_field: string | null;
    till: string | null;
    specific_day: string | null;
    recurring: string | null;
    w_2: string | null;
    ex_country: string | null;
    aff_source: string | null;
    status: boolean | number;
    percent_amount: number | null;
    max_amount: number | null;
    chained: string | null;
    ex_chain: string | null;
    users: string | null;
    vip_level: string | null;
    created_at: string;
    updated_at: string;
}

export interface BonusListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: {
        bonus_code: Bonus[];
    };
}

export const bonusService = {
    // List all bonuses
    getBonuses: async (page = 1): Promise<BonusListResponse> => {
        const response = await axiosInstance.get(`/api/bonuses/propersix-bonuses/?page=${page}`);
        return response.data;
    },

    // Check bonus type before creation (from prompt examples)
    checkBonusType: async (type: string) => {
        const response = await axiosInstance.post('/api/bonuses/propersix-bonuses/bonus-type-check/', { type });
        return response.data;
    },

    // Create functions for each bonus type
    createRegistrationBonus: async (data: any) => {
        const response = await axiosInstance.post('/api/bonuses/propersix-bonuses/registration-bonus/', data);
        return response.data;
    },

    createLoginBonus: async (data: any) => {
        const response = await axiosInstance.post('/api/bonuses/propersix-bonuses/login-bonus/', data);
        return response.data;
    },

    createDepositBonus: async (data: any) => {
        const response = await axiosInstance.post('/api/bonuses/propersix-bonuses/deposit-bonus/', data);
        return response.data;
    },

    createCodeBonus: async (data: any) => {
        const response = await axiosInstance.post('/api/bonuses/propersix-bonuses/code-bonus/', data);
        return response.data;
    },

    createMethodBonus: async (data: any) => {
        const response = await axiosInstance.post('/api/bonuses/propersix-bonuses/method-bonus/', data);
        return response.data;
    },

    createCashbackBonus: async (data: any) => {
        const response = await axiosInstance.post('/api/bonuses/propersix-bonuses/cashback-bonus/', data);
        return response.data;
    },

    // Bonus Management
    changeStatus: async (id: number) => {
        const response = await axiosInstance.post(`/api/bonuses/propersix-bonuses/${id}/status-change/`);
        return response.data;
    },

    deleteBonus: async (id: number) => {
        const response = await axiosInstance.get(`/api/bonuses/propersix-bonuses/${id}/destroy/`); // Prompt says GET for destroy
        return response.data;
    },

    // User Specific Bonus logic
    assignUserBonus: async (id: number, data: any) => {
        const response = await axiosInstance.post(`/api/bonuses/propersix-bonuses/${id}/user-bonus/`, data);
        return response.data;
    },

    addUserToken: async (id: number, add_token: number) => {
        const response = await axiosInstance.post(`/api/bonuses/propersix-bonuses/${id}/add-user-token/`, { add_token });
        return response.data;
    }
};
