import{B as t}from"./Button.0c59f4cd.js";import{j as r}from"./jsx-runtime.afe2f11c.js";import"./index.29465ecc.js";const o=["primary","primary","blue","red","green","white"];var c={title:"Components/Button",component:t,argTypes:{bgColor:{control:{type:"select",options:o}},borderColor:{control:{type:"select",options:o}},color:{control:{type:"select",options:o}},component:{control:{type:"select",options:["a","span","button"]}}},parameters:{storySource:{source:`// @ts-ignore
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
;Sandbox.__docgenInfo={"description":"","methods":[],"displayName":"Sandbox"}`,locationsMap:{sandbox:{startLoc:{col:23,line:45},endLoc:{col:1,line:47},startBody:{col:23,line:45},endBody:{col:1,line:47}}}},docs:{source:{type:"code"}}}};const e=n=>r(t,{...n,children:n.children});e.args={children:"Hello world",bgColor:"primary",borderColor:"primary",color:"white",disabled:!1,fontWeight:"bold",paddingX:4,paddingY:1,className:"",component:"button"};e.__docgenInfo={description:"",methods:[],displayName:"Sandbox"};const p=["Sandbox"];export{e as Sandbox,p as __namedExportsOrder,c as default};
//# sourceMappingURL=Button.stories.ab50b661.js.map
