const tagRegExp = /<\/*[0-9]+>/g;
const slotRegExp = /<[0-9]+B>/g;
const slotHtml = ' <span class="slot hidden">A</span> ';

function getFragments(text, fragmentsCount){
  let fragments = [];
  for (let i = 1; i <= fragmentsCount; i++ ) {
    let template = new RegExp("(?<=" + i + ">)(.*?)(?=<\/" + i + ">)");
    let fragmentMatch = text.match(template);

    if (!fragmentMatch) {
      console.log(`Question ${i}: No fragment or context was not markuped!`);
      fragments.push(null);
    } else {      
      let fragment;
      fragment = fragmentMatch[0].replace(slotRegExp, slotHtml);
      fragment = fragment.replace(tagRegExp, "");
      fragments.push(fragment);
    }   
  }
  return fragments;
}

export default (test) => {
  return {
    ...test,
    fragments: getFragments(test.context, test.questions.length)
  }
}