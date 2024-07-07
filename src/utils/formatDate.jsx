export const formatDate = (dateString, format = "yyyy-mm-dd") => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  switch (format) {
    case "dd/mm/yy":
      return `${day}/${month}/${String(year).slice(-2)}`;
    case "yyyy-mm-dd":
    default:
      return `${year}-${month}-${day}`;
  }
};
