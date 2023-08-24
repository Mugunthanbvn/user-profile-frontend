import classNames from "classnames";
import React, {
  HTMLInputTypeAttribute,
  useEffect,
  useRef,
  useState,
} from "react";
import { ReactComponent as EyeIcon } from "../../assets/icons/eye-icon.svg";
import "../../styles/InputField.css";

export type InputValueType = string | number;

interface IInputFieldProps {
  title: string;
  subTitle?: string;
  value?: InputValueType;
  placeholder?: string;
  className?: string;
  onChange?: (value: InputValueType) => void;
  onValueUpdate?: (value: InputValueType) => void;
  validate?: (value: InputValueType) => string;
  type?: HTMLInputTypeAttribute;
  isRequired?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
}
export const InputField = (props: IInputFieldProps) => {
  const {
    title,
    value = "",
    type = "text",
    subTitle,
    className,
    isRequired = false,
    placeholder,
    minLength,
    maxLength,
    pattern,
    validate,
    onChange,
    onValueUpdate,
  } = props;
  const [inputValue, setInputValue] = useState(value);
  const [inputType, setInputType] = useState(type);
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const valueUpdateHandler = (e: any) => {
    if (e.target?.value != null) {
      onValueUpdate?.(e.target.value);
      const validationMsg =
        e.target.validationMessage || validate?.(e.target.value);
      if (validationMsg) {
        setErrorMsg(validationMsg);
      } else {
        setErrorMsg("");
      }
    }
  };
  useEffect(() => {
    const pasteListener = (e: ClipboardEvent) => {
      valueUpdateHandler(e);
    };
    const autoFillHandler = (event: AnimationEvent) => {
      if (event.animationName === "onAutoFillStart") {
        valueUpdateHandler(event);
      }
    };
    const element = inputRef.current;
    element?.addEventListener("paste", pasteListener);
    element?.addEventListener("animationstart", autoFillHandler);
    return () => {
      element?.removeEventListener("paste", pasteListener);
      element?.removeEventListener("animationstart", autoFillHandler);
    };
  }, []);

  return (
    <div
      className={classNames({
        "input-field-container": true,
        [className]: className,
      })}
    >
      <div className="input-field-title">
        <span>{title}</span>
        {isRequired && <span className="input-field-required">*</span>}
      </div>
      {subTitle && <span className="subtitle">{subTitle}</span>}
      <div className="input-container">
        <input
          type={inputType}
          value={inputValue}
          required={isRequired}
          placeholder={placeholder}
          onChange={(e) => {
            setInputValue(e.target.value);
            onValueUpdate(e.target.value);
            onChange?.(e.target.value);
          }}
          onBlur={(e) => {
            valueUpdateHandler(e);
          }}
          autoComplete={type === "password" ? "off" : "on"}
          minLength={minLength}
          maxLength={maxLength}
          pattern={pattern}
          ref={inputRef}
        />
        {type === "password" && (
          <EyeIcon
            className={classNames({
              icon: true,
              active: inputType === "password",
            })}
            onClick={(e) => {
              e.stopPropagation();
              setInputType(inputType === "password" ? "text" : "password");
            }}
          />
        )}
      </div>
      {errorMsg && <span className="input-field-error">{errorMsg}</span>}
    </div>
  );
};
