const useCookie = () => {
  const setCookie = (name, value, time) => {
    const expires = new Date();
    expires.setDate(expires.getDate() + time);
    document.cookie = `${name}=${encodeURIComponent(
      value
    )}; expires=${expires.toUTCString()}; path=/`;
  };

  const getCookie = (name) => {
    const cookieValue = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith(name))
      ?.split("=")[1];

    if (cookieValue) {
      const rawData = decodeURIComponent(cookieValue);
      const user = JSON.parse(rawData);
      return user;
    } else return null;
  };

  return { setCookie, getCookie };
};

export default useCookie;
