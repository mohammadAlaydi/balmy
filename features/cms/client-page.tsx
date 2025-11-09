"use client";

import Loading from "@/components/loading";
import PageWrapper from "@/components/page-wrapper";
import React, { use } from "react";
import UseCMS from "@/hooks/use-cms";

export default function ClientPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { t, loading, data } = UseCMS();

  if (loading) {
    return <Loading fullScreen={true} variant="spinner" size="xl" />;
  }

  const page = data?.cms_pages?.find((p: any) => p.url_key === slug);

  if (!page) {
    return <div>Page not found</div>;
  }

  return (
    <PageWrapper>
      <div
        className="min-h-[65vh]"
        dangerouslySetInnerHTML={{ __html: page?.html_content }}
      />
    </PageWrapper>
  );
}
