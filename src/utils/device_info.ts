export const get_client_info = () => {
  console.log(navigator)
  const info = {
    platform: navigator,
    //platform: navigator.userAgentData.platform,
    //brand: navigator['userAgentData']['brands'][0]['brand'],
    brand: navigator.userAgent,
  };
  return `${info.brand} (${info.platform})`;
};
