import React from "react";

const Tooltip = ({ children, text, position = "top" }) => {
  // Define positioning classes based on the `position` prop
  let positionClasses;
  switch (position) {
    case "top":
      positionClasses = "bottom-full left-1/2 transform -translate-x-1/2";
      break;
    case "bottom":
      positionClasses = "top-full left-1/2 transform -translate-x-1/2";
      break;
    case "left":
      positionClasses = "right-full top-1/2 transform -translate-y-1/2";
      break;
    case "right":
      positionClasses = "left-full top-1/2 transform -translate-y-1/2";
      break;
    default:
      positionClasses = "bottom-full left-1/2 transform -translate-x-1/2";
  }

  return (
    <div className="relative flex items-center group">
      {children}
      <div
        className={`tooltip absolute ${positionClasses} bg-gray-700 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      >
        {text}
      </div>
    </div>
  );
};

export default Tooltip;

