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
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9178494129435619"
          crossorigin="anonymous"
        ></script>

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-8RQH9FSEW6"
        ></script>

        <script>
          window.dataLayer = window.dataLayer || [] function gtag()
          {dataLayer.push(arguments)}
          gtag('js', new Date()); gtag('config', 'G-8RQH9FSEW6');
        </script>
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
