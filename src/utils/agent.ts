const getNavigatorUserAgent = () => {
  return typeof navigator === "undefined" ? "SSR" : navigator.userAgent;
};

const isAndroid = () => {
  const userAgent = getNavigatorUserAgent();

  return Boolean(userAgent.match(/Android/i));
};

const isIos = () => {
  const userAgent = getNavigatorUserAgent();

  return Boolean(userAgent.match(/iPhone|iPad|iPod/i));
};

const isMobile = () => {
  return Boolean(isAndroid() || isIos());
};

export default isMobile;
