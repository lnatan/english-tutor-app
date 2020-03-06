const tagTemplate = /<\/*\d+\w*>/g;
const slotTemplate = /(?<=<[0-9]+B>)(.*?)(?=<\/[0-9]+B>)/g;
// const highlightTemplate = /(?<=<[0-9]+A>)(.*?)(?=<\/[0-9]+A>)/g;

function makeFragments(text, fragmentsCount){
  let fragments = [];

  const newText = text.replace(slotTemplate, " <span class=\"slot hidden\">$1</span> ");

  for (let i = 1; i <= fragmentsCount; i++) {
    const fragmentTemplate = new RegExp("(?<=" + i + ">)(.*?)(?=<\/" + i + ">)");
    const highlightTemplate = new RegExp("(?<=<" + i + "A>)(.*?)(?=<\/" + i + "A>)");
    let fragment = newText.match(fragmentTemplate);
    
    if (!fragment) {
      console.log(`Question ${i}: No fragment or context was not markuped!`);
      fragments.push(null);
    } else {
      fragment = fragment[0];
      fragment = fragment.replace(highlightTemplate, " <span class=\"highlight-hidden\">$1</span>")
      fragment = fragment.replace(tagTemplate, " ");
      fragments.push(fragment);
    }
  }

  return fragments;
}

function showHighlight(text, element){
  const hiddenClassTemplate = new RegExp("-hidden(?=\">" + element + ")");
  return text.replace(hiddenClassTemplate, "");
}

function showSlots(text){
  return text.replace(/slot hidden/g, "slot inline-block");
}

function prepareTest(test){
  return {
    ...test,
    fragments: makeFragments(test.context, test.questions.length)
  }
}

export { showHighlight, showSlots, prepareTest };