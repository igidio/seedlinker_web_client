import { UAParser } from 'ua-parser-js';
const { browser, cpu, device, os } = UAParser(navigator.userAgent);

export const get_client_info = () => {
  return {
    platform: browser.name,
    brand: `${os.name} ${os.version} ${cpu.architecture ? '- ' + cpu.architecture : ''}`.trim(),
  }
};
