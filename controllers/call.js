import * as Call from '../db/models/Call/index.js';
import WebSocket from 'ws';
// import { callData } from '../Data/callData.js';

const broadcast = (clients, message) => {
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
};

export const fetchData = async (req, res) => {
  const arrayOne = await Call.fetchData();
  const arrayTwo = [];

  arrayOne.map((value, index, array) => {
    if (index + 1 !== array.length) {
      const temp = [array[index], array[index + 1]];
      arrayTwo.push(temp);
    }
  });
  // console.log('arrayTwo: ', arrayTwo);

  let index = 0;
  const interval = setInterval(function () {
    console.log(arrayTwo[index++]);
    if (index == arrayTwo.length) {
      clearInterval(interval);
    }
  }, 1000);

  // broadcast(req.app.locals.clients, JSON.stringify(result));
  res.send(arrayTwo);
};

// export const addCall = () => {
//   callData.forEach(async (call) => {
//     if (call !== 0) await Call.addCall(call);
//     // console.log(call);
//   });
// };
