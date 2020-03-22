export function getRightAnswer(question){
  let rightAnswer = [];

  question.variants.forEach((variant, index) => {
    if (typeof variant.answer === "number") {
      rightAnswer.push(variant.answer);
    } else {
      if (variant.answer === true) {
        rightAnswer.push(index);
      }   
    }    
  });

  return rightAnswer;
}

export function parseAnswer(answer){
  answer = JSON.parse(answer);

  if (answer.length > 1) {
    answer.sort();
  }

  if (typeof answer === "object") {
    answer = Object.values(answer);
  }
  
  return answer;
}