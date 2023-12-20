import "@/styles/globals.css";
import "@/styles/createProduct.css";
import "@/styles/singleProduct.css";
import "@/styles/category.css";
import "@/styles/Navbar.css";
import "@/styles/ShopingCart.css";
import Layout from "@/components/Layout";
import CartProvider from "@/context/CartProvider";
import Context from "@/context/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

export default function App({ Component, pageProps }) {
  const queryClient = new QueryClient();
  return (
    <Context>
      <CartProvider>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </CartProvider>
    </Context>
  );
}
