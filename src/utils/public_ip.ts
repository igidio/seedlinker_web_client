import axios from 'axios'

export const get_public_ip = async (): Promise<string> => {
  const response = await axios.get("https://api.ipify.org");
  return response.data;
}
