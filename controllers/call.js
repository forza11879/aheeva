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

  // // loop through the array more then once
  //   let index = 0;
  //   setInterval(function () {
  //     console.log(arrayTwo[index++ % arrayTwo.length]);
  //   }, 1000);

  let index = 0;
  const interval = setInterval(() => {
    arrayTwo[index++].map((item) => {
      broadcast(req.app.locals.clients, JSON.stringify(item));
      if (index == arrayTwo.length) {
        clearInterval(interval);
      }
    });
    // broadcast(req.app.locals.clients, JSON.stringify(arrayTwo[index++]));
    // if (index == arrayTwo.length) {
    //   clearInterval(interval);
    // }
  }, 1000);

  res.send(arrayTwo);
};

// export const addCall = () => {
//   callData.forEach(async (call) => {
//     if (call !== 0) await Call.addCall(call);
//     // console.log(call);
//   });
// };
