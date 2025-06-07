import { NextSeo } from "next-seo";
import Head from "next/head";
import Hero from "../components/Hero";
import LandingLayout from "../components/LandingLayout";

export default function Home() {
  return (
    <>

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
