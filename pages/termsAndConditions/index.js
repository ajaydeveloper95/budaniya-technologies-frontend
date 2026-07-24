import React from "react";

const sections = [
  { id: "overview", title: "Overview" },
  { id: "company", title: "Company Information" },
  { id: "definitions", title: "Definitions" },
  { id: "acceptance", title: "Acceptance of Terms" },
  { id: "services", title: "Services" },
  { id: "responsibilities", title: "User Responsibilities" },
  { id: "intellectual", title: "Intellectual Property" },
  { id: "payments", title: "Payments" },
  { id: "privacy", title: "Privacy" },
  { id: "termination", title: "Termination" },
  { id: "liability", title: "Limitation of Liability" },
  { id: "contact", title: "Contact Us" },
];

export default function Index() {
  return (
    <main className=" min-h-screen">
      {/* Hero */}
      <section className=" py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold">
            Terms & Conditions
          </h1>

          <p className="mt-4 text-blue-100 max-w-3xl leading-7">
            Please read these Terms & Conditions carefully before using the
            website and services offered by Budaniya Technologies LLP. By
            accessing or using our website, you agree to comply with these
            Terms.
          </p>

          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <span className="/20 px-4 py-2 rounded-full">
              Effective Date: 24 July 2026
            </span>

            <span className="/20 px-4 py-2 rounded-full">
              Last Updated: {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12 lg:grid lg:grid-cols-[260px_1fr] gap-10">

        {/* Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24  rounded-xl shadow border p-5">
            <h2 className="font-bold text-lg mb-4">
              Contents
            </h2>

            <nav>
              <ul className="space-y-3">
                {sections.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="hover:text-blue-600 transition"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="space-y-12">

          {/* Overview */}

          <section
            id="overview"
            className="scroll-mt-28 rounded-2xl shadow-sm border p-8"
          >
            <h2 className="text-3xl font-bold mb-5">
              Overview
            </h2>

            <p className="  leading-8">
              These Terms and Conditions ("Terms") govern your access to and use
              of the website, software, applications, APIs, digital platforms,
              and services provided by <strong>Budaniya Technologies LLP</strong>.
              By accessing our website or using any of our services, you agree
              to be legally bound by these Terms. If you do not agree with any
              provision, please discontinue use of the website immediately.
            </p>
          </section>

          {/* Company */}

          <section
            id="company"
            className="scroll-mt-28 rounded-2xl shadow-sm border p-8"
          >
            <h2 className="text-3xl font-bold mb-6">
              Company Information
            </h2>

            <div className="grid md:grid-cols-2 gap-8">

              <div>
                <h3 className="font-semibold text-xl mb-3">
                  Legal Entity
                </h3>

                <p className="  leading-8">
                  <strong>Budaniya Technologies LLP</strong>
                </p>

                <p className="  leading-8">
                  A Limited Liability Partnership registered in India.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-xl mb-3">
                  Registered Office
                </h3>

                <p className="  leading-8">
                  c/o Ramswaroop S/o Laxmanram
                  <br />
                  Madhopura, Balaran
                  <br />
                  Sikar, Rajasthan – 332401
                  <br />
                  India
                </p>
              </div>

            </div>
          </section>

          {/* Definitions */}

          <section
            id="definitions"
            className="scroll-mt-28 rounded-2xl shadow-sm border p-8"
          >
            <h2 className="text-3xl font-bold mb-6">
              Definitions
            </h2>

            <div className="space-y-5  ">

              <p>
                <strong>Company</strong> refers to Budaniya Technologies LLP,
                including its employees, affiliates, successors, and authorized
                representatives.
              </p>

              <p>
                <strong>Website</strong> refers to
                https://budaniyatechnologies.com and all related domains,
                applications, APIs, and services.
              </p>

              <p>
                <strong>Services</strong> means software development,
                consulting, web development, mobile applications, SaaS
                platforms, cloud services, payment integrations, APIs, and all
                digital products provided by the Company.
              </p>

              <p>
                <strong>User</strong>, <strong>You</strong>, or{" "}
                <strong>Your</strong> refers to any individual, company,
                organization, or entity using our Website or Services.
              </p>

              <p>
                <strong>Content</strong> includes all text, graphics,
                documentation, source code, software, logos, trademarks,
                databases, images, videos, designs, icons, and other material
                available on this Website.
              </p>

            </div>
          </section>

          {/* Acceptance */}

          <section
            id="acceptance"
            className="scroll-mt-28 rounded-2xl shadow-sm border p-8"
          >
            <h2 className="text-3xl font-bold mb-6">
              Acceptance of Terms
            </h2>

            <p className="  leading-8">
              By accessing, browsing, registering, or using any part of our
              Website or Services, you acknowledge that you have read,
              understood, and agree to be legally bound by these Terms and
              Conditions and our Privacy Policy.
            </p>

            <p className="mt-5   leading-8">
              If you do not agree to these Terms, you must immediately stop
              using our Website and Services.
            </p>

            <p className="mt-5   leading-8">
              You represent that you are at least 18 years of age or otherwise
              legally capable of entering into a binding agreement under
              applicable law.
            </p>
          </section>

          {/* Next sections will continue in Part 2 */}
          {/* Services */}

          <section
            id="services"
            className="scroll-mt-28 rounded-2xl shadow-sm border p-8"
          >
            <h2 className="text-3xl font-bold mb-6">
              Services
            </h2>

            <p className="  leading-8">
              Budaniya Technologies LLP provides technology solutions including,
              but not limited to:
            </p>

            <ul className="list-disc pl-6 mt-5 space-y-3  ">
              <li>Custom Software Development</li>
              <li>Website Design & Development</li>
              <li>Mobile Application Development</li>
              <li>Cloud Solutions</li>
              <li>SaaS Products</li>
              <li>API Development & Integration</li>
              <li>Payment Gateway Solutions</li>
              <li>IT Consulting Services</li>
              <li>Maintenance & Technical Support</li>
            </ul>

            <p className="mt-6   leading-8">
              We reserve the right to modify, suspend, discontinue, or enhance
              any Service at any time without prior notice.
            </p>
          </section>

          {/* User Responsibilities */}

          <section
            id="responsibilities"
            className="scroll-mt-28 rounded-2xl shadow-sm border p-8"
          >
            <h2 className="text-3xl font-bold mb-6">
              User Responsibilities
            </h2>

            <p className="  leading-8">
              By using our Website or Services, you agree that you will:
            </p>

            <ul className="list-disc pl-6 mt-5 space-y-3  ">
              <li>Comply with all applicable laws and regulations.</li>
              <li>Provide accurate and truthful information.</li>
              <li>Maintain the confidentiality of your account credentials.</li>
              <li>Use the Website only for lawful purposes.</li>
              <li>Respect the intellectual property rights of the Company.</li>
            </ul>

            <h3 className="text-xl font-semibold mt-8 mb-4">
              Prohibited Activities
            </h3>

            <ul className="list-disc pl-6 space-y-3  ">
              <li>Attempting unauthorized access to our servers.</li>
              <li>Reverse engineering any software.</li>
              <li>Copying or distributing our source code.</li>
              <li>Uploading malware, ransomware or malicious scripts.</li>
              <li>Scraping website content without permission.</li>
              <li>Using automated bots that negatively affect our services.</li>
              <li>Impersonating another person or organization.</li>
              <li>Violating any applicable law.</li>
            </ul>
          </section>

          {/* Intellectual Property */}

          <section
            id="intellectual"
            className="scroll-mt-28 rounded-2xl shadow-sm border p-8"
          >
            <h2 className="text-3xl font-bold mb-6">
              Intellectual Property Rights
            </h2>

            <p className="  leading-8">
              Unless otherwise expressly stated, all intellectual property
              rights in this Website and our Services are owned by or licensed
              to <strong>Budaniya Technologies LLP</strong>.
            </p>

            <p className="mt-5   leading-8">
              This includes, without limitation:
            </p>

            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <ul className="list-disc pl-6 space-y-2  ">
                <li>Website Design</li>
                <li>User Interface (UI)</li>
                <li>User Experience (UX)</li>
                <li>Source Code</li>
                <li>Software Applications</li>
                <li>APIs</li>
                <li>Databases</li>
                <li>Business Logic</li>
              </ul>

              <ul className="list-disc pl-6 space-y-2  ">
                <li>Company Logo</li>
                <li>Graphics & Icons</li>
                <li>Documentation</li>
                <li>Text Content</li>
                <li>Images & Videos</li>
                <li>Trademarks</li>
                <li>Service Marks</li>
                <li>Brand Identity</li>
              </ul>
            </div>

            <div className="mt-8 rounded-xl border border-red-200 p-6">
              <h3 className="text-lg font-semibold text-red-700 mb-3">
                Restrictions :
              </h3>

              <p className="  leading-8">
                You may not copy, reproduce, modify, publish, distribute,
                reverse engineer, decompile, mirror, scrape, sell, license,
                lease, or commercially exploit any portion of the Website,
                Services, software, APIs, source code, or content without the
                prior written consent of Budaniya Technologies LLP.
              </p>

              <p className="mt-4   leading-8">
                Unauthorized use of our intellectual property may result in
                civil and criminal legal action under applicable intellectual
                property and copyright laws.
              </p>
            </div>
          </section>

          {/* Payments */}

          <section
            id="payments"
            className="scroll-mt-28 rounded-2xl shadow-sm border p-8"
          >
            <h2 className="text-3xl font-bold mb-6">
              Payments
            </h2>

            <p className="  leading-8">
              Certain products or services offered by Budaniya Technologies LLP
              may require payment. By purchasing our services, you agree to pay
              all applicable fees, taxes, and charges.
            </p>

            <ul className="list-disc pl-6 mt-5 space-y-3  ">
              <li>All prices are subject to change without prior notice.</li>
              <li>Applicable GST and taxes may be charged separately.</li>
              <li>Invoices must be paid within the agreed payment terms.</li>
              <li>Late payments may result in suspension of services.</li>
              <li>Unless otherwise agreed in writing, payments are non-refundable.</li>
            </ul>
          </section>

          {/* Privacy */}

          <section
            id="privacy"
            className="scroll-mt-28 rounded-2xl shadow-sm border p-8"
          >
            <h2 className="text-3xl font-bold mb-6">
              Privacy
            </h2>

            <p className="  leading-8">
              Your privacy is important to us. The collection, storage, use,
              and disclosure of your personal information are governed by our
              Privacy Policy.
            </p>

            <p className="mt-5   leading-8">
              By using our Website and Services, you consent to the collection
              and processing of your information in accordance with our Privacy
              Policy.
            </p>
          </section>

          {/* Third Party Services */}

          <section
            id="thirdparty"
            className="scroll-mt-28 rounded-2xl shadow-sm border p-8"
          >
            <h2 className="text-3xl font-bold mb-6">
              Third-Party Services
            </h2>

            <p className="  leading-8">
              Our Website and Services may integrate with or contain links to
              third-party platforms, payment gateways, cloud providers,
              analytics services, APIs, or software.
            </p>

            <p className="mt-5   leading-8">
              Budaniya Technologies LLP is not responsible for the content,
              security, privacy practices, or availability of third-party
              services. Your use of such services is governed by their
              respective terms and privacy policies.
            </p>
          </section>

          {/* Confidentiality */}

          <section
            id="confidentiality"
            className="scroll-mt-28 rounded-2xl shadow-sm border p-8"
          >
            <h2 className="text-3xl font-bold mb-6">
              Confidentiality
            </h2>

            <p className="  leading-8">
              Any confidential information shared between you and Budaniya
              Technologies LLP during the course of providing services shall be
              treated as confidential and shall not be disclosed to any third
              party except where required by law or with prior written consent.
            </p>
          </section>

          {/* start */}
          {/* Termination */}

          <section
            id="termination"
            className="scroll-mt-28 rounded-2xl shadow-sm border p-8"
          >
            <h2 className="text-3xl font-bold mb-6">
              Termination
            </h2>

            <p className="  leading-8">
              Budaniya Technologies LLP reserves the right to suspend or
              terminate your access to the Website or Services immediately,
              without prior notice, if you violate these Terms or engage in any
              activity that may harm the Company, its users, or its reputation.
            </p>

            <p className="mt-5   leading-8">
              Upon termination, your right to access and use our Services will
              immediately cease. Any provisions that by their nature should
              survive termination shall remain in effect.
            </p>
          </section>

          {/* Limitation of Liability */}

          <section
            id="liability"
            className="scroll-mt-28 rounded-2xl shadow-sm border p-8"
          >
            <h2 className="text-3xl font-bold mb-6">
              Limitation of Liability
            </h2>

            <p className="  leading-8">
              To the fullest extent permitted by law, Budaniya Technologies LLP,
              its partners, employees, affiliates, licensors, and service
              providers shall not be liable for any indirect, incidental,
              consequential, punitive, or special damages arising out of or
              relating to your use of the Website or Services.
            </p>

            <p className="mt-5   leading-8">
              This includes, but is not limited to, loss of revenue, business,
              profits, goodwill, data, business interruption, or any other
              commercial damages.
            </p>
          </section>

          {/* Disclaimer */}

          <section
            id="disclaimer"
            className="scroll-mt-28 rounded-2xl shadow-sm border p-8"
          >
            <h2 className="text-3xl font-bold mb-6">
              Disclaimer
            </h2>

            <p className="  leading-8">
              The Website and all Services are provided on an <strong>"AS IS"</strong>
              {" "}and <strong>"AS AVAILABLE"</strong> basis without warranties
              of any kind, whether express or implied.
            </p>

            <p className="mt-5   leading-8">
              While we strive to provide accurate and reliable information,
              Budaniya Technologies LLP does not guarantee uninterrupted
              availability, error-free operation, or complete accuracy of any
              content or services.
            </p>
          </section>

          {/* Indemnification */}

          <section
            id="indemnification"
            className="scroll-mt-28 rounded-2xl shadow-sm border p-8"
          >
            <h2 className="text-3xl font-bold mb-6">
              Indemnification
            </h2>

            <p className="  leading-8">
              You agree to indemnify, defend, and hold harmless Budaniya
              Technologies LLP, its partners, directors, employees, contractors,
              and affiliates from any claims, liabilities, losses, damages,
              costs, expenses, or legal fees arising from:
            </p>

            <ul className="list-disc pl-6 mt-5 space-y-2  ">
              <li>Your use of the Website or Services.</li>
              <li>Your violation of these Terms.</li>
              <li>Your infringement of any third-party rights.</li>
              <li>Your violation of applicable laws.</li>
            </ul>
          </section>

          {/* Force Majeure */}

          <section
            id="force-majeure"
            className="scroll-mt-28 rounded-2xl shadow-sm border p-8"
          >
            <h2 className="text-3xl font-bold mb-6">
              Force Majeure
            </h2>

            <p className="  leading-8">
              Budaniya Technologies LLP shall not be liable for any delay or
              failure in performance resulting from circumstances beyond its
              reasonable control, including natural disasters, war, terrorism,
              pandemics, cyber attacks, internet failures, power outages,
              governmental actions, labor disputes, or other unforeseen events.
            </p>
          </section>

          {/* Governing Law */}

          <section
            id="governing-law"
            className="scroll-mt-28 rounded-2xl shadow-sm border p-8"
          >
            <h2 className="text-3xl font-bold mb-6">
              Governing Law
            </h2>

            <p className="  leading-8">
              These Terms and Conditions shall be governed by and interpreted in
              accordance with the laws of India, without regard to its conflict
              of law principles.
            </p>
          </section>

          {/* Jurisdiction */}

          <section
            id="jurisdiction"
            className="scroll-mt-28 rounded-2xl shadow-sm border p-8"
          >
            <h2 className="text-3xl font-bold mb-6">
              Jurisdiction
            </h2>

            <p className="  leading-8">
              Any dispute arising from or relating to these Terms or the use of
              our Website or Services shall be subject to the exclusive
              jurisdiction of the competent courts located in Sikar,
              Rajasthan, India.
            </p>
          </section>

          {/* Changes */}

          <section
            id="changes"
            className="rounded-2xl shadow-sm border p-8"
          >
            <h2 className="text-3xl font-bold mb-6">
              Changes to These Terms
            </h2>

            <p className="leading-8">
              Budaniya Technologies LLP reserves the right to modify or update
              these Terms at any time. Updated versions will become effective
              immediately upon publication on this Website unless otherwise
              stated.
            </p>

            <p className="mt-5  leading-8">
              Continued use of our Website or Services after any changes
              constitutes acceptance of the revised Terms.
            </p>
          </section>

          {/* Contact */}

          <section
            id="contact"
            className="scroll-mt-28 rounded-2xl shadow-sm border p-8"
          >
            <h2 className="text-3xl font-bold mb-8">
              Contact Us
            </h2>

            <div className="grid md:grid-cols-2 gap-8">

              <div className="rounded-xl p-6 border">
                <h3 className="font-semibold text-xl mb-4">
                  Company Details :
                </h3>

                <p className="  leading-8">
                  <strong>Budaniya Technologies LLP</strong>
                </p>

                <p className="  leading-8 mt-3">
                  Registered Office
                  <br />
                  c/o Ramswaroop S/o Laxmanram
                  <br />
                  Madhopura, Balaran
                  <br />
                  Sikar, Rajasthan – 332401
                  <br />
                  India
                </p>
              </div>

              <div className=" rounded-xl p-6 border">
                <h3 className="font-semibold text-xl mb-4">
                  Contact Information :
                </h3>

                <p className="mb-3">
                  📧 join@budaniyatechnologies.com
                </p>

                <p className="mb-3">
                  📞 +91 7014162730
                </p>

                <p>
                  🌐 https://budaniyatechnologies.com
                </p>
              </div>

            </div>
          </section>
          {/* end */}

        </div >
      </div >
    </main >
  );
}