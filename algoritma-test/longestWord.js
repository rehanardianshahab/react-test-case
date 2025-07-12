function longest(sentence) {
    const words = sentence.split(' ');
    let longest = '';
  
    for (const word of words) {
      if (word.length > longest.length) {
        longest = word;
      }
    }
  
    return `${longest}: ${longest.length} character`;
}
  
console.log(longest("Saya sangat senang mengerjakan soal algoritma"));
  