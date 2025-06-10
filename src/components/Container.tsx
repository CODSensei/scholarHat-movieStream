import React from "react";
import type { CustomComponentProps } from "../utils/interfaces";
import { mergeClassName } from "../utils/utils";

const Container: React.FC = (props: CustomComponentProps) => {
  return (
    <div
      className={mergeClassName(
        "px-6 py-3 max-w-screen-lg mx-auto",
        props?.classname
      )}
    >
      {props?.children}
    </div>
  );
};

export default Container;
