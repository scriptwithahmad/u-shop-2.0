import Head from "next/head";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import BestSeller from "@/components/BestSeller";
import LatestProductSec from "@/components/LatestProductSec";
import LatestMobiles from "@/components/LatestMobiles";
import ShopByPrice from "@/components/ShopByPrice";
import InstallmentBanner from "@/components/installmentBanner";
import Steps from "@/components/Steps";
import { data } from "autoprefixer";
import Product from "@/models/product";
import ProductList from "@/components/ProductList";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ data }) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <ProductList props={data} />
    </>
  );
}

export async function getServerSideProps() {
  const response = await fetch(
    "https://e-commerce-frontend-zeta.vercel.app//api/get-all-product"
  );
  const data = await response.json();

  return { props: { data } };
}
