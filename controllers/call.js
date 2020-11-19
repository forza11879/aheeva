import * as Call from '../db/models/Call/index.js';
import WebSocket from 'ws';
// import { callData } from '../Data/callData.js';

const broadcast = (clients, message) => {
  console.log('message: ', message);
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
    if (index !== array.length - 1) {
      const temp = [array[index + 1], array[index]];
      arrayTwo.push(temp);
    }
  });

  let index = 0;
  const interval = setInterval(() => {
    arrayTwo[index++].map((item) => {
      broadcast(req.app.locals.clients, JSON.stringify(item));
      if (index == arrayTwo.length) {
        clearInterval(interval);
      }
    });
  }, 1000);
};

// export const addCall = () => {
//   callData.forEach(async (call) => {
//     if (call !== 0) await Call.addCall(call);
//     // console.log(call);
//   });
// };
