export const formatDate = (date: Date): string => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error("Invalid date");
  }

  const dateString = date.toISOString().split("T")[0];

  if (!dateString) {
    throw new Error("Invalid date");
  }

  return dateString;
};
