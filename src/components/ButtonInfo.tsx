import React from 'react';
import { BsFillQuestionCircleFill } from 'react-icons/bs';

export const ButtonInfo = () => {
  return (
    <div className="fixed bottom-0 right-0 p-20">
      <button className="cursor-pointer border-0">
        <BsFillQuestionCircleFill size={50} color="#707070" />
      </button>
      <div
        style={{ backgroundColor: '#124590' }}
        className="absolute  top-[50%] left-[50%] -translate-x-[50%] -translate-y-[115%] h-[300px] w-[160px] rounded-3xl p-5 z-50"
      >
        <button className="text-white">informacion</button>
        <button>redes sociales</button>
      </div>
    </div>
  );
};
