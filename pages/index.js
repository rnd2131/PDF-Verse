import { NextSeo } from "next-seo";
import Head from "next/head";
import Hero from "../components/Hero";
import LandingLayout from "../components/LandingLayout";

export default function Home() {
  return (
    <>
      <NextSeo
        title="Local PDF - Your Free PDF Editor in the Browser"
        description="Edit PDF files in your browser with Local PDF. Merge, optimize, watermark, and more. No installation or registration needed, and your files never leave your system."
        canonical="https://localpdf.tech/"
        openGraph={{
          url: "https://localpdf.tech/",
          title: "Local PDF - Your Free PDF Editor in the Browser",
          description:
            "Edit PDF files in your browser with Local PDF. Merge, optimize, watermark, and more. No installation or registration needed, and your files never leave your system.",
          type: "website",
          images: [
            {
              url: "https://raw.githubusercontent.com/julianfbeck/localpdfmerger/main/public/og-image-01.png",
              width: 1200,
              height: 630,
              alt: "Local PDF - Your Free PDF Editor in the Browser",
              type: "image/jpeg",
            },
          ],
          siteName: "Local PDF",
        }}
        twitter={{
          handle: "@julianfbeck",
          site: "@julianfbeck",
          cardType: "summary_large_image",
        }}
      />

      <LandingLayout>
        <Hero
          ctaText1="چسباندن"
          ctaLink1="/merge"
          ctaText2="بهینه سازی"
          ctaLink2="/optimize"
          ctaText3="خروجی گرفتن"
          ctaLink3="/extract"
          ctaText4="اضافه کردن Watermark"
          ctaLink4="/watermark"
        />
      </LandingLayout>
    </>
  );
}
