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
  FaExchangeAlt,
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
  let fullYear = new Date().getFullYear();
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
              <span className="text-2xl font-bold">
                Budaniya Technologies LLP
              </span>
            </Link>
            <p className="text-sm text-gray-400">
              At Budaniya Technologies LLP, we believe collaboration and
              innovation are the keys to success. We work closely with our
              clients to tailor our services and deliver measurable results
              through innovative solutions.
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
                {
                  icon: <FaCode className="text-blue-400" />,
                  href: "/services",
                  text: "Services",
                },
                {
                  icon: <FaBoxOpen className="text-green-400" />,
                  href: "/products",
                  text: "Products",
                },
                {
                  icon: <FaShieldAlt className="text-purple-400" />,
                  href: "/privacyPolicy",
                  text: "Privacy Policy",
                },
                {
                  icon: <FaFileContract className="text-yellow-400" />,
                  href: "/termsAndConditions",
                  text: "Terms & Conditions",
                },
                {
                  icon: <FaExchangeAlt className="text-red-400" />,
                  href: "/returnAndRefund",
                  text: "Return & Refund",
                },
              ].map((link, index) => (
                <motion.li
                  key={index}
                  className="flex items-center"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="mr-3">{link.icon}</span>
                  <Link
                    href={link.href}
                    className="hover:text-white transition"
                  >
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
                {
                  icon: <FaGithub />,
                  href: "https://github.com/ajaydeveloper95",
                  text: "GitHub",
                },
                {
                  icon: <FaLinkedin />,
                  href: "https://www.linkedin.com/company/102926781/admin/feed/posts/?feedType=following",
                  text: "LinkedIn",
                },
                {
                  icon: <FaInstagram />,
                  href: "https://www.instagram.com/budaniya.technologies/",
                  text: "Instagram",
                },
                {
                  icon: <FaTwitter />,
                  href: "https://twitter.com/budaniyatech",
                  text: "Twitter",
                },
                {
                  icon: <FaFacebook />,
                  href: "https://www.facebook.com/people/Budaniya-Technologies/61559805143453/",
                  text: "Facebook",
                },
              ].map((social, index) => (
                <motion.li
                  key={index}
                  className="flex items-center"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="mr-3">{social.icon}</span>
                  <Link
                    href={social.href}
                    target="_blank"
                    className="hover:text-white transition"
                  >
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
            © {fullYear}{" "}
            <Link href="/" className="hover:underline text-white">
              Budaniya Technologies LLP
            </Link>
            . All Rights Reserved.
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
