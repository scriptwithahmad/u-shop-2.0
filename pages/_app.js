import "@/styles/globals.css";
import "@/styles/createProduct.css";
import "@/styles/singleProduct.css";
import "@/styles/category.css";
import "@/styles/Navbar.css";
import "@/styles/ShopingCart.css";
import Layout from "@/components/Layout";
import CartProvider from "@/context/CartProvider";

export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  )
}
