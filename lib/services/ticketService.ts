import axiosInstance from "../axios";

export interface TicketContent {
  id: number;
  user: any;
  ticket_number: string | null;
  message: string;
  read_status: number;
  status: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface Ticket {
  id: number;
  user: any;
  ticket_number?: string;
  ticket_title?: string;
  ticket_status?: number;
  contents: TicketContent[];
  created_at?: string;
  updated_at?: string;
}

export interface TicketListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Ticket[];
}

export interface TicketDetailResponse {
  ticket: Ticket;
  content: TicketContent[];
}

export interface SendMessageResponse {
  id: number;
  ticket_number: string;
  message: string;
  read_status: number;
  status: number;
  created_at: string;
  updated_at: string;
  user: any;
}

export const ticketService = {
  getTickets: async (page = 1): Promise<TicketListResponse> => {
    const response = await axiosInstance.get(`/api/support/tickets/?page=${page}`);
    return response.data;
  },

  getTicket: async (id: number): Promise<TicketDetailResponse> => {
    const response = await axiosInstance.get(`/api/support/tickets/${id}/`);
    return response.data;
  },

  getTicketContents: async (id: number): Promise<TicketDetailResponse> => {
    const response = await axiosInstance.get(`/api/support/tickets/${id}/fetch-contents/`);
    return response.data;
  },

  sendMessage: async (ticketNumber: string, content: string): Promise<SendMessageResponse> => {
    const response = await axiosInstance.post(`/api/support/tickets/send-message/`, {
      ticket_number: ticketNumber,
      content: content,
    });
    return response.data;
  },

  // inferred from controller but not explicitly requested, helpful to have
  createTicket: async (formData: FormData) => {
    const response = await axiosInstance.post('/api/support/tickets/store', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  }
};
