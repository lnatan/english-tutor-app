const tagTemplate = /<\/*\d+\w*>/g;
const slotTemplate = /<[0-9]+B>([0-9]+)(\w)<\/[0-9]+B>/g;

function parseTest(test){
  return {
    ...test,
    fragments: makeFragments(test.context, test.questions.length),
    context: makeFullContext(test.context, test.questions.length)
  }
}

function makeFragments(text, fragmentsCount){
  let newText = insertHtmlSlot(slotTemplate, text);
  let fragments = [];

  for (let i = 1; i <= fragmentsCount; i++) {
    const fragmentTemplate = new RegExp("<" + i + ">.*<\/" + i + ">");
    const highlightTemplate = new RegExp("<" + i + "A>(.*)<\/" + i + "A>");
    let fragment = newText.match(fragmentTemplate);
    
    if (!fragment) {
      console.log(`Question ${i}: No fragment. Or context was not markuped.`);
      fragments.push(null);
    } else {
      fragment = fragment[0];
      fragment = fragment.replace(highlightTemplate, ` <span class="highlight-hidden highlight-${i}">$1</span> `);
      fragment = fragment.replace(tagTemplate, " ");
      fragments.push(`<div class="fragment fragment-${i}">${fragment}</div>`);
    }
  }

  return fragments;
}


function makeFullContext(text, fragmentsCount){  
  let newText = text;
  newText = insertHtmlSlot(slotTemplate, newText);

  for (let i = 1; i <= fragmentsCount; i++) {
    const fragmentTemplate = new RegExp("<" + i + ">(.*)<\/" + i + ">");   
    const highlightTemplate = new RegExp("<" + i + "A>(.*)<\/" + i + "A>"); 
    newText = newText.replace(fragmentTemplate, (match) => `<span class="fragment fragment-${i}">${match}</span>`);  
    newText = newText.replace(highlightTemplate, ` <span class="highlight-hidden highlight-${i}">$1</span> `);  
  }
  
  newText = newText.replace(tagTemplate, "");
  return newText;
}

function highlightActiveFragment(text, active){
  return text.replace(`fragment-${active+1}`, `fragment-${active+1} is-active`);
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

function addAnswersToTest(test){
  const answers = [];  
  test.questions.forEach(({ variants }) => {
    const answer = [];
    variants.forEach((variant, vIndex) => {
      if (typeof variant.answer === "number"){
        answer.push(variant.answer);
      } else if (variant.answer === true) {
        answer.push(vIndex);
      }  
    });
    answers.push(answer);
  });
  
  return {
    ...test,
    answers
  }
}

function insertHtmlSlot(template, text){
  return text.replace(template, (match, index, value) => 
  ` <span class="slot hidden" data-index=${index-1}>${value}</span><span class="slot-sentence hidden" data-index=${index-1}>${value}</span> `
  );
}

function showHighlight(text){
  if (text === null) {
    return "No text provided";
  }

  const regexIndexFragmentIsActive = /fragment fragment-(\d+) is-active/;
  const regexIndexFragment = /fragment fragment-(\d+)/;
  let index;

  if (regexIndexFragmentIsActive.test(text)) {
    index = regexIndexFragmentIsActive.exec(text)[1];
  } else {
    index = regexIndexFragment.exec(text)[1];
  }

  const regexHighlightHidden = new RegExp(`highlight-hidden highlight-${index}`);
  return text.replace(regexHighlightHidden, `highlight highlight-${index}`);
}

function showSlot(text){
  if (text === null) {
    return "No text provided";
  }
  return text.replace(/slot hidden/g, "slot");
}

export { 
  parseTest,  
  addAnswersToTest, 
  deleteAnswersFromTest,
  highlightActiveFragment, 
  showHighlight, 
  showSlot
};