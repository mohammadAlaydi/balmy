'use client';

import Loading from '@/components/loading';
import PageWrapper from '@/components/page-wrapper';
import { getHomeData } from '@/store/slices/home-slice';
import { useTranslations } from 'next-intl';
import React, { use, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
    
  const { slug } = use(params);
  const { data, loading } = useSelector((state: any) => state.home);
  const dispatch = useDispatch();
  useEffect(() => {         
    dispatch(getHomeData() as any);
  }, [dispatch]);
  const t = useTranslations("cms");
  if (loading) {
    return <Loading fullScreen={true} variant="spinner" size="xl" />;
  }
  const page = data?.cms_pages?.find((page: any) => page.url_key === slug);
  if (!page) {
    return <div>Page not found</div>;
  }
  return (
    <PageWrapper>
      <div dangerouslySetInnerHTML={{ __html: page?.html_content }} />
    </PageWrapper>
  )
}