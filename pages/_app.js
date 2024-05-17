import Navbar from "../src/component/header/Navbar";
import Footer from "../src/component/footer/Footer";
import "../styles/global.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer/>
    </>
  );
};
export default MyApp;
