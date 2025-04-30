import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "../../../public/assets/logoHeader.png";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaTwitter,
  FaFacebook,
  FaCode,
  FaBoxOpen,
  FaShieldAlt,
  FaFileContract,
  FaExchangeAlt
} from "react-icons/fa";
import { motion } from "framer-motion";

// Animation variants (same as before)
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const hoverEffect = {
  scale: 1.02,
  transition: { type: "spring", stiffness: 300 },
};

function Footer() {
  return (
    <footer className="bg-black text-white px-6 py-12 transition-all duration-500">
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Brand Card (unchanged) */}
          <motion.div
            className="bg-zinc-900 rounded-2xl p-6 shadow-xl"
            variants={itemVariants}
            whileHover={hoverEffect}
          >
            <Link href="/" className="flex items-center mb-4">
              <Image src={Logo} height={40} alt="Logo" className="me-3" />
              <span className="text-2xl font-bold">Budaniya Technologies</span>
            </Link>
            <p className="text-sm text-gray-400">
              At Budaniya Technologies, we believe collaboration and innovation are the keys to success.
              We work closely with our clients to tailor our services and deliver measurable results through innovative solutions.
            </p>
          </motion.div>

          {/* Links Card - Now with Icons */}
          <motion.div
            className="bg-zinc-900 rounded-2xl p-6 shadow-xl"
            variants={itemVariants}
            whileHover={hoverEffect}
          >
            <h2 className="text-lg font-semibold mb-4">Explore</h2>
            <ul className="space-y-3 text-gray-300">
              {[
                { icon: <FaCode className="text-blue-400" />, href: "/services", text: "Services" },
                { icon: <FaBoxOpen className="text-green-400" />, href: "/products", text: "Products" },
                { icon: <FaShieldAlt className="text-purple-400" />, href: "/privacyPolicy", text: "Privacy Policy" },
                { icon: <FaFileContract className="text-yellow-400" />, href: "/termsAndConditions", text: "Terms & Conditions" },
                { icon: <FaExchangeAlt className="text-red-400" />, href: "/returnAndRefund", text: "Return & Refund" },
              ].map((link, index) => (
                <motion.li
                  key={index}
                  className="flex items-center"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="mr-3">{link.icon}</span>
                  <Link href={link.href} className="hover:text-white transition">
                    {link.text}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social Card (unchanged) */}
          <motion.div
            className="bg-zinc-900 rounded-2xl p-6 shadow-xl"
            variants={itemVariants}
            whileHover={hoverEffect}
          >
            <h2 className="text-lg font-semibold mb-4">Connect With Us</h2>
            <ul className="space-y-3 text-gray-300">
              {[
                { icon: <FaGithub />, href: "https://github.com/ajaydeveloper95", text: "GitHub" },
                { icon: <FaLinkedin />, href: "https://www.linkedin.com/company/102926781/admin/feed/posts/?feedType=following", text: "LinkedIn" },
                { icon: <FaInstagram />, href: "https://www.instagram.com/budaniya.technologies/", text: "Instagram" },
                { icon: <FaTwitter />, href: "https://twitter.com/budaniyatech", text: "Twitter" },
                { icon: <FaFacebook />, href: "https://www.facebook.com/people/Budaniya-Technologies/61559805143453/", text: "Facebook" },
              ].map((social, index) => (
                <motion.li
                  key={index}
                  className="flex items-center"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="mr-3">{social.icon}</span>
                  <Link href={social.href} target="_blank" className="hover:text-white transition">
                    {social.text}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Footer (unchanged) */}
        {/* Bottom Footer - Modified for centered text */}
        <motion.div
          className="mt-10 border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-center text-sm text-gray-500 text-center"
          variants={itemVariants}
        >
          <span>
            © 2024 <Link href="/" className="hover:underline text-white">Budaniya Technologies</Link>. All Rights Reserved.
          </span>
          <div className="flex space-x-4 mt-4 md:mt-4">
            {/* Additional icons can be added here */}
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}

export default Footer;
// import Image from "next/image";
// import Link from "next/link";
// import React from "react";
// import Logo from "../../../public/assets/logoHeader.png";

// function Footer() {
//   return (
//     <footer className="bg-transparent dark:bg-gray-900">
//       <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
//       <div className="mx-auto w-full p-4 py-6 lg:py-8">
//         <div className="md:flex md:justify-between">
//           <div className="mb-6 md:mb-0 sm:w-full md:w-1/2 lg:w-1/3">
//             <Link href="/" className="flex items-center">
//               <Image src={Logo} className="h-8 me-3" height={40} alt="Logo" />
//               <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
//                 Budaniya Technologies
//               </span>
//             </Link>
//             <div className="py-2">
//               At Budaniya Technologies, we believe collaboration and innovation
//               are the keys to success. That's why we work closely with our
//               clients to understand their unique needs and goals and tailor our
//               services to deliver measurable results. We take pride in our
//               ability to think outside the box and come up with innovative
//               solutions that set our clients apart from the competition.
//             </div>
//           </div>
//           <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
//             <div>
//               <h2 className="mb-6 text-sm font-semibold  uppercase dark:text-white">
//                 Resources
//               </h2>
//               <ul className=" dark:text-gray-400 font-medium">
//                 <li className="mb-4">
//                   <Link href="/services" className="hover:underline">
//                     Services
//                   </Link>
//                 </li>
//                 <li className="mb-4">
//                   <Link href="/products" className="hover:underline">
//                     Products
//                   </Link>
//                 </li>
//                 {/* <li>
//                   <Link href="/caseStudy" className="hover:underline">
//                     Case Study
//                   </Link>
//                 </li> */}
//               </ul>
//             </div>
//             <div>
//               <h2 className="mb-6 text-sm font-semibold  uppercase dark:text-white">
//                 Follow us
//               </h2>
//               <ul className=" dark:text-gray-400 font-medium">
//                 <li className="mb-4">
//                   <Link
//                     href="https://github.com/ajaydeveloper95"
//                     target="_blank"
//                     className="hover:underline "
//                   >
//                     Github
//                   </Link>
//                 </li>
//                 <li className="mb-4">
//                   <Link
//                     href="https://www.linkedin.com/company/102926781/admin/feed/posts/?feedType=following"
//                     className="hover:underline"
//                     target="_blank"
//                   >
//                     linkedIn
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="https://www.instagram.com/budaniya.technologies/?fbclid=IwZXh0bgNhZW0CMTAAAR2mYm7YSYHNlGrwsp7FDquzq1O9qm-utS1t9Mfh5ye_Gct3cVupKCU1xgg_aem_AYmc6aztm5eOsUwJPBL3Ax61vMSrF90SKmaDnaEIWeyAGbBfNPw6q0x0BwEW5D6HQjXfNra-doxIRaKiu2x_ZayO"
//                     target="_blank"
//                     className="hover:underline"
//                   >
//                     Instagram
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h2 className="mb-6 text-sm font-semibold  uppercase dark:text-white">
//                 Legal
//               </h2>
//               <ul className=" dark:text-gray-400 font-medium">
//                 <li className="mb-4">
//                   <Link href="/privacyPolicy" className="hover:underline">
//                     Privacy Policy
//                   </Link>
//                 </li>
//                 <li className="mb-4">
//                   <Link href="/termsAndConditions" className="hover:underline">
//                     Terms &amp; Conditions
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/returnAndRefund" className="hover:underline">
//                     Return &amp; Refund
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//         <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
//         <div className="sm:flex sm:items-center sm:justify-between">
//           <span className="text-sm  sm:text-center dark:text-gray-400">
//             © 2024{" "}
//             <Link href="/" className="hover:underline">
//               Budaniya Technologies
//             </Link>
//             . All Rights Reserved.
//           </span>
//           <div className="flex mt-4 sm:justify-center sm:mt-0">
//             <a
//               href="https://www.facebook.com/people/Budaniya-Technologies/61559805143453/"
//               target="_blank"
//               className=" hover: dark:hover:text-white"
//             >
//               <svg
//                 className="w-4 h-4"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="currentColor"
//                 viewBox="0 0 8 19"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               <span className="sr-only">Facebook page</span>
//             </a>
//             <a
//               href="https://www.instagram.com/budaniya.technologies/?fbclid=IwZXh0bgNhZW0CMTAAAR2mYm7YSYHNlGrwsp7FDquzq1O9qm-utS1t9Mfh5ye_Gct3cVupKCU1xgg_aem_AYmc6aztm5eOsUwJPBL3Ax61vMSrF90SKmaDnaEIWeyAGbBfNPw6q0x0BwEW5D6HQjXfNra-doxIRaKiu2x_ZayO"
//               target="_blank"
//               className=" hover: dark:hover:text-white ms-5"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="w-4 h-4"
//                 viewBox="0 0 24 24"
//                 fill="white"
//                 stroke="#000000"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
//                 <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
//                 <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
//               </svg>
//               <span className="sr-only">Instagram community</span>
//             </a>
//             <a
//               href="https://twitter.com/budaniyatech"
//               target="_blank"
//               className=" hover: dark:hover:text-white ms-5"
//             >
//               <svg
//                 className="w-4 h-4"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="currentColor"
//                 viewBox="0 0 20 17"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               <span className="sr-only">Twitter page</span>
//             </a>
//             <a
//               href="https://github.com/ajaydeveloper95"
//               target="_blank"
//               className=" hover: dark:hover:text-white ms-5"
//             >
//               <svg
//                 className="w-4 h-4"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               <span className="sr-only">GitHub account</span>
//             </a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

// export default Footer;
