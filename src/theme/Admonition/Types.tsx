import type { ComponentType } from "react";
import OriginalAdmonitionTypes from "@theme-original/Admonition/Types";
import type { Props } from "@theme/Admonition";

const withDefaultTitle = (
  Component: ComponentType<Props>,
  defaultTitle: string,
): ComponentType<Props> =>
  function AdmonitionWithDefaultTitle(props: Props) {
    return <Component {...props} title={props.title ?? defaultTitle} />;
  };

export default {
  ...OriginalAdmonitionTypes,
  note: withDefaultTitle(OriginalAdmonitionTypes.note, "Note"),
  tip: withDefaultTitle(OriginalAdmonitionTypes.tip, "Tip"),
  info: withDefaultTitle(OriginalAdmonitionTypes.info, "Info"),
  warning: withDefaultTitle(OriginalAdmonitionTypes.warning, "Warning"),
  danger: withDefaultTitle(OriginalAdmonitionTypes.danger, "Danger"),
};
