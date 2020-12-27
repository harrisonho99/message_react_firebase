export default function random(min, max) {
  let num = Math.random() * (max - min) + min;
  if (num === 0) {
    num = Math.random() * (max - min) + min;
  } else {
    return num;
  }
}
