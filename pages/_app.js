import Navbar from "../src/component/header/Navbar";
import Footer from "../src/component/footer/Footer";
import "../styles/global.css";
import Head from "next/head";
import { CartProvider } from "../src/component/CartContext";


const MyApp = ({ Component, pageProps }) => {
  return (
    <>
    
      <Head>
        <title>Budaniya Technologies</title>
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
