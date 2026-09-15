// Exposes the newest blog posts as global data for the homepage, so pages do
// not import files from the generated directory. That directory differs
// between `pnpm start` (.docusaurus) and `pnpm build` (.docusaurus-build),
// and importing it directly let a build pick up the dev server's copy.
module.exports = function recentPostsPlugin(_context, options = {}) {
  const count = options.count ?? 3;
  return {
    name: "recent-posts",
    allContentLoaded({ allContent, actions }) {
      const blog = allContent["docusaurus-plugin-content-blog"]?.default;
      const posts = (blog?.blogPosts ?? [])
        .filter((post) => !post.metadata.unlisted)
        .map((post) => ({
          title: post.metadata.title,
          permalink: post.metadata.permalink,
          date:
            post.metadata.date instanceof Date
              ? post.metadata.date.toISOString()
              : String(post.metadata.date),
        }))
        .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
        .slice(0, count);
      actions.setGlobalData({ items: posts });
    },
  };
};
