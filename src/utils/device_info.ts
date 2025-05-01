export const get_client_info = () => {
  const info = {
    platform: navigator['userAgentData']['platform'],
    brand: navigator['userAgentData']['brands'][0]['brand'],
  };
  return `${info.brand} (${info.platform})`;
};
