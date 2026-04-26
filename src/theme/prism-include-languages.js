import includeDefaultLanguages from "@theme-original/prism-include-languages";
import defineZapScript from "../prism/prism-zapscript";

export default function prismIncludeLanguages(PrismObject) {
  includeDefaultLanguages(PrismObject);

  // Register ZapScript language
  defineZapScript(PrismObject);
}
