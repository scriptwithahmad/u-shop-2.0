import Head from "next/head";

import Header from "@/components/Header";
import ProductList from "@/components/ProductList";
import Features from "@/components/Features";
import queryStr from "query-string";
import Testimonials from "@/components/Testimonials";

export default function Home({ products, start, end, total, page }) {
  return (
    <>
      <Head>
        <title>U-Shop: Trendy Finds at Your Fingertips </title>
        <meta
          name="description"
          content="Shop at U-Shop and discover a world of fashion. Get your hands on style that speaks volumes today."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <Features />
      <Testimonials />
      <ProductList
        props={products}
        start={start}
        end={end}
        total={total}
        page={page}
      />
    </>
  );
}
export async function getServerSideProps(props) {
  const queryString = queryStr.stringify(props.query);
  const res = await fetch(
    `https://u-shop-liart.vercel.app/api/get-all-product?${queryString}`
  );
  const data = await res.json();

  return {
    props: {
      products: data.message.ProductData,
      start: data.message.starting,
      end: data.message.ending,
      total: data.message.TotalProducts,
      page: data?.message?.page,
    },
  };
}
