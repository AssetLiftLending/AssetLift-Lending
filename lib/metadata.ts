import type { Metadata } from 'next';

const BASE_URL = 'https://www.assetliftlending.com';

interface CreateMetadataOptions {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noIndex?: boolean;
  keywords?: string[];
  category?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
}

function trimDescription(description: string, max = 158) {
  if (description.length <= max) return description;
  const cut = description.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > 100 ? lastSpace : cut.length).replace(/[\s,;:.-]+$/, '')}.`;
}

function withBrand(title: string) {
  return title.includes('AssetLift Lending') ? title : `${title} | AssetLift Lending`;
}

export function createMetadata({
  title,
  description,
  path,
  ogImage = '/og-image.jpg',
  noIndex = false,
  keywords,
  category,
  type = 'website',
  publishedTime,
  modifiedTime,
}: CreateMetadataOptions): Metadata {
  const url = `${BASE_URL}${path}`;

  // Keep search titles short enough to show in full. When the brand suffix
  // from the root layout template would push the title past ~60 characters,
  // render the page title on its own.
  const fitsWithBrand = withBrand(title).length <= 60 || title.includes('AssetLift Lending');
  const safeDescription = trimDescription(description);

  return {
    title: fitsWithBrand ? title : { absolute: title },
    description: safeDescription,
    ...(keywords && { keywords }),
    ...(category && { category }),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: withBrand(title),
      description: safeDescription,
      url,
      siteName: 'AssetLift Lending',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title: withBrand(title),
      description: safeDescription,
      images: [ogImage],
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: true,
      },
    }),
  };
}
