export default function ReserveString(text) {
  return text.split("-").reverse().join("/");
}
