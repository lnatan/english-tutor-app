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