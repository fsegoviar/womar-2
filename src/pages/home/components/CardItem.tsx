import React from 'react';
import { RiMapPin2Fill } from 'react-icons/ri';
type PropsCard = {
  title: string;
  direction: string;
  price: string;
  img: string;
};

export const CardItem = (props: PropsCard) => {
  return (
    <div className="h-[350px] w-[320px] bg-white rounded-xl">
      {/* imagen */}
      <div
        className="rounded-xl bg-center bg-cover bg-no-repeat w-full h-[200px]"
        style={{ backgroundImage: `url(${props.img})` }}
      ></div>
      <div className="p-5">
        <h2 className="font-bold text-2xl">{props.title}</h2>
        <label className="flex first-line:block font-thin text-md">
          {' '}
          <RiMapPin2Fill size={24} className="mr-2" color="blue" />
          {props.direction}
        </label>
        <label className="block font-thin text-md">$ {props.price}</label>
      </div>
    </div>
  );
};
