import { NextSeo, NextSeoProps } from 'next-seo'

interface MetaTagsProps extends NextSeoProps {
  title: string
  description: string
  image?: string
  url?: string
}

const MetaTags = ({ title, description, image, url, ...rest }: MetaTagsProps) => {
  const siteName = "Munden Truck & Equipment Ltd."
  const defaultImage = "/images/og-image.jpg" // We'll create this later
  
  return (
    <NextSeo
      title={title}
      description={description}
      titleTemplate={`%s | ${siteName}`}
      defaultTitle={siteName}
      openGraph={{
        type: 'website',
        locale: 'en_CA',
        url: url || 'https://mundentruckequipment.com',
        siteName,
        title,
        description,
        images: [
          {
            url: image || defaultImage,
            width: 1200,
            height: 630,
            alt: title,
          }
        ],
      }}
      twitter={{
        handle: '@mundentruckequipment',
        site: '@mundentruckequipment',
        cardType: 'summary_large_image',
      }}
      additionalMetaTags={[
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          name: 'author',
          content: siteName,
        },
      ]}
      additionalLinkTags={[
        {
          rel: 'icon',
          href: '/favicon.ico',
        },
        {
          rel: 'apple-touch-icon',
          href: '/apple-touch-icon.png',
          sizes: '180x180',
        },
      ]}
      {...rest}
    />
  )
}

export default MetaTags