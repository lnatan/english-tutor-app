export function jsonToUrlencoded(json){ 
  return Object.keys(json).map(k => {
    if (typeof json[k] === "object"){
      return `${k}=${JSON.stringify(json[k])}`
    } else {
      return `${k}=${json[k]}`
    }  
  }).join("&");
}

export function uriToJSON(urijson){
  return JSON.parse(decodeURIComponent(urijson)
  );
}