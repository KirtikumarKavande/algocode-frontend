import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:4000';
// see above coomments will it work or not in production
const URL =import.meta.env.VITE_SOCKET_URL ;

  const socket = io(URL);
  export default socket