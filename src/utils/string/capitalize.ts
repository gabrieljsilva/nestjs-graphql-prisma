export function capitalize(str: string) {
  return str.toLowerCase().replace(/\b./g, function (firstLetter) {
    return firstLetter.toUpperCase();
  });
}
