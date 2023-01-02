type PropsStep = {
  spanNumber: string;
  label: string;
  image: string;
};

export const StepsComponent = (props: PropsStep) => {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div
        className="bg-center bg-cover bg-no-repeat relative"
        style={{
          backgroundImage: `url(${props.image})`,
          width: '90px',
          height: '90px'
        }}
      ></div>
      <p className="font font-bold text-center pt-2 w-8/12 pb-10 md:text-lg lg:text-xl">
        {props.label}
      </p>
    </div>
  );
};
