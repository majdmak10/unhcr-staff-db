import staffColumns from "@/constants/staffColumns";
import { Column } from "@/components/table/Table";

export const getColumnsByKeys = (keys: string[]) =>
  keys
    .map((key) => staffColumns.find((col) => col.key === key))
    .filter(Boolean) as Column[];
