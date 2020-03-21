function parseTestContext(test){
  return {
    ...test,
    fragments: makeFragments(test.context, test.questions.length)
  }
}

function makeFragments(text, fragmentsCount){
  const tagTemplate = /<\/*\d+\w*>/g;
  const slotTemplate = /<[0-9]+B>([0-9]+)(\w)<\/[0-9]+B>/g;
  let newText = insertSlots(slotTemplate, text);

  let fragments = [];

  for (let i = 1; i <= fragmentsCount; i++) {
    const fragmentTemplate = new RegExp("<" + i + ">.*<\/" + i + ">");
    const highlightTemplate = new RegExp("<" + i + "A>(.*)<\/" + i + "A>");
    let fragment = newText.match(fragmentTemplate);
    
    if (!fragment) {
      console.log(`Question ${i}: No fragment or context was not markuped!`);
      fragments.push(null);
    } else {
      fragment = fragment[0];
      fragment = fragment.replace(highlightTemplate, " <span class=\"highlight-hidden\">$1</span> ")
      fragment = fragment.replace(tagTemplate, " ");
      fragments.push(fragment);
    }
  }

  return fragments;
}

function deleteAnswersFromTest(test){
  const questions = test.questions.map(({variants, ...rest}) => {
    const noAnswerVariants = variants.map(({variant, answer}) => { 
      return { variant }
    });

    return {
      variants: noAnswerVariants,
      ...rest
    }
  });
  
  return {
    ...test,
    questions
  }
}

function insertSlots(template, text){
  return text.replace(template, (match, index, value) => 
  ` <span class="slot hidden" data-index=${index-1}>${value}</span><span class="slot-sentence hidden" data-index=${index-1}>${value}</span> `
  );
}

function showHighlight(element, text){
  if (text === null) {
    return "No text provided";
  }
  const template = new RegExp("-hidden(?=\">" + element + ")");
  return text.replace(template, "");
}

function showSlots(text){
  if (text === null) {
    return "No text provided";
  }
  return text.replace(/slot hidden/g, "slot");
}

export { 
  showHighlight, 
  showSlots, 
  parseTestContext,
  deleteAnswersFromTest
};