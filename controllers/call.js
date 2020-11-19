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
      const temp = [array[index], array[index + 1]];
      arrayTwo.push(temp);
    }
  });

  let indexOut = 0;

  const interval = setInterval(() => {
    arrayTwo[indexOut++]
      .slice()
      .reverse()
      .forEach((item) => {
        broadcast(req.app.locals.clients, JSON.stringify(item));
        if (indexOut == arrayTwo.length) {
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
