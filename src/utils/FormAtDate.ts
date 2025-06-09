export function formatDate(date: Date | string | undefined) {
  if (!date) return "";
  if (typeof date === "string") return date;
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}