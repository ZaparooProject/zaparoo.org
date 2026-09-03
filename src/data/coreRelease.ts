const coreRelease = {
  version: "2.17.1",
  releaseDate: "2026-09-03",
  blogPost: "/blog/zaparoo-frontend-v1.3.0",
  githubUrl:
    "https://github.com/ZaparooProject/zaparoo-core/releases/tag/v2.17.1",
} as const;

/** Formats an ISO date (YYYY-MM-DD) as "August 6, 2026" for display. */
export function formatReleaseDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00Z`));
}

export default coreRelease;
