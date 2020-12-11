export default function LocaleDate({ date }) {
  // TODO memo use case?
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString();
}
