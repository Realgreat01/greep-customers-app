export const gpHelpers = {
  sliceWords(words: string, slice: number = 24) {
    if (words.length > slice) return words.slice(0, slice) + " ...";
    else return words.slice(0, slice);
  },
};
