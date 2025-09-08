import { AlertNotification as TAlertNotification } from "../api/alertNotification/AlertNotification";

export const ALERTNOTIFICATION_TITLE_FIELD = "title";

export const AlertNotificationTitle = (record: TAlertNotification): string => {
  return record.title?.toString() || String(record.id);
};
