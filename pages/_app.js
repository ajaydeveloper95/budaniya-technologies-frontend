import Navbar from "../src/component/header/Navbar";
import Footer from "../src/component/footer/Footer";
import "../styles/global.css";
import Head from "next/head";
import { CartProvider } from "../src/component/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Script from "next/script";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <ToastContainer position="top-right" />

      <Head>
        <title>Budaniya Technologies LLP</title>
        <link rel="icon" href="/favicon.ico" />

        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9178494129435619"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-8RQH9FSEW6"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8RQH9FSEW6');
          `}
        </Script>
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
