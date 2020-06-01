export default function formattingDate() {
  const dayMilliseconds = 24 * 60 * 60 * 1000 * 7;
  const currentDate = new Date().toISOString();
  const previousDate = new Date(new Date().getTime() - dayMilliseconds).toISOString();
  return {
    currentDate,
    previousDate,
  };
}
