function getFragments(text, fragmentsCount){
  let fragments = [];
  for (let i = 1; i < fragmentsCount; i++ ) {
    let template = new RegExp("(?<=" + i + ">)(.*?)(?=<\/" + i + ">)");
    let fragment = text.match(template)[0];
    fragments.push(fragment);
  }

  // if (!fragment.length) {
  //   console.log("No context provided or context should be markuped");
  //   return;
  // }

  // fragment = fragment.replace(/(?=<)(.*?)(?:>)/g, "");

  return fragments;
}

export default (test) => {
  return {
    ...test,
    fragments: getFragments(test.context, test.questions.length)
  }
}