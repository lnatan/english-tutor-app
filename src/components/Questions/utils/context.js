export default (questionType, text, word = null) => {
  let newText;

  if (questionType === "insert") {
    newText = text.replace(/hidden/g, "inline-block");
  }

  if (questionType === "word") {
    const highlight = ` <span class="highlight">${word}</span> `;
    newText = text.replace(word, highlight);
  }

  return newText;
};

// const regexp = new RegExp("<[0-9]+A>[\s]*" + el + "[\s]*<\/[0-9]+A>", "gi");