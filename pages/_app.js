import "@/styles/globals.css";
import "@/styles/createProduct.css";
import "@/styles/singleProduct.css";
import Layout from "@/components/Layout";
import "@/styles/category.css";
import "@/styles/Navbar.css";
import "@/styles/ShopingCart.css";

export default function App({ Component, pageProps }) {
  return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
  );
}
