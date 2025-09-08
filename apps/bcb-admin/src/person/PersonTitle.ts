import { Person as TPerson } from "../api/person/Person";

export const PERSON_TITLE_FIELD = "firstName";

export const PersonTitle = (record: TPerson): string => {
  return record.firstName?.toString() || String(record.id);
};
