import React, { useState } from 'react';

const InviteSection = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [invitationType, setInvitationType] = useState('');

  // Handler to open the popup
  const handleOpenPopup = (type) => {
    setInvitationType(type);
    setShowPopup(true);
  };

  // Handler to close the popup
  const handleClosePopup = () => {
    setShowPopup(false);
    setInvitationType('');
  };

  return (
    <section className='py-16 lg:px-56 px-2 bg-priBg'>
      <div className="text-center mb-8">
        <h1 className='lg:text-5xl text-3xl font-extrabold font-primaryFont text-primary  mb-4'>Send Invites By</h1>
      </div>

      <div className='grid lg:grid-cols-2 grid-cols-1 gap-8'>
        {/* Surprise Party Invitation Card */}
        <div className='bg-white shadow-lg hover:shadow-2xl px-8 py-6 rounded-lg transition-all duration-300'>
          <div className='flex flex-col gap-6 items-start'>
            <h2 className='lg:text-4xl font-heroFont font-bold text-primary'>Surprise Party Invitation</h2>
            <button
              onClick={() => handleOpenPopup('Surprise Party')}
              className='text-lg text-heroFont border-2 border-black px-6 py-3 rounded-md bg-gradient-to-r from-primary to-secondary hover:bg-gradient-to-r hover:from-secondary hover:to-primary text-white font-semibold transition duration-300'>
              Browse Now
            </button>
          </div>
          <div className='flex justify-end'>
            <img
              className='lg:w-[150px] w-[175px] hover:scale-105 transition duration-300 ease-in-out transform'
              src="https://cdn.prod.website-files.com/61c4debfe6329744f06c60e1/6724123ed680ec6c940f9214_say-surprise-40_ani_envelope-p-500.webp"
              alt="Surprise Party Invitation"
            />
          </div>
        </div>

        {/* Wedding Invitation Card */}
        <div className='bg-white shadow-lg hover:shadow-2xl px-8 py-6 rounded-lg transition-all duration-300'>
          <div className='flex flex-col gap-6 items-start'>
            <h2 className='lg:text-4xl  text-primary font-heroFont font-bold'>Wedding Invitation</h2>
            <button
              onClick={() => handleOpenPopup('Wedding Invitation')}
              className='text-lg text-heroFont border-2 border-black px-6 py-3 rounded-md bg-gradient-to-r from-primary to-secondary hover:bg-gradient-to-r hover:from-secondary hover:to-primary text-white font-semibold transition duration-300'>
              Browse Now
            </button>
          </div>
          <div className='flex justify-end'>
            <img
              className='lg:w-[150px] w-[175px] hover:scale-105 transition duration-300 ease-in-out transform'
              src="https://cdn.prod.website-files.com/6721b27fd51e68efda3f7632/6721b27fd51e68efda3f851e_env.webp"
              alt="Wedding Invitation"
            />
          </div>
        </div>
      </div>

      {/* Modal Popup */}
      {showPopup && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-10 rounded-lg w-3/4 lg:w-1/3 shadow-xl transform scale-105 transition-all duration-300'>
            <h2 className='text-2xl font-bold text-gray-800 mb-4'>{invitationType} Details</h2>
            <p className='text-lg text-gray-700'>
              Get ready for a {invitationType}! Click below to explore the full range of designs and styles for your {invitationType}.
            </p>
            <div className='mt-6 flex justify-end'>
              <button
                onClick={handleClosePopup}
                className='px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300'>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default InviteSection;
