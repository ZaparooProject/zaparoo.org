import type { ComponentProps, ReactElement } from "react";
import { Children, cloneElement, isValidElement } from "react";
import OriginalListItem from "@theme-original/MDXComponents/Li";

export default function AccessibleListItem(props: ComponentProps<"li">) {
  const children = Children.toArray(props.children);
  const first = children[0];

  if (
    isValidElement(first) &&
    first.type === "input" &&
    (first.props as ComponentProps<"input">).type === "checkbox"
  ) {
    children[0] = cloneElement(first as ReactElement<ComponentProps<"input">>, {
      "aria-hidden": true,
      tabIndex: -1,
    });
  }

  return <OriginalListItem {...props}>{children}</OriginalListItem>;
}
