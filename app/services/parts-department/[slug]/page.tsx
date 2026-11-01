import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DepartmentDetailPage } from "@/components/services/DepartmentDetailPage";
import {
  getDepartmentPage,
  getDepartmentPagePath,
  partsDepartmentPages,
} from "@/lib/department-pages";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return partsDepartmentPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getDepartmentPage("parts", slug);

  if (!page) {
    return { title: "Parts Category Not Found" };
  }

  const pagePath = getDepartmentPagePath(page);

  return {
    title: `${page.navTitle} in Kamloops`,
    description: page.description,
    keywords: page.keywords,
    alternates: { canonical: pagePath },
    openGraph: {
      title: `${page.title} | Munden Truck & Equipment`,
      description: page.description,
      url: pagePath,
    },
  };
}

export default async function PartsDetailRoute({ params }: Props) {
  const { slug } = await params;
  const page = getDepartmentPage("parts", slug);

  if (!page) {
    notFound();
  }

  return <DepartmentDetailPage page={page} />;
}
