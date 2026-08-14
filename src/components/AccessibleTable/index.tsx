import type { ComponentProps } from "react";
import { useEffect, useRef, useState } from "react";

export default function AccessibleTable(props: ComponentProps<"table">) {
  const tableRef = useRef<HTMLTableElement>(null);
  const [scrollable, setScrollable] = useState(false);

  useEffect(() => {
    const table = tableRef.current;
    if (!table) return;

    const update = () => setScrollable(table.scrollWidth > table.clientWidth);
    const observer = new ResizeObserver(update);
    observer.observe(table);
    update();
    return () => observer.disconnect();
  }, []);

  return (
    <table
      {...props}
      ref={tableRef}
      tabIndex={scrollable ? 0 : props.tabIndex}
      aria-label={
        scrollable ? props["aria-label"] ?? "Scrollable data table" : props["aria-label"]
      }
    />
  );
}
