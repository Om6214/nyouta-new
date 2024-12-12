import React, { useState } from "react";
import products from "../products.json";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const InviteSection = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [invitationType, setInvitationType] = useState("");

  // Handler to open the popup
  const handleOpenPopup = (type) => {
    setInvitationType(type);
    setShowPopup(true);
  };

  // Handler to close the popup
  const handleClosePopup = () => {
    setShowPopup(false);
    setInvitationType("");
  };

  return (
    <section className="py-16 lg:px-6 px-2 bg-priBg">
      <div className="text-center mb-8">
        <h1 className="lg:text-5xl text-3xl font-semibold font-heroFont text-primary  mb-4">
          Send Invites By
        </h1>
      </div>

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-8">
        {/* Surprise Party Invitation Card */}
        <div className="bg-white shadow-lg hover:shadow-2xl px-8 py-6 rounded-lg transition-all duration-300">
            <h2 className="lg:text-4xl text-2xl font-heroFont font-bold text-primary">
              Free Greetings
            </h2>

          <div className="py-4">
            <div className="grid grid-cols-2 gap-4">
              {products
                .filter((items) =>
                  [139, 145, 149, 154].includes(Number(items.id))
                )
                .map((items, index) => (
                  <div
                    key={items.id}
                    className="bg-gradient-to-br shadow-lg hover:shadow-2xl from-primary to-secondary rounded-lg"
                  >
                    <Link
                      key={index}
                      to={`/products/${items.id}`}
                      state={{ items }}
                    >
                      <img
                        className="w-full lg:h-[150px] h-[100px] object-cover rounded-t-lg"
                        src={items.image[0]}
                        alt=""
                      />
                      <h1 className="text-center text-white py-[2px] font-heroFont font-semibold">
                        {items.subCategory}
                      </h1>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
          <div className="flex justify-end">
          <button
              onClick={() => handleOpenPopup('Surprise Party')}
              className='text-lg flex items-center text-heroFont rounded-md text-primary hover:text-secondary font-semibold transition duration-300'>
              Browse More <span><ArrowUpRight /></span>
            </button>
            </div>
        </div>

        {/* Wedding Invitation Card */}
        <div className="bg-white shadow-lg hover:shadow-2xl px-8 py-6 rounded-lg transition-all duration-300">
          <div className="flex flex-col gap-6 items-start">
            <h2 className="lg:text-4xl  text-primary font-heroFont font-bold">
              Wedding Invitation
            </h2>
            <button
              onClick={() => handleOpenPopup("Wedding Invitation")}
              className="text-lg text-heroFont border-2 border-black px-6 py-3 rounded-md bg-gradient-to-r from-primary to-secondary hover:bg-gradient-to-r hover:from-secondary hover:to-primary text-white font-semibold transition duration-300"
            >
              Browse Now
            </button>
          </div>
          <div className="flex justify-end">
            <img
              className="lg:w-[150px] w-[175px] hover:scale-105 transition duration-300 ease-in-out transform"
              src="https://cdn.prod.website-files.com/6721b27fd51e68efda3f7632/6721b27fd51e68efda3f851e_env.webp"
              alt="Wedding Invitation"
            />
          </div>
        </div>
      </div>

      {/* Modal Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-10 rounded-lg w-3/4 lg:w-1/3 shadow-xl transform scale-105 transition-all duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {invitationType} Details
            </h2>
            <p className="text-lg text-gray-700">
              Get ready for a {invitationType}! Click below to explore the full
              range of designs and styles for your {invitationType}.
            </p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleClosePopup}
                className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default InviteSection;
