import classnames from "classnames";
import { PropsWithChildren } from "react";

export interface ButtonProps
  extends PropsWithChildren<any>,
    Record<string, any> {
  component?: any;
  borderColor?: string;
  bgColor?: string;
  color?: string;
  borderActive?: string;
  bgActive?: string;
  colorActive?: string;
  fontWeight?: string;
  paddingX?: number;
  paddingY?: number;
  disabled?: boolean;
  rounded?: "none" | "xs" | "small" | "default" | "medium" | "half" | "full";
}

const Button = (props: ButtonProps) => {
  let {
    component: Component = "button",
    children,
    borderColor,
    bgColor = "blue",
    color = "white",
    fontWeight = "bold",
    rounded = "small",
    paddingX = 4,
    paddingY = 1,
    disabled,
    borderActive,
    bgActive,
    colorActive,
    ...otherProps
  } = props;

  if (disabled) {
    bgColor = "gray-light";
    borderColor = "gray-light";
    color = "white";
  }

  if (!borderColor) {
    borderColor = bgColor;
  }

  const _borderActive = !borderActive ? `${borderColor}-active` : borderActive;
  const _bgActive = !bgActive ? `${bgColor}-active` : bgActive;
  const _colorActive = !colorActive ? `${color}-active` : colorActive;

  const activeClass = `focus:bg-${_bgActive} focus:border-${_borderActive} focus:text-${_colorActive} hover:bg-${_bgActive} hover:border-${_borderActive} hover:text-${_colorActive}`;

  const classNames = `reset-button group inline-flex flex-col items-stretch overflow-hidden text-base transition-colors
  bg-${bgColor} border-${borderColor} text-${color} ${activeClass} cursor-pointer border-1 border-solid rounded-${rounded}`;

  return (
    <Component
      {...otherProps}
      disabled={disabled}
      className={classnames(classNames, (props as any).className)}
    >
      <span
        data-testid={"button-wrapper"}
        className={`flex justify-center items-center h-full w-full font-${fontWeight} px-${paddingX} py-${paddingY}`}
      >
        <span className='m-1 text-center flex justify-center items-center'>
          {children}
        </span>
      </span>
    </Component>
  );
};

export { Button };
