"use client";

import BreadcrumbNav, { BreadcrumbItem } from "./BreadcrumbNav";

export type { BreadcrumbItem };

export interface BreadcrumbProps {
    items: BreadcrumbItem[];
    className?: string;
}

export default function Breadcrumb({ items, className }: BreadcrumbProps) {
    return (
        <div className={className}>
            <BreadcrumbNav items={items} />
        </div>
    );
}
