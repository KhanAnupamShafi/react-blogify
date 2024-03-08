const getFormattedDate = (dateString) => {
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  const formattedDate = new Date(dateString).toLocaleDateString(
    'en-US',
    options
  );
  return formattedDate;
};

export { getFormattedDate };
