import Navbar from "../src/component/header/Navbar";
import Footer from "../src/component/footer/Footer";
import "../styles/global.css";
import Head from "next/head";
import { CartProvider } from "../src/component/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const MyApp = ({ Component, pageProps }) => {
  return (
    <>
          <ToastContainer position="top-right" />

      <Head>
        <title>Budaniya Technologies LLP</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CartProvider>
      <Navbar />
      <Component {...pageProps} />
      </CartProvider>
      <Footer />
      
    </>
  );
};
export default MyApp;
