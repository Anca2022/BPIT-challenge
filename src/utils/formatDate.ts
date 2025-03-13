import dateOptions from "../data/dateOptions";

export function formatDateForInput(date: Date) {
  return date.toISOString().split("T")[0];
}
export function formatDateForTransaction(date: Date) {
  return date.toLocaleDateString("en-GB", dateOptions);
}
