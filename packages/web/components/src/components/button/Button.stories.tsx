// @ts-ignore
import React from "react";

import { Button } from "./Button";
const COLORS_LIST = ["primary", "primary", "blue", "red", "green", "white"];

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    bgColor: {
      control: {
        type: "select",
        options: COLORS_LIST
      }
    },
    borderColor: {
      control: {
        type: "select",
        options: COLORS_LIST
      }
    },
    color: {
      control: {
        type: "select",
        options: COLORS_LIST
      }
    },
    component: {
      control: {
        type: "select",
        options: ["a", "span", "button"]
      }
    }
  },
  parameters: {
    docs: {
      source: {
        type: "code"
      }
    }
  }
};

export const Sandbox = (args: any) => {
  return <Button {...args}>{args.children}</Button>;
};

Sandbox.args = {
  children: "Hello world",
  bgColor: "primary",
  borderColor: "primary",
  color: "white",
  disabled: false,
  fontWeight: "bold",
  paddingX: 4,
  paddingY: 1,
  className: "",
  component: "button"
};
