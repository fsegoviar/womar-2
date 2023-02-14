type PropsItem = {
  img: string;
  text: string;
};

export const ItemFooter = (props: PropsItem) => {
  return (
    <div className="flex flex-col justify-center items-center mx-20">
      {/* Icono */}
      <div
        className="bg-center bg-cover bg-no-repeat"
        style={{
          background: `url(${props.img})`,
          width: '100px',
          height: '100px'
        }}
      ></div>
      {/* Texto */}
      <p style={{ width: '100px' }} className="text-center text-white">
        {props.text}
      </p>
    </div>
  );
};
