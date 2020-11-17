// models
import { Call } from './Call.js';

const addCall = async (call) => {
  try {
    // error is catched by try/catch
    Call.create({
      duration: call,
    });
  } catch (ex) {
    console.log(`addCall error: ${ex}`.red);
  }
};

const fetchData = async () => {
  try {
    const callData = await Call.find();
    return callData.map((item) => ({
      ID: item._id,
      duration: item.duration,
    }));
  } catch (ex) {
    console.log(`fetchData error: ${ex}`);
  }
};

export { addCall, fetchData };
