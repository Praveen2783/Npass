// import Logo from "@/components/Logo"
export const siteConfig = {
  name: "Npass",
  description:
    "The most trusted password manager for individuals and businesses. Secure your digital life with military-grade encryption and zero-knowledge architecture.",
  url: "https://Npass.com",
  ogImage: "/logo.png",
  creator: "@praveensingh",
  keywords: [
    "password manager",
    "secure passwords",
    "digital security",
    "encryption",
    "password generator",
    "cybersecurity",
    "data protection",
    "secure vault",
    "password storage",
    "online security",
    "two-factor authentication",
    "password sync",
    "secure sharing",
    "business security",
    "enterprise password management",
  ],
}

export const generateMetadata = ({ title, description, image, url, keywords = [], type = "website" }) => {
  const metaTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name
  const metaDescription = description || siteConfig.description
  const metaImage = image || siteConfig.ogImage
  const metaUrl = url ? `${siteConfig.url}${url}` : siteConfig.url
  const allKeywords = [...siteConfig.keywords, ...keywords].join(", ")

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: allKeywords,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.creator,
    publisher: siteConfig.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: metaUrl,
    },
    openGraph: {
      type,
      locale: "en_US",
      url: metaUrl,
      title: metaTitle,
      description: metaDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [metaImage],
      creator: siteConfig.creator,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "your-google-verification-code",
      yandex: "your-yandex-verification-code",
      yahoo: "your-yahoo-verification-code",
    },
  }
}
