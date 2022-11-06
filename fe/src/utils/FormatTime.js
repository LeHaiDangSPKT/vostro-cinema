export default function FormatTime(text) {
  if (text.length == 3) {
    return text.slice(0, 1) + " giờ " + text.slice(1) + " phút";
  }
  if (text.length == 4) {
    return text.slice(0, 2) + " giờ " + text.slice(2) + " phút";
  }
}
