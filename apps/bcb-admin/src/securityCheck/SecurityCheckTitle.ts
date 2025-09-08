import { SecurityCheck as TSecurityCheck } from "../api/securityCheck/SecurityCheck";

export const SECURITYCHECK_TITLE_FIELD = "officerName";

export const SecurityCheckTitle = (record: TSecurityCheck): string => {
  return record.officerName?.toString() || String(record.id);
};
