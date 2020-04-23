export default function(name) {
  const capitals = "QWERTYUIOPASDFGHJKLZXCVBNM".split('');

  const arr = name.split('');
  const newArr = arr.map((letter, i) => {
    if (i > 0 && capitals.includes(letter)) {
      return `_${letter.toLowerCase()}`
    } else {
      return letter.toLowerCase();
    }
  });
  return newArr.join('');
}