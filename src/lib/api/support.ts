import { apiClient, extractApiErrorMessage } from "@/lib/api/axios";
import type {
  ApiEnvelope,
  PaginatedResponse,
  SupportMessage,
  SupportTicket,
} from "@/types/support";

function unwrap<T>(payload: ApiEnvelope<T> | T): T {
  if (
    payload &&
    typeof payload === "object" &&
    "data" in (payload as Record<string, unknown>)
  ) {
    return (payload as ApiEnvelope<T>).data as T;
  }

  return payload as T;
}

export const supportApi = {
  async list(
    merchantId: string,
    params?: {
      status?: string;
      priority?: string;
      category?: string;
      assigned_to_me?: boolean;
      search?: string;
    },
  ) {
    try {
      const { data } = await apiClient.get<PaginatedResponse<SupportTicket>>(
        `/api/support/merchants/${merchantId}/tickets/`,
        {
          params: {
            status: params?.status || undefined,
            priority: params?.priority || undefined,
            category: params?.category || undefined,
            assigned_to_me:
              typeof params?.assigned_to_me === "boolean"
                ? String(params.assigned_to_me)
                : undefined,
            search: params?.search || undefined,
          },
        },
      );

      return {
        count: data.count || 0,
        results: data.results || [],
      };
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load support tickets."),
      );
    }
  },

  async create(
    merchantId: string,
    payload: {
      subject: string;
      description?: string;
      initial_message?: string;
      category?: string;
      priority?: string;
      status?: string;
      source?: string;
      contact_name?: string;
      contact_email?: string;
      contact_phone?: string;
      metadata?: Record<string, unknown>;
    },
  ) {
    try {
      const { data } = await apiClient.post<
        ApiEnvelope<SupportTicket> | SupportTicket
      >(`/api/support/merchants/${merchantId}/tickets/`, payload);

      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to create support ticket."),
      );
    }
  },

  async detail(merchantId: string, ticketId: string) {
    try {
      const { data } = await apiClient.get<
        ApiEnvelope<SupportTicket> | SupportTicket
      >(`/api/support/merchants/${merchantId}/tickets/${ticketId}/`);

      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load support ticket."),
      );
    }
  },

  async update(
    merchantId: string,
    ticketId: string,
    payload: {
      subject?: string;
      description?: string;
      category?: string;
      priority?: string;
      status?: string;
      source?: string;
      contact_name?: string;
      contact_email?: string;
      contact_phone?: string;
      metadata?: Record<string, unknown>;
    },
  ) {
    try {
      const { data } = await apiClient.patch<
        ApiEnvelope<SupportTicket> | SupportTicket
      >(`/api/support/merchants/${merchantId}/tickets/${ticketId}/`, payload);

      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to update support ticket."),
      );
    }
  },

  async messages(
    merchantId: string,
    ticketId: string,
    includeInternal = false,
  ) {
    try {
      const { data } = await apiClient.get<
        ApiEnvelope<SupportMessage[]> | SupportMessage[]
      >(`/api/support/merchants/${merchantId}/tickets/${ticketId}/messages/`, {
        params: {
          include_internal: includeInternal ? "true" : "false",
        },
      });

      const resolved = unwrap(data);
      return Array.isArray(resolved) ? resolved : [];
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load support messages."),
      );
    }
  },

  async addMessage(
    merchantId: string,
    ticketId: string,
    payload: {
      body: string;
      is_internal?: boolean;
      attachments?: Array<Record<string, unknown>>;
      metadata?: Record<string, unknown>;
    },
  ) {
    try {
      const { data } = await apiClient.post<
        ApiEnvelope<SupportMessage> | SupportMessage
      >(`/api/support/merchants/${merchantId}/tickets/${ticketId}/messages/`, payload);

      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to create support message."),
      );
    }
  },
};