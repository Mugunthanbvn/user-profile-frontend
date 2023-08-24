import React from "react";
import "../../styles/Button.css";

interface IButoonProps {
  label: string;
  onClick: (event: React.MouseEvent) => void;
  type?: "button" | "submit" | "reset";
}
export const Button = (props: IButoonProps) => {
  const { label, type, onClick } = props;
  return (
    <div className="button-container">
      <button onClick={onClick} type={type}>
        {label}
      </button>
    </div>
  );
};
