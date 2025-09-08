export type AlertNotification = {
  actionRequired: boolean | null;
  createdAt: Date;
  id: string;
  message: string | null;
  moduleField: string | null;
  severity: string | null;
  status: string | null;
  title: string | null;
  updatedAt: Date;
};
