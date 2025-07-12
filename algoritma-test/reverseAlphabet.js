function reverseAlphabet(str) {
    const letters = str.replace(/[0-9]/g, '').split('').reverse().join('');
    const numbers = str.replace(/[^0-9]/g, '');
    return letters + numbers;
}

console.log(reverseAlphabet("NEGIE1")); 