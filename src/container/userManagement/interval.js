import React from 'react';
export const CreateIntervalCall = (
  process = async () => {},
  intervalTime = 1000,
  processLimit = 1
) => {
  let inProcessStatus = true;
  const intervalProcess = [];
  const intervalCall = () => {
    inProcessStatus && callStart(intervalTime);
  };

  const callNext = (timeout = 0) => {
    intervalProcess.length <= processLimit
      ? intervalProcess.push(
          setTimeout(async () => {
            await process();
            intervalProcess.shift();
            intervalCall();
          }, timeout)
        )
      : callStart();
  };

  const callStart = (time = 100) => callNext(time);
  const callStop = () => {
    inProcessStatus = false;
    intervalProcess.map((ps) => {
      clearTimeout(ps);
    });
  };

  return {
    callStart,
    callStop,
  };
};

const intervalFactory = () => ({ CreateIntervalCall });
export default intervalFactory;
