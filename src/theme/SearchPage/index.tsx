import { useEffect } from "react";
import OriginalSearchPage from "@theme-original/SearchPage";

export default function SearchPage() {
  useEffect(() => {
    document
      .querySelectorAll<HTMLSelectElement>(".search-page-wrapper select")
      .forEach((select) => select.setAttribute("aria-label", "Documentation version"));
  }, []);

  return <OriginalSearchPage />;
}
