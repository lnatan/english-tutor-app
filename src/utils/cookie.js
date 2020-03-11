export function getCookie(name) {
  if (!document.cookie) {
      return null;
  }
  const cookies = document.cookie.split(";")
      .map(c => c.trim())
      .filter(c => c.startsWith(name + "="));
  if (cookies.length === 0) {
      return null;
  }
  return decodeURIComponent(cookies[0].split("=")[1]);
}

export function setCookie(name, value, options = {}) {
  options = { path: "/", ...options };
  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  for (let optionKey in options) {
      updatedCookie += "; " + optionKey;
      updatedCookie += "=" + options[optionKey];
  }
  document.cookie = updatedCookie;
}

export function deleteCookie(name) {
  setCookie(name, "", {
    "max-age": -1
  })
}
