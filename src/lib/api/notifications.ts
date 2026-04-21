import { apiClient, extractApiErrorMessage } from "@/lib/api/axios";
import type {
  ApiEnvelope,
  NotificationListResponse,
  NotificationPreference,
  NotificationPreferenceUpdateItem,
  NotificationRecord,
  NotificationSummary,
} from "@/types/notification";

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

export const notificationsApi = {
  async summary(merchantId: string) {
    try {
      const { data } = await apiClient.get<
        ApiEnvelope<NotificationSummary> | NotificationSummary
      >(`/api/notifications/merchants/${merchantId}/summary/`);

      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load notification summary."),
      );
    }
  },

  async preferences(merchantId: string) {
    try {
      const { data } = await apiClient.get<
        ApiEnvelope<NotificationPreference[]> | NotificationPreference[]
      >(`/api/notifications/merchants/${merchantId}/preferences/`);

      const resolved = unwrap(data);
      return Array.isArray(resolved) ? resolved : [];
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load notification preferences."),
      );
    }
  },

  async updatePreferences(
    merchantId: string,
    preferences: NotificationPreferenceUpdateItem[],
  ) {
    try {
      const { data } = await apiClient.patch<
        ApiEnvelope<NotificationPreference[]> | NotificationPreference[]
      >(`/api/notifications/merchants/${merchantId}/preferences/`, {
        preferences,
      });

      const resolved = unwrap(data);
      return Array.isArray(resolved) ? resolved : [];
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(
          error,
          "Unable to update notification preferences.",
        ),
      );
    }
  },

  async list(
    merchantId: string,
    params?: {
      category?: string;
      unread?: boolean;
      archived?: boolean;
      search?: string;
    },
  ) {
    try {
      const { data } = await apiClient.get<NotificationListResponse>(
        `/api/notifications/merchants/${merchantId}/`,
        {
          params: {
            category: params?.category || undefined,
            unread:
              typeof params?.unread === "boolean"
                ? String(params.unread)
                : undefined,
            archived:
              typeof params?.archived === "boolean"
                ? String(params.archived)
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
        extractApiErrorMessage(error, "Unable to load notifications."),
      );
    }
  },

  async update(
    merchantId: string,
    notificationId: string,
    payload: { mark_read?: boolean; archive?: boolean },
  ) {
    try {
      const { data } = await apiClient.patch<
        ApiEnvelope<NotificationRecord> | NotificationRecord
      >(`/api/notifications/merchants/${merchantId}/${notificationId}/`, payload);

      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to update notification."),
      );
    }
  },

  async markAllRead(merchantId: string) {
    try {
      const { data } = await apiClient.post<
        ApiEnvelope<{ updated_count: number }> | { updated_count: number }
      >(`/api/notifications/merchants/${merchantId}/mark-all-read/`);

      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to mark all notifications as read."),
      );
    }
  },
};