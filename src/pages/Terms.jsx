import React, { useState } from "react";

const Terms = () => {
  const [activeTab, setActiveTab] = useState("terms"); // Default active tab
  const [menuOpen, setMenuOpen] = useState(false);
  // Content for each tab
  const tabContent = {
    terms: (
      <div>
        <h2 className="text-3xl font-bold  text-center mt-2 mb-3">Terms and Conditions</h2>
        <p>
          Welcome to our website! By accessing and using our services, you agree to comply with these terms and conditions. These rules govern your interactions with our platform and help ensure a smooth and safe experience for all users. Please read through this document carefully to understand your rights and responsibilities. 
        </p>
        <p>
          These terms cover the use of our website, the products and services we provide, and your conduct on our platform. Your use of our website constitutes your acceptance of these terms. If you do not agree with any part of this agreement, please refrain from using our website or services. 
        </p>
        <p>
          We may update these terms periodically. Any changes will be posted here with a revised date. It is your responsibility to check this page for updates. By continuing to use our services, you accept the modified terms. 
        </p>
        <p>
          If you are using our services on behalf of a company or organization, you affirm that you have the authority to bind that organization to these terms. 
        </p>
        <p>
          As a user, you are responsible for maintaining the confidentiality of your account information, including your username and password. If you suspect unauthorized access to your account, please notify us immediately. 
        </p>
        <p>
          You agree to use our website in a lawful manner, and not to engage in any activities that could harm, disrupt, or damage the website or the experience of other users. This includes, but is not limited to, spamming, fraud, or any activity that violates intellectual property rights. 
        </p>
        <p>
          We reserve the right to terminate or suspend access to our services at our sole discretion, if we believe that a user has violated these terms. You agree to indemnify and hold harmless our company, affiliates, and service providers from any loss, damage, or claim arising from your violation of these terms. 
        </p>
        <p>
          Please note that our website may contain links to third-party websites, which are not controlled by us. We are not responsible for the content or practices of those third-party sites. Please review their respective terms and conditions before using them.
        </p>
        <p>
          Our intellectual property, including logos, trademarks, and content on the site, is protected by copyright and other laws. You agree not to copy, distribute, or create derivative works from our content without proper authorization.
        </p>
        <p>
          By using our website, you agree to the terms of our privacy policy, which outlines how we collect and use your personal information. Please read it in conjunction with these terms and conditions.
        </p>
        <p>
          If you have any questions or concerns about our terms and conditions, please contact us directly. Our customer service team is available to provide clarity and assist you with any issues.
        </p>
        <p>
          These terms and conditions are governed by the laws of the jurisdiction in which our company is based. Any disputes or claims arising from these terms will be resolved in accordance with those laws.
        </p>
        <p>
          We strongly encourage you to keep a copy of these terms for your records. By continuing to access or use our services, you confirm that you have read, understood, and agreed to these terms.
        </p>
      </div>
    ),
    shipping: (
      <div>
        <h2 className="text-3xl font-bold  text-center mt-2 mb-3">Shipping and Delivery</h2>
        <p>
          We are committed to ensuring that your orders are shipped efficiently and arrive on time. Our shipping policies outline the expected delivery times, available shipping methods, and costs. We offer various delivery options depending on your location and preferences. 
        </p>
        <p>
          Shipping times may vary based on your location, availability of stock, and the shipping method selected. We provide estimated delivery windows for each order, so you’ll know when to expect your package. Please note that delivery times are estimates and may be subject to delays due to factors beyond our control. 
        </p>
        <p>
          Once your order is shipped, you will receive a tracking number to monitor the status of your delivery. If there are any issues with the delivery, such as delays or damaged items, please reach out to our support team. We will work with the courier service to resolve the issue as quickly as possible. 
        </p>
        <p>
          We strive to process and dispatch orders as quickly as possible, typically within 1-3 business days. Orders placed during peak times or holidays may experience longer processing times. If your order is delayed, we will notify you and provide updated shipping information. 
        </p>
        <p>
          We currently offer the following shipping options: Standard Shipping, Expedited Shipping, and Express Shipping. You can select your preferred option at checkout. Shipping fees are calculated based on the weight and size of your order, as well as your delivery location. 
        </p>
        <p>
          International shipping is available to many countries. Please note that customs fees, taxes, and import duties may apply to international orders. These charges are the responsibility of the customer and are not included in the shipping cost at checkout. 
        </p>
        <p>
          If your package is returned to us due to an incorrect address, the customer is responsible for any additional shipping charges to resend the package. Please ensure that your address details are correct before completing your order. 
        </p>
        <p>
          In the event that your order is lost or stolen during shipping, we will work with the carrier to investigate the issue. If the carrier confirms that the package was lost, we will offer a replacement or refund, depending on the circumstances. 
        </p>
        <p>
          Please keep in mind that once an order has been shipped, we are unable to change the delivery address or shipping method. If you wish to make changes, please contact us as soon as possible before your order is processed.
        </p>
        <p>
          We understand the importance of your order arriving safely and on time. To ensure the security of your package, we offer delivery confirmation and insurance for an additional fee. If you choose this option, you will receive an email notification once your package is delivered.
        </p>
        <p>
          If you have any questions regarding our shipping policy or need assistance with your order, please reach out to our customer service team. We're here to help!
        </p>
      </div>
    ),
    privacy: (
      <div>
        <h2 className="text-3xl font-bold  text-center mt-2 mb-3">Privacy Policy</h2>
        <p>
          Your privacy is extremely important to us. This privacy policy explains how we collect, use, store, and protect your personal data when you use our services. We are committed to maintaining the confidentiality and security of your information. 
        </p>
        <p>
          We collect personal information that you provide to us, such as your name, contact details, and payment information when you make a purchase. We may also collect data about your usage of our website through cookies and other tracking technologies to enhance your experience. 
        </p>
        <p>
          The personal data we collect is used to process your orders, provide customer support, and send marketing communications if you have opted in. We will never share your personal information with third parties for their marketing purposes without your consent. 
        </p>
        <p>
          We may share your information with trusted service providers who assist us with our business operations, such as payment processors, shipping companies, and email marketing platforms. These providers are required to handle your data securely and only for the purpose of fulfilling their tasks. 
        </p>
        <p>
          To protect your privacy, we implement industry-standard security measures, including encryption and secure servers, to safeguard your personal information. However, please be aware that no method of transmission over the internet or method of electronic storage is 100% secure. 
        </p>
        <p>
          You have the right to access, update, or delete your personal information at any time. If you wish to exercise these rights, please contact us through the provided channels. We will respond to your request within a reasonable time frame.
        </p>
        <p>
          Our website uses cookies to improve your browsing experience. Cookies are small files stored on your device that help us remember your preferences and enhance site functionality. You can disable cookies through your browser settings, though doing so may affect your ability to use some features of our website.
        </p>
        <p>
          By using our website, you consent to the collection and use of your personal data as outlined in this privacy policy. If we make any changes to our policy, we will update this page with the revised version. You are encouraged to review this policy periodically to stay informed about how we protect your data.
        </p>
        <p>
          If you have any concerns about how your data is being used or if you would like to know more about your privacy rights, please contact us directly. Our team is here to address any questions or issues you may have.
        </p>
        <p>
          This privacy policy is governed by the laws of the jurisdiction in which our company is based. Any disputes regarding your privacy rights will be resolved according to those laws.
        </p>
      </div>
    ),
    refund: (
      <div>
        <h2 className="text-3xl font-bold  text-center mt-2 mb-3">Cancellation and Refund Policy</h2>
        <p>
          We understand that life can be unpredictable, and sometimes you may need to cancel an order or request a refund. Our cancellation and refund policy is designed to make the process as easy and transparent as possible. We want you to feel confident when shopping with us. 
        </p>
        <p>
          To be eligible for a full refund, you must submit your cancellation request within a specified time frame (typically within 30 days from the date of purchase). Refunds are issued to the original payment method and may take several business days to process, depending on your bank or payment provider. 
        </p>
        <p>
          If you need to cancel your order, please contact us as soon as possible. We strive to process cancellations promptly, but if your order has already been shipped, you may need to follow the return process instead.
        </p>
        <p>
          Certain products, such as digital goods, personalized items, or perishable goods, may not be eligible for a refund. Please check the product description before making a purchase to understand any restrictions that may apply. 
        </p>
        <p>
          If you receive a defective or damaged item, we will gladly arrange for a return and refund. Please contact our customer service team within 7 days of receiving the product for assistance. If the product is no longer in stock or unavailable, you will be offered a full refund.
        </p>
        <p>
          Returns must be made in accordance with our return policy. Items should be unused, in the original packaging, and in the same condition as when they were received. If an item is returned in an unsatisfactory condition, we may refuse the refund.
        </p>
        <p>
          We reserve the right to deduct shipping charges or restocking fees from your refund in certain circumstances, such as if you change your mind about a purchase or if the return is outside the allowed time frame.
        </p>
        <p>
          We strive to handle cancellations and refunds promptly and fairly. If you have any concerns or need assistance with the process, please do not hesitate to contact us. Your satisfaction is our priority, and we are happy to help resolve any issues you may encounter.
        </p>
        <p>
          If your refund is approved, it will be processed and credited back to the original payment method within a reasonable period. You will receive a notification once your refund has been processed.
        </p>
      </div>
    ),
  };
  

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <div className="w-full bg-white p-4 shadow-xl">
        {/* Mobile Menu Icon */}
        <div className="flex items-center justify-between md:hidden">
          <h1 className="text-lg font-bold">Policies</h1>
          <button
            className="text-gray-700 p-2 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {/* Hamburger Menu Icon */}
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>

        {/* Tabs (Dropdown for Mobile, Horizontal for Desktop) */}
        <div
          className={`${
            menuOpen ? "flex" : "hidden"
          } flex-col items-center justify-center gap-4 mt-4 md:flex md:flex-row md:gap-6 md:mt-0`}
        >
          {["terms", "refund","shipping", "privacy"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setMenuOpen(false); // Close menu on tab click
              }}
              className={`px-6 py-3 text-sm font-medium rounded-full transition-all duration-300 ${
                activeTab === tab
                  ? "bg-[#AF7D32] text-white shadow-lg scale-105"
                  : "bg-amber-100 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {tab === "terms" && "Terms and Conditions"}
              {tab === "shipping" && "Shipping and Delivery"}
              {tab === "privacy" && "Privacy Policy"}
              {tab === "refund" && "Cancellation and Refund"}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="w-full bg-white mt-4 p-6 text-gray-800 text-base leading-relaxed rounded-lg shadow-inner">
        {tabContent[activeTab]}
      </div>
    </div>
  );
  
  
  
  
  
  
};

export default Terms;
