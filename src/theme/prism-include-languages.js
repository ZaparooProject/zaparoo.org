import defineZapScript from "../prism/prism-zapscript";

export default function prismIncludeLanguages(PrismObject) {
  // Register ZapScript language
  defineZapScript(PrismObject);
}
