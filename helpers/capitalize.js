const capitalize = (sentence) => {
  const words = sentence.split(' ');
  const capitalizedWords = words.map(word => {
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  });
  return capitalizedWords.join(' ');
}

export default capitalize;