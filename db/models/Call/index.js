// models
import { Call } from './Call.js';

const addCall = async (call) => {
  try {
    // const lastIndex = webApiDataReversed.length - 1;
    // arg.data = webApiDataReversed[lastIndex];

    // error is catched by try/catch
    Call.create({
      duration: call,
    });
  } catch (ex) {
    console.log(`addCall error: ${ex}`.red);
    // next(new ErrorResponse(`Error: ${ex}`, 404));
    // next(ex);
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
