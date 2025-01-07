import React from "react";

interface Props {
  items: { label: string }[];
  activeItem: number;
  setActiveItem: (index: number) => void;
  className?: string;
}

const Stepper = (props: Props) => {
  return (
    <div className={`flex items-center justify-around ${props.className}`}>
      {props.items.map((item, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center">
            <div
              className={`rounded-full w-6 h-6 flex justify-center items-center transition-all ${
                index === props.activeItem
                  ? "bg-green-500 text-white"
                  : index > props.activeItem
                  ? "bg-gray-400 text-white"
                  : "bg-green-700 text-white"
              } ${index <= props.activeItem ? "cursor-pointer" : ""}`}
              onClick={() => index <= props.activeItem && props.setActiveItem(index)}
            >
              {index + 1}
            </div>
            <p>{item.label}</p>
          </div>
          {index !== props.items.length - 1 && (
            <div
              className={`border h-0 w-full -mt-5 relative after:absolute after:left-0 after:top-0 after:border after:transition-all after:duration-300 after:ease-in ${
                index < props.activeItem
                  ? "after:w-full after:border-green-500"
                  : "after:w-0"
              }`}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Stepper;
