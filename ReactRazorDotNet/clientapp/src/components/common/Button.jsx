import React from "react";

const Button = ({
  id,
  className = "",
  Style,
  type = "primary",
  text,
  href,
  onClick,
}) => {
  return (
    <a
      href={href}
      onClick={onClick}
      id={id}
      className={`btn ${type} ${className}`}
      Style={Style}
    >
      {text}
    </a>
  );
};

export default Button;
