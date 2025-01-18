import React, { useState } from "react";

const Terms = () => {
  const [activeTab, setActiveTab] = useState("terms"); // Default active tab
  const [menuOpen, setMenuOpen] = useState(false);
  // Content for each tab
  const tabContent = {
    terms: (
      <div className="container mx-auto px-6 py-4 bg-gray-50 shadow-md rounded-lg">
  <h2 className="text-3xl font-extrabold text-center mt-2 mb-6 text-gray-800">Terms and Conditions</h2>

  <section className="mb-8 bg-white p-6 rounded-md shadow-sm border border-gray-200">
    <h3 className="text-2xl font-bold text-gray-700 mb-4 border-b border-gray-300 pb-2">
      Terms and Conditions
    </h3>
    <p className="text-gray-600 leading-relaxed mb-4">
      For the purpose of these Terms and Conditions, the term "we," "us," "our" used anywhere on this page shall mean ANGIRA CREATION, whose registered/operational office is Near Urban Cooperative Bank, Alwar RAJASTHAN 301001. "You," "your," "user," "visitor" shall mean any natural or legal person who is visiting our website and/or agreed to purchase from us.
    </p>
    <p className="text-gray-600 leading-relaxed mb-4">
      Your use of the website and/or purchase from us are governed by the following Terms and Conditions:
    </p>
    <ul className="list-disc list-inside text-gray-600">
      <li>The content of the pages of this website is subject to change without notice.</li>
      <li>
        Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness, or suitability of the information and materials found or offered on this website for any particular purpose.
      </li>
      <li>
        Your use of any information or materials on our website and/or product pages is entirely at your own risk, for which we shall not be liable.
      </li>
      <li>
        Our website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance, and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.
      </li>
      <li>
        Unauthorized use of information provided by us shall give rise to a claim for damages and/or be a criminal offense.
      </li>
    </ul>
  </section>

  <section className="mb-8 bg-white p-6 rounded-md shadow-sm border border-gray-200">
    <h3 className="text-2xl font-bold text-gray-700 mb-4 border-b border-gray-300 pb-2">
      Service Terms
    </h3>
    <ul className="list-disc list-inside text-gray-600">
      <li>JPG/PDF Ecard will be delivered within 24 working hours.</li>
      <li>Video/GIF and Caricature Ecard/Video E-invites will be delivered within 72 working hours.</li>
      <li>Delivery time may be affected during seasonal rushes & unforeseen conditions.</li>
      <li>Working hours are from Mon to Sat, 10:00 AM to 5:00 PM IST.</li>
      <li>Urgent E-Card/E-Invite orders will incur an extra cost of INR 1498/-.</li>
      <li>Payment will be 100% in advance for ready templates. No refund will be provided, as the design you see & approve is what you will be receiving.</li>
      <li>18% GST will be added to the final cost and it may be changed by the government rules, regulation & conditions.</li>
    </ul>
  </section>

  <section className="mb-8 bg-white p-6 rounded-md shadow-sm border border-gray-200">
    <h3 className="text-2xl font-bold text-gray-700 mb-4 border-b border-gray-300 pb-2">
      Privacy
    </h3>
    <p className="text-gray-600 leading-relaxed">
      Your privacy is very important to us, which is why we’ve created a separate Privacy Policy in order to explain in detail how we collect, manage, process, secure, and store your private information. Our privacy policy is included under the scope of this User Agreement. For more detail, please review our Privacy Policy.
    </p>
  </section>

  <section className="mb-8 bg-white p-6 rounded-md shadow-sm border border-gray-200">
    <h3 className="text-2xl font-bold text-gray-700 mb-4 border-b border-gray-300 pb-2">
      Limitation Of Liability
    </h3>
    <p className="text-gray-600 leading-relaxed">
      In conjunction with the Limitation of Warranties as explained above, you expressly understand and agree that any claim against us shall be limited to the amount you paid, if any, for use of products and/or services. www.nyouta.com will not be liable for any direct, indirect, incidental, consequential, or exemplary loss or damages which may be incurred by you as a result of using our Resources.
    </p>
  </section>

  <section className="mb-8 bg-white p-6 rounded-md shadow-sm border border-gray-200">
    <h3 className="text-2xl font-bold text-gray-700 mb-4 border-b border-gray-300 pb-2">
      Vendors
    </h3>
    <p className="text-gray-600 leading-relaxed">
      Each Vendor accepting orders is registered on the Nyouta platform to enable customers to reach their target customer. Vendors are responsible for maintaining quality and accuracy in their representations on the platform.
    </p>
  </section>
</div>

    
    ),
    shipping: (
      <div className="container mx-auto px-6 py-4 bg-gray-50 shadow-md rounded-lg">
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-12">
        Shipping & Delivery
      </h1>

      <div className="section bg-white p-8 rounded-md shadow-sm mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b border-gray-200 pb-2">
          Dispatch & Delivery Conditions
        </h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          Nyouta currently delivers in all approachable areas of India only
          (for remote/non-approachable areas, courier charges have to be borne
          by the customer). All the products ordered at{" "}
          <a
            href="https://www.nyouta.com"
            className="text-blue-500 hover:underline"
          >
            www.nyouta.com
          </a>{" "}
          go through strict quality checks, and we ensure that the products are
          packed and delivered in the finest condition.
        </p>
      </div>

      <div className="section bg-white p-8 rounded-md shadow-sm mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b border-gray-200 pb-2">
          General Information
        </h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          All orders are subject to product availability. If an item is not in
          stock at the time you place your order, we will notify you via email,
          WhatsApp, or mobile.
        </p>
        <p className="text-gray-600 leading-relaxed mb-4">
          Unless there are exceptional circumstances, we make every effort to
          fulfill your order within 15 working days of the date of your order.
          Business days mean Monday to Saturday, except Sunday & all Indian
          holidays.
        </p>
        <p className="italic text-gray-500 mb-4">
          Please Note: We do not dispatch on Sundays or holidays.
        </p>
        <p className="text-gray-600 leading-relaxed mb-4">
          The date of delivery may vary due to delivery location, method of
          delivery, and uncommon holidays in India. Please note that online
          payments don’t require any additional delivery charges. COD is not
          available at the moment.
        </p>
      </div>

      <div className="section bg-white p-8 rounded-md shadow-sm mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b border-gray-200 pb-2">
          Delivery Time (E-Invite)
        </h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          JPG/PDF Ecard will be delivered within 24 working hours. Delivery time
          depends on workload, but usually, we take 2–8 working days, except
          Sundays & holidays.
        </p>
        <p className="text-gray-600 leading-relaxed mb-4">
          Scrolled Video/GIF and Caricature Ecard/Video e-Invites will be
          delivered within 72 working days. Delivery time may be affected
          during seasonal rushes & unfortunate conditions.
        </p>
        <p className="text-gray-600 leading-relaxed mb-4">
          Our working hours are from Mon to Sat, 10 am to 5:00 pm IST. Urgent
          E-card/E-Invite orders will incur an extra cost of INR 1499/-.
        </p>
      </div>

      <div className="section bg-white p-8 rounded-md shadow-sm mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b border-gray-200 pb-2">
          Delivery Time (Print Shop)
        </h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          All gift/printable orders are processed within 3–14 business days. If
          we are experiencing a high volume of orders, shipments may be delayed
          by a few days. Please allow additional days in transit for delivery.
          If there will be a significant delay in the shipment of your order, we
          will contact you via email, WhatsApp, or mobile.
        </p>
        <p className="text-gray-600 leading-relaxed mb-4">
          For products that are fully customized, it takes a minimum of 15
          working days to get the order ready and shipped out. Once the product
          is ready for shipment, the notification will be sent via email,
          WhatsApp, or mobile.
        </p>
      </div>

      <div className="section bg-white p-8 rounded-md shadow-sm mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b border-gray-200 pb-2">
          Our Head Quarter
        </h2>
        <p className="text-gray-600 leading-relaxed mb-2">
          <strong>Correspondence Address:</strong>
        </p>
        <p className="text-gray-600 leading-relaxed">ANGIRA CREATION</p>
        <p className="text-gray-600 leading-relaxed">Near Urban Co-operative Bank,</p>
        <p className="text-gray-600 leading-relaxed">Old Bus Stand,</p>
        <p className="text-gray-600 leading-relaxed">Alwar-301001 (Rajasthan) INDIA</p>
        <div className="mt-6 text-gray-800 font-bold">
          <p>Chat: 954-954-1111</p>
          <p>Email: <a href="mailto:nyouta@gmail.com" className="text-blue-500 hover:underline">nyouta@gmail.com</a></p>
          <p>Call: 9829520111</p>
        </div>
      </div>
    </div>
    ),
    privacy: (
      <div className="container mx-auto px-6 py-4 bg-gray-50 shadow-md rounded-lg">
      <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-12">
        Privacy Policy
      </h2>

      <div className="section bg-white p-8 rounded-md shadow-sm">
        <h3 className="text-2xl font-semibold text-gray-700 mb-6 border-b border-gray-200 pb-2">
          Our Commitment Towards Data Security
        </h3>
        <p className="text-gray-600 leading-relaxed mb-6">
          Thank you for visiting our website{" "}
          <a
            href="http://www.nyouta.com"
            className="text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.nyouta.com
          </a>
          . This privacy policy tells you how we use personal information
          collected at this site. It is Nyouta's policy not to use or share
          the personal information about Visitors or Customers in any way. You
          can entrust us on data security.
        </p>
        <p className="text-gray-600 leading-relaxed mb-6">
          Services and websites we sponsor have security measures in place to
          protect the loss, misuse, and alteration of the information under
          Animaker’s control. While we make every effort to ensure the integrity
          and security of our network and systems, we cannot guarantee that
          Nyouta’s security measures will prevent third-party "hackers" from
          illegally obtaining this information.
        </p>
        <p className="text-gray-600 leading-relaxed">
          We may change this Privacy Policy at any time by posting the revised
          Privacy Policy in the "Privacy Policy" section of the Site. The
          revised Privacy Policy is effective immediately when posted on the
          Site. You should review the Site and the Privacy Policy periodically
          to learn of any revisions to this Privacy Policy. Your continued use
          of the Site after the effectiveness of such revisions will constitute
          your acknowledgment and acceptance of the terms of the revised Privacy
          Policy.
        </p>
      </div>

      <div className="section bg-white p-8 rounded-md shadow-sm mt-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-6 border-b border-gray-200 pb-2">
          Collection And Use Of Personal Information
        </h3>
        <p className="text-gray-600 leading-relaxed">
          We will only collect personal information, such as your name,
          telephone number, or email address, when it is voluntarily submitted
          to us on the Site. We will use this information to comply with your
          request for information or as otherwise disclosed to you when you
          submit your information. From time to time, we may refer to that
          information to better understand your needs and how we can improve our
          services. We may use that information to contact you. We will not
          otherwise transfer the personal information you provide on the Site to
          any third party unless otherwise disclosed to you.
        </p>
      </div>

      <div className="section bg-white p-8 rounded-md shadow-sm mt-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-6 border-b border-gray-200 pb-2">
          Cookie/Tracking Technology
        </h3>
        <p className="text-gray-600 leading-relaxed mb-6">
          The Site may use cookie and tracking technology depending on the
          features offered. Cookie and tracking technology are useful for
          gathering information such as browser type and operating system,
          tracking the number of visitors to the Site, and understanding how
          visitors use the Site. Cookies can also help customize the Site for
          visitors.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Personal information cannot be collected via cookies and other
          tracking technology; however, if you previously provided personally
          identifiable information, cookies may be tied to such information.
          Aggregate cookie and tracking information may be shared with third
          parties.
        </p>
      </div>

      <div className="section bg-white p-8 rounded-md shadow-sm mt-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-6 border-b border-gray-200 pb-2">
          Distribution Of Information
        </h3>
        <p className="text-gray-600 leading-relaxed">
          We may share information with governmental agencies or other companies
          assisting us in fraud prevention or investigation. We may do so when:
          <ol className="list-decimal pl-8 mt-4 space-y-2">
            <li>Permitted or required by law; or</li>
            <li>
              Trying to protect against or prevent actual or potential fraud or
              unauthorized transactions; or
            </li>
            <li>Investigating fraud which has already taken place.</li>
          </ol>
        </p>
      </div>

      <div className="section bg-white p-8 rounded-md shadow-sm mt-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-6 border-b border-gray-200 pb-2">
          Commitment To Data Security
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Your personally identifiable information is kept secure. Only
          authorized employees, agents, and contractors (who have agreed to keep
          information secure and confidential) have access to this information.
          All emails and newsletters from this site allow you to opt out of
          further mailings.
        </p>
      </div>

      <div className="section bg-white p-8 rounded-md shadow-sm mt-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-6 border-b border-gray-200 pb-2">
          Privacy Contact Information
        </h3>
        <p className="text-gray-600 leading-relaxed mb-4">
          If you have any questions, concerns, or comments about our privacy
          policy you may contact us using the information below:
        </p>
        <p className="text-gray-600 leading-relaxed">
          By e-mail:{" "}
          <a
            href="mailto:nyouta@gmail.com"
            className="text-blue-600 underline"
          >
            nyouta@gmail.com
          </a>
        </p>
        <p className="text-gray-600 leading-relaxed">
          We reserve the right to make changes to this policy. Any changes to
          this policy will be posted.
        </p>
      </div>
    </div>
    ),
    refund: (
      <div className="container mx-auto px-6 py-4 bg-gray-50 shadow-md rounded-lg">
      <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-12">
        Cancellation and Refund Policy
      </h2>

      <div className="section bg-white p-8 rounded-md shadow-sm">
        <h3 className="text-2xl font-semibold text-gray-700 mb-6 border-b border-gray-200 pb-2">
          Cancellation and Refund Policy
        </h3>
        <p className="text-gray-600 leading-relaxed mb-6">
          At ANGIRA CREATION, we prioritize customer satisfaction and strive to
          make the process as smooth as possible. Below is our comprehensive
          cancellation and refund policy:
        </p>
        <ul className="list-disc pl-8 space-y-4 text-gray-600">
          <li>
            Cancellations are accepted only if requested within 7 days of
            placing the order. Requests may not be entertained if the order has
            already been processed by vendors or shipped.
          </li>
          <li>
            Perishable items such as flowers and eatables are not eligible for
            cancellation. However, a refund or replacement may be issued if the
            quality of the delivered product is proven to be unsatisfactory.
          </li>
          <li>
            Damaged or defective items must be reported to our Customer Service
            team within 7 days of receiving the product. The merchant will
            review and confirm the issue before proceeding with a resolution.
          </li>
          <li>
            If the product does not meet your expectations or is not as
            displayed on the site, you must notify our Customer Service team
            within 7 days of receiving the product. Our team will evaluate the
            complaint and take appropriate action.
          </li>
          <li>
            Warranty-related issues for products that come with a manufacturer's
            warranty must be referred to the manufacturer directly.
          </li>
          <li>
            Approved refunds by ANGIRA CREATION will be processed within 6–8
            business days.
          </li>
          <li>
            Unless specified otherwise, all purchases on Nyouta, including
            E-invites, Print Shop items, Planners, and similar services, are
            non-refundable. Please verify product details before purchasing.
          </li>
          <li>
            Nyouta reserves the right to restrict, suspend, or terminate
            accounts for misuse of the platform, unlawful activities, or rights
            violations. This may include removing content, blocking accounts, or
            limiting access.
          </li>
        </ul>
      </div>
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
          className={`${menuOpen ? "flex" : "hidden"
            } flex-col items-center justify-center gap-4 mt-4 md:flex md:flex-row md:gap-6 md:mt-0`}
        >
          {["terms", "refund", "shipping", "privacy"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setMenuOpen(false); // Close menu on tab click
              }}
              className={`px-6 py-3 text-sm font-medium rounded-full transition-all duration-300 ${activeTab === tab
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
