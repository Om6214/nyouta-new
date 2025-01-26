import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWeddingWebsitedata, updateWeddingWebsitedata } from '../../Store/slices/weddingwebsiteSlice';
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Template01 = () => {
  const dispatch = useDispatch();
  const { weddingwebsiteData } = useSelector((state) => state.weddingwebsite);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    id:'01',
    home: {
      name: '',
      partnerName: '',
      weddingDate: '',
    },
    eventInfo: {
      time: '',
      venue: {
        address: '',
      },
      eventName: '',
      timeline: '',
    },
    about: {
      groom: {
        description: '',
      },
      bride: {
        description: '',
      },
    },
    ourStory: {
      description: '',
    },
    gallery: {
      photos: [],
    },
    program: {
      details: '',
    },
  });

  useEffect(() => {
    dispatch(getWeddingWebsitedata());
    setLoading(false);
  }, [dispatch]);

  const handleContentChange = (e, field) => {
    const value = e.target.innerText;
    setFormData(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prevState => ({
      ...prevState,
      gallery: {
        ...prevState.gallery,
        photos: [...prevState.gallery.photos, ...files]
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(updateWeddingWebsitedata(formData));
      if (res.payload.status === 200) {
        toast.success("Portfolio updated successfully!", {
          position: "top-center",
          autoClose: 5000,
          transition: Slide,
        });
      } else {
        toast.error("An unexpected error occurred.", {
          position: "top-center",
          autoClose: 5000,
          transition: Slide,
        });
      }
    } catch (error) {
      toast.error("Failed to update portfolio. Please try again.", {
        position: "top-center",
        autoClose: 5000,
        transition: Slide,
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleSubmit} style={{ position: 'relative' }}>
        <button type="submit" style={{ position: 'absolute', top: '20px', right: '20px' }} className="text-pink-800 text-xl border-2 px-4 py-2 hover:bg-pink-500 hover:text-black duration-300">
          Update
        </button>
        
        <section id="section-1" className="bg-cover" style={{ backgroundImage: 'url(https://res.cloudinary.com/dr6qk9jr8/image/upload/v1737654489/background1.png)' }}>
          <div className="container  w-full mx-auto flex items-center justify-center gap-16 py-16 px-20" style={{ maxWidth: '1700px' }}>
            <div className="floral-image flex-1 w-[50%]">
              <img src="https://res.cloudinary.com/dr6qk9jr8/image/upload/v1737654489/c2_hszmm6.png" alt="Floral" className="w-[50%] h-auto max-h-[300px]" />
            </div>
            <div className="wedding-details flex-1 text-center flex flex-col justify-center items-center">
              <div className="title mb-4">
                <h1 className="font-great-vibes text-5xl text-e0447b"><span>W</span>EDDING</h1>
              </div>
              <div className="ceremony text-e0447b text-3xl mb-4">CEREMONY</div>
              <div className="names-container mb-4">
                <div className="names flex justify-center">
                  <div
                    contentEditable
                    onInput={(e) => handleContentChange(e, 'home.name')}
                    className="font-great-vibes text-4xl text-e0447b mx-2"
                    suppressContentEditableWarning={true}
                  >
                    {formData.home.name || "Groom's Name"}
                  </div>
                  & 
                  <div
                    contentEditable
                    onInput={(e) => handleContentChange(e, 'home.partnerName')}
                    className="font-great-vibes text-4xl text-e0447b mx-2"
                    suppressContentEditableWarning={true}
                  >
                    {formData.home.partnerName || "Bride's Name"}
                  </div>
                </div>
              </div>
              <div className="date-time text-e0447b font-montserrat text-xl">
                <p className="mb-2">
                  <div
                    contentEditable
                    onInput={(e) => handleContentChange(e, 'home.weddingDate')}
                    className="font-montserrat text-xl text-e0447b"
                    suppressContentEditableWarning={true}
                  >
                    {formData.home.weddingDate || "Wedding Date"}
                  </div>
                </p>
                <p className="inline-block">
                  | 
                  <div
                    contentEditable
                    onInput={(e) => handleContentChange(e, 'eventInfo.time')}
                    className="font-montserrat text-xl text-e0447b inline"
                    suppressContentEditableWarning={true}
                  >
                    {formData.eventInfo.time || "Event Time"}
                  </div>
                  |
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="section-2" style={{ backgroundImage: 'url(https://res.cloudinary.com/dr6qk9jr8/image/upload/v1737654489/background2.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="bg-blue-200 px-8 py-4 flex justify-between items-center">
            <div className="flex flex-col gap-24 pl-32">
              <div className="flex flex-col items-center gap-2">
                <h1 className="text-6xl">Save the Date</h1>
                <h2 className="text-2xl">{formData.home.weddingDate || 'Date'}</h2>
                <p className="text-xl border-l-2 inline border-r-2 px-2 border-red-600">
                  {formData.eventInfo.time || 'Time'}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-2xl">VENUE</h3>
                <h3 className="text-2xl">
                  <div
                    contentEditable
                    onInput={(e) => handleContentChange(e, 'eventInfo.venue.address')}
                    className="font-montserrat text-xl"
                    suppressContentEditableWarning={true}
                  >
                    {formData.eventInfo.venue.address || "Venue Address"}
                  </div>
                </h3>
              </div>
            </div>
            <div>
              <img src="https://res.cloudinary.com/dr6qk9jr8/image/upload/v1737654545/c3_lp8zpe.png" alt="" />
            </div>
            <div>
              <h1 className="text-6xl">{formData.home.partnerName || 'Bride'}</h1>
              <span className="text-5xl">&</span>
              <h1 className="text-6xl">{formData.home.name || 'Groom'}</h1>
            </div>
            <div className="flower">
              <img className="" src="https://res.cloudinary.com/dr6qk9jr8/image/upload/v1737654489/c2_hszmm6.png" alt="" />
            </div>
          </div>
        </section>

        <section id="section-3" style={{ backgroundImage: 'url(https://res.cloudinary.com/dr6qk9jr8/image/upload/v1737654489/background3.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="flex py-8 px-24 justify-between">
            <div className="flex flex-col about items-center gap-4">
              <h1 className="text-6xl">About Us</h1>
              <p className="text-center">
                <div
                  contentEditable
                  onInput={(e) => handleContentChange(e, 'about.groom.description')}
                  className="font-montserrat text-xl"
                  suppressContentEditableWarning={true}
                >
                  {formData.about.groom.description || "Groom's Description"}
                </div>
              </p>
              <p className="text-center">
                <div
                  contentEditable
                  onInput={(e) => handleContentChange(e, 'about.bride.description')}
                  className="font-montserrat text-xl"
                  suppressContentEditableWarning={true}
                >
                  {formData.about.bride.description || "Bride's Description"}
                </div>
              </p>
              <h2>{formData.home.name || 'Groom'} & {formData.home.partnerName || 'Bride'}</h2>
            </div>
            <div className="flower">
              <img src="https://res.cloudinary.com/dr6qk9jr8/image/upload/v1737654489/c2_hszmm6.png" alt="" />
            </div>
          </div>
        </section>

        <section id="section-4" style={{ backgroundImage: 'url(https://res.cloudinary.com/dr6qk9jr8/image/upload/v1737654489/background4.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
           <div className='flex py-8 px-24 justify-between'>
           <div className="flower">
              <img src="https://res.cloudinary.com/dr6qk9jr8/image/upload/v1737654489/c2_hszmm6.png" alt="" />
            </div>
          <div className="py-16 px-24 space-y-4">
            <h1 className="text-6xl text-pink-800 text-center">Our Story</h1>
            <div
              contentEditable
              onInput={(e) => handleContentChange(e, 'ourStory.description')}
              className="font-montserrat text-xl text-center"
              suppressContentEditableWarning={true}
            >
              {formData.ourStory.description || "Your story goes here..."}
            </div>
          </div>
           </div>
        </section>

        <section id="section-5" style={{ backgroundImage: 'url(https://res.cloudinary.com/dr6qk9jr8/image/upload/v1737654489/background5.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="flex justify-between items-center px-24 py-16 bg-blue-200">
            <div className="flower-wed">
              <img src="https://res.cloudinary.com/dr6qk9jr8/image/upload/v1737654489/c2_hszmm6.png" alt="" />
            </div>
            <div className="about flex flex-col items-center gap-6">
              <h1 className="text-6xl text-pink-600">Wedding Programs</h1>
              <div className="space-y-2 flex flex-col items-center">
                <h2 className="text-3xl text-pink-600">{formData.program.details || "Monday, 21ST APRIL, 2025"}</h2>
                <h3 className="text-xl text-blue-600">Event-1 NAME - TIME</h3>
                <h3 className="text-xl text-blue-600">Event-2 NAME - TIME</h3>
                <h2 className="text-xl text-pink-700">VENUE: {formData.eventInfo.venue.address || "VENUE NAME HERE"}</h2>
              </div>
            </div>
          </div>
        </section>

        <section id="section-6">
          <div className="flex justify-between px-40 py-16">
            <div className="flex flex-col items-center">
              <h1 className="text-6xl">Event Name</h1>
              <div className="space-y-2 flex flex-col items-center">
                <h2 className="text-3xl text-pink-800">{formData.eventInfo.eventName || "Event Name"}</h2>
                <h3 className="text-xl text-blue-600">Event-1 NAME - TIME</h3>
                <h3 className="text-xl text-blue-600">Event-2 NAME - TIME</h3>
                <h3 className="text-xl text-blue-600">Event-3 NAME - TIME</h3>
                <img className="w-20" src="https://res.cloudinary.com/dr6qk9jr8/image/upload/v1737654819/c5_nkagil.jpg" alt="" />
                <h2 className="text-xl text-pink-800">VENUE: {formData.eventInfo.venue.address || "VENUE NAME HERE"}</h2>
              </div>
            </div>
            <div className="flower">
              <img src="https://res.cloudinary.com/dr6qk9jr8/image/upload/v1737654489/c2_hszmm6.png" alt="" />
            </div>
            <div className="flex flex-col items-center">
              <h1 className="text-6xl">Event Name</h1>
              <div className="space-y-2 flex flex-col items-center">
                <h2 className="text-3xl text-pink-800">{formData.eventInfo.eventName || "Event Name"}</h2>
                <h3 className="text-xl text-blue-600">Event-1 NAME - TIME</h3>
                <h3 className="text-xl text-blue-600">Event-2 NAME - TIME</h3>
                <h3 className="text-xl text-blue-600">Event-3 NAME - TIME</h3>
                <img className="w-20" src="https://res.cloudinary.com/dr6qk9jr8/image/upload/v1737654819/c5_nkagil.jpg" alt="" />
                <h2 className="text-xl text-pink-800">VENUE: {formData.eventInfo.venue.address || "VENUE NAME HERE"}</h2>
              </div>
            </div>
          </div>
        </section>

        <section id="section-7" style={{ backgroundImage: 'url(https://res.cloudinary.com/dr6qk9jr8/image/upload/v1737654489/background7.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="py-16 px-24 space-y-4">
            <h1 className="text-6xl text-pink-800 text-center">Wedding Timeline</h1>
            <div
              contentEditable
              onInput={(e) => handleContentChange(e, 'eventInfo.timeline')}
              className="font-montserrat text-xl text-center"
              suppressContentEditableWarning={true}
            >
              {formData.eventInfo.timeline || "Enter Wedding Timeline"}
            </div>
          </div>
        </section>

        <section id="section-8">
          <div className="py-10 space-y-4 px-40 bg-blue-200">
            <h2 className="text-4xl text-center text-pink-600">WEDDING VENUE</h2>
            <div className="flex justify-between">
              <div className="flower">
                <img src="https://res.cloudinary.com/dr6qk9jr8/image/upload/v1737654489/c2_hszmm6.png" alt="" />
              </div>
              <div className="flex flex-col justify-between items-center">
                <h2 className="text-3xl text-center text-blue-700">
                  {formData.eventInfo.venue.address || "Venue Address"}
                </h2>
                <img className="w-48" src="https://res.cloudinary.com/dr6qk9jr8/image/upload/v1737655025/c6_nzcplz.jpg" alt="" />
              </div>
              <div className="flower">
                <img src="https://res.cloudinary.com/dr6qk9jr8/image/upload/v1737654489/c2_hszmm6.png" alt="" />
              </div>
            </div>
          </div>
        </section>

        <section id="section-11" style={{ backgroundImage: 'url(https://res.cloudinary.com/dr6qk9jr8/image/upload/v1737654489/background9.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="py-16 px-24 space-y-4">
            <h1 className="text-6xl text-pink-800 text-center">Photo Gallery</h1>
            <div className="flex gap-8 justify-center">
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="border-2 px-1 py-2 rounded-md"
              />
            </div>
            <div className="flex gap-8 justify-center">
              {formData.gallery.photos.map((photo, index) => (
                <img key={index} className="w-64 m-2" src={URL.createObjectURL(photo)} alt="" />
              ))}
            </div>
            <h2 className="text-2xl text-pink-800 text-center">Celebration Summary</h2>
          </div>
        </section>

        <section id="section-12" style={{ backgroundImage: 'url(https://res.cloudinary.com/dr6qk9jr8/image/upload/v1737654489/background10.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="px-24 py-16">
            <h2 className="text-6xl text-center text-pink-800">RSVP</h2>
            <form action="" className="px-40 space-y-4">
              <div className="flex gap-4">
                <div className="flex flex-col gap-2 form-div">
                  <label className="text-xl" htmlFor="">Full Name</label>
                  <div
                    contentEditable
                    onInput={(e) => handleContentChange(e, 'rsvp.name')}
                    className="border-2 px-1 py-2 rounded-md"
                    suppressContentEditableWarning={true}
                  >
                    Enter your name
                  </div>
                </div>
                <div className="flex flex-col gap-2 form-div">
                  <label className="text-xl" htmlFor="">Full Address</label>
                  <div
                    contentEditable
                    onInput={(e) => handleContentChange(e, 'rsvp.address')}
                    className="border-2 px-1 py-2 rounded-md"
                    suppressContentEditableWarning={true}
                  >
                    Enter your address
                  </div>
                </div>
                <div className="flex flex-col gap-2 form-div">
                  <label className="text-xl" htmlFor="">Mobile Number</label>
                  <div
                    contentEditable
                    onInput={(e) => handleContentChange(e, 'rsvp.mobile')}
                    className="border-2 px-1 py-2 rounded-md"
                    suppressContentEditableWarning={true}
                  >
                    Enter your number
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <label className="text-xl" htmlFor="">Response:</label>
                <div
                  contentEditable
                  onInput={(e) => handleContentChange(e, 'rsvp.response')}
                  className="border-2 px-1 py-2 rounded-md"
                  suppressContentEditableWarning={true}
                >
                  Accept with pleasure
                </div>
              </div>
              <button className="text-pink-800 text-xl border-2 px-24 py-2 hover:bg-pink-500 hover:text-black duration-300">Submit</button>
            </form>
          </div>
        </section>

        <section id="section-13" style={{ backgroundImage: 'url(https://res.cloudinary.com/dr6qk9jr8/image/upload/v1737654589/background11.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="flex flex-col gap-8 justify-center items-center">
            <h1 className="text-6xl text-blue-700">Creating Special For Special Day</h1>
            <img src="https://res.cloudinary.com/dr6qk9jr8/image/upload/v1737654585/c4_uldilv.png" alt="" />
            <h2 className="text-4xl">NYOUTA.COM</h2>
          </div>
        </section>
      </form>
    </div>
  );
};

export default Template01;