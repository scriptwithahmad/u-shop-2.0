import "@/styles/globals.css";
import "@/styles/createProduct.css";
import "@/styles/singleProduct.css";
import "@/styles/category.css";
import "@/styles/Navbar.css";
import "@/styles/ShopingCart.css";
import Layout from "@/components/Layout";
import CartProvider from "@/context/CartProvider";
import Context from "@/context/AuthContext";

export default function App({ Component, pageProps }) {
  return (
    <Context>
      <CartProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CartProvider>
    </Context>
  );
}
