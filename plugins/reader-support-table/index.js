/**
 * Remark plugin: on platform pages, swaps the plain Markdown table under
 * "## Readers" for the styled <ReaderSupport /> component. The table stays in
 * the page source because Core ships each platform page as a README.txt.
 */
const PLATFORM_PAGE = /\/platforms\/(?:handhelds\/)?([^/]+?)(?:\/index)?\.mdx?$/;

function headingText(node) {
  return (node.children ?? []).map((child) => child.value ?? "").join("");
}

module.exports = function readerSupportTable() {
  return (tree, file) => {
    const match = PLATFORM_PAGE.exec(String(file.path ?? "").replaceAll("\\", "/"));
    if (!match) return;
    const { children } = tree;
    for (let i = 0; i < children.length - 1; i++) {
      const node = children[i];
      if (node.type !== "heading" || node.depth !== 2 || headingText(node) !== "Readers") continue;
      if (children[i + 1].type !== "table") return;
      children[i + 1] = {
        type: "mdxJsxFlowElement",
        name: "ReaderSupport",
        attributes: [{ type: "mdxJsxAttribute", name: "platformId", value: match[1] }],
        children: [],
      };
      return;
    }
  };
};
