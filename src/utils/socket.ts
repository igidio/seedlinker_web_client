import { get_client_info } from '@/utils/device_info.ts'

export const create_socket = (group: string) => {
  const socket = new WebSocket(`ws://192.168.0.99:8000/ws/group/${group}`);

  // socket.onmessage = (event) => {
  //   const data = JSON.parse(event.data as string);
  //   console.log("Mensaje recibido:", data);
  // };

  socket.onclose = () => {
    console.log("Conexión WebSocket cerrada");
  };

  socket.onerror = (error) => {
    console.error("Error en la conexión WebSocket:", error);
  };

  return socket;
}
