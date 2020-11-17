import * as Call from '../db/models/Call/index.js';
import { callData } from '../Data/callData.js';

export const fetchData = async (req, res) => {
  const result = await Call.fetchData();
  console.log('result: ', result);
  res.send(result);
};

// export const addCall = () => {
//   callData.forEach(async (call) => {
//     if (call !== 0) await Call.addCall(call);
//     // console.log(call);
//   });
// };
