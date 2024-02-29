export function generateDateLabels(days) {
  const labels = [];

  for (let i = 0; i < days; i++) {
    const now = new Date();

    const startDate = now.getDate();

    const offsetDate = now.setDate(startDate - i);

    const formattedDate = formatDate(offsetDate);
    labels.push(formattedDate);
  }

  return labels;
}

export function formatDate(dateUnix) {
  const date = new Date(dateUnix);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // January is 0!
  const year = date.getUTCFullYear();

  return month + "/" + day + "/" + year;
}
