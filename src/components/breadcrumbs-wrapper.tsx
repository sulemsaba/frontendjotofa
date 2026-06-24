"use client";

import { usePathname } from "next/navigation";
import { Breadcrumbs } from "./breadcrumbs";

export function BreadcrumbsWrapper() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20">
      <Breadcrumbs />
    </div>
  );
}
