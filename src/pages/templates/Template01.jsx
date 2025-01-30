import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getWeddingWebsitedata,
  updateWeddingWebsitedata,
} from "../../Store/slices/weddingwebsiteSlice";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Template01 = () => {
  const dispatch = useDispatch();
  const { weddingwebsiteData } = useSelector((state) => state.weddingwebsite);
  console.log(weddingwebsiteData);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    id: "01",
    home: {
      name: "",
      partnerName: "",
      weddingDate: "",
      weddingLocation: "", 
      images: [], 
      text: "", 
    },
    about: {
      bride: {
        image: "",
        description: "",
      },
      groom: {
        image: "",
        description: "",
      },
    },
    ourStory: {
      description: "",
      images: [], 
    },
    eventInfo: [{
      description: "",
      time: "",
      venue: {
        name: "", 
        address: "",
        location: "", 
      },
    }],
    socialLinks: {
      facebook: "",
      instagram: "",
      twitter: "",
    },
    tags: [],
    gallery: {
      photos: [],
    },
  }); 
   console.log(formData);
  useEffect(() => {
    dispatch(getWeddingWebsitedata());
    setLoading(false);
  }, [dispatch]);

  const handleContentChange = (e, field) => {
    const value = e.target.innerText;
    setFormData((prevState) => {
        const updatedState = { ...prevState };
        const fields = field.split('.');
        let current = updatedState;

        fields.forEach((f, index) => {
            if (index === fields.length - 1) {
                current[f] = value;
            } else {
                current = current[f];
            }
        });

        return updatedState;
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevState) => ({
      ...prevState,
      gallery: {
        ...prevState.gallery,
        photos: [...prevState.gallery.photos, ...files],
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = dispatch(updateWeddingWebsitedata(formData));
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
      throw error;
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
      <form onSubmit={handleSubmit} style={{ position: "relative" }}>
        <button
          type="submit"
          style={{ position: "absolute", top: "20px", right: "20px" }}
          className="text-pink-800 text-xl border-2 px-4 py-2 hover:bg-pink-500 hover:text-black duration-300"
        >
          Update
        </button>

        <section
          id="section-1"
          className="bg-cover bg-center bg-no-repeat min-h-80vh w-full px-4 sm:px-6 md:px-8 lg:px-12"
          style={{
            backgroundImage:
              "url(https://res.cloudinary.com/dr6qk9jr8/image/upload/v1737654489/background1.png)",
          }}
        >
          <div className="container mx-auto max-w-7xl py-8 sm:py-12 md:py-16">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16">
              {/* Floral Image */}
              <div className="floral-image w-full md:w-1/2 flex justify-center md:justify-center">
                <img
                  src="https://res.cloudinary.com/dr6qk9jr8/image/upload/v1737654489/c2_hszmm6.png"
                  alt="Floral"
                  className="w-2/3 sm:w-1/2 md:w-2/3 lg:w-1/2 h-auto max-h-[300px] object-contain"
                  contentEditable
                  onBlur={(e) => handleContentChange(e, "home.floralImage")}
                  suppressContentEditableWarning={true}
                />
              </div>

              {/* Wedding Details */}
              <div className="wedding-details w-full md:w-1/2 text-center flex flex-col justify-center items-center space-y-4 md:space-y-6">
                {/* Title */}
                <div className="title">
                  <h1 className="font-great-vibes text-3xl sm:text-4xl md:text-5xl text-e0447b">
                    <span
                    >
                      WEDDING
                    </span>
                  </h1>
                </div>

                {/* Ceremony */}
                <div className="ceremony text-e0447b text-2xl sm:text-2xl md:text-3xl">
                  <span
                  >
                    CEREMONY
                  </span>
                </div>

                {/* Names Container */}
                <div className="names-container">
                  <div className="names flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
                    <div
                      contentEditable
                      onBlur={(e) => handleContentChange(e, "home.name")}
                      className="font-great-vibes text-3xl sm:text-3xl md:text-4xl text-e0447b"
                      suppressContentEditableWarning={true}
                    >
                      {formData.home.name || "Groom"}
                    </div>
                    <span className="font-great-vibes text-3xl sm:text-3xl md:text-4xl text-e0447b">&</span>
                    <div
                      contentEditable
                      onBlur={(e) => handleContentChange(e, "home.partnerName")}
                      className="font-great-vibes text-3xl sm:text-3xl md:text-4xl text-e0447b"
                      suppressContentEditableWarning={true}
                    >
                      {formData.home.partnerName || "Bride"}
                    </div>
                  </div>
                </div>

                {/* Date and Time */}
                <div className="date-time text-e0447b font-montserrat text-base sm:text-lg md:text-xl space-y-2 sm:space-y-3">
                  <div
                    contentEditable
                    onBlur={(e) => handleContentChange(e, "home.weddingDate")}
                    className="font-montserrat text-e0447b"
                    suppressContentEditableWarning={true}
                  >
                    {formData.home.weddingDate || "October 23rd, 2025"}
                  </div>

                  <div className="flex items-center justify-center gap-2">
                    <span className="text-e0447b">|</span>
                    <div
                      contentEditable
                      onBlur={(e) => handleContentChange(e, "eventInfo[0].time")}
                      className="font-montserrat text-e0447b inline"
                      suppressContentEditableWarning={true}
                    >
                      {formData.eventInfo[0].time || "8:00 PM"}
                    </div>
                    <span className="text-e0447b">|</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="section-2"
          style={{
            backgroundImage:
              "url(https://res.cloudinary.com/dr6qk9jr8/image/upload/v1737654489/background2.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="bg-blue-200 px-4 py-6 md:px-8 flex flex-col md:flex-row items-center md:justify-between gap-6">
            {/* Left Section */}
            <div className="flex flex-col gap-12 md:gap-24 text-center">
              <div className="flex flex-col items-center lg:pl-10 gap-2">
                <h1 className="text-2xl md:text-4xl mb-6">Save the Date</h1>
                <h2 className="text-xl md:text-2xl">
                  <span
                  >
                    DATE
                  </span>
                </h2>
                <p className="text-lg md:text-xl border-l-2 inline border-r-2 px-2 border-red-600">
                  <span
                    contentEditable
                    onBlur={(e) => handleContentChange(e, "eventInfo[0].time")}
                    suppressContentEditableWarning={true}
                  >
                    {formData.eventInfo[0].time || "Time"}
                  </span>
                </p>
              </div>
              <div className="flex flex-col items-center lg:pl-10 lg:items-center">
                <h3 className="text-xl md:text-2xl">VENUE</h3>
                <h3 className="text-xl md:text-2xl">
                  <span
                    contentEditable
                    onBlur={(e) => handleContentChange(e, "eventInfo[0].venue.address")}
                    suppressContentEditableWarning={true}
                  >
                    {formData.eventInfo[0].venue.address || "Venue Address"}
                  </span>
                </h3>
              </div>
            </div>

            {/* Image Section */}
            <div className="w-2/3 md:w-auto flex justify-center">
              <img
                src="https://res.cloudinary.com/dr6qk9jr8/image/upload/v1737654545/c3_lp8zpe.png"
                alt="Venue"
                className="max-w-full h-auto"
              />
            </div>

            {/* Names Section */}
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl">
                <span
                  contentEditable
                  onBlur={(e) => handleContentChange(e, "home.partnerName")}
                  suppressContentEditableWarning={true}
                >
                  {formData.home.partnerName || "Bride"}
                </span>
              </h1>
              <span className="text-3xl md:text-5xl">&</span>
              <h1 className="text-4xl md:text-6xl">
                <span
                  contentEditable
                  onBlur={(e) => handleContentChange(e, "home.name")}
                  suppressContentEditableWarning={true}
                >
                  {formData.home.name || "Groom"}
                </span>
              </h1>
            </div>

            {/* Decorative Image */}
            <div className="w-2/3 md:w-auto">
              <img
                src="https://res.cloudinary.com/dr6qk9jr8/image/upload/v1737654489/c2_hszmm6.png"
                alt="Decoration"
                className="max-w-full h-auto"
              />
            </div>
          </div>
        </section>


        <section
          id="section-3"
          className="bg-cover bg-center py-8 px-4 sm:px-8 md:px-16 lg:px-24"
          style={{
            backgroundImage:
              "url(https://res.cloudinary.com/dr6qk9jr8/image/upload/v1737654489/background3.png)",
          }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left Content */}
            <div className="flex flex-col about items-center text-center gap-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">About Us</h1>

              <p className="text-sm sm:text-base md:text-lg lg:text-xl">
                <span
                  contentEditable
                  onBlur={(e) => handleContentChange(e, "about.groom.description")}
                  suppressContentEditableWarning={true}
                >
                  {formData.about.groom.description || "Groom's Description"}
                </span>
              </p>

              <p className="text-sm sm:text-base md:text-lg lg:text-xl">
                <span
                  contentEditable
                  onBlur={(e) => handleContentChange(e, "about.bride.description")}
                  suppressContentEditableWarning={true}
                >
                  {formData.about.bride.description || "Bride's Description"}
                </span>
              </p>

              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">
                <span
                  contentEditable
                  onBlur={(e) => handleContentChange(e, "home.name")}
                  suppressContentEditableWarning={true}
                >
                  {formData.home.name || "Groom"}
                </span>
                &
                <span
                  contentEditable
                  onBlur={(e) => handleContentChange(e, "home.partnerName")}
                  suppressContentEditableWarning={true}
                >
                  {formData.home.partnerName || "Bride"}
                </span>
              </h2>
            </div>

            {/* Right Image */}
            <div className="flower flex justify-center">
              <img
                src="https://res.cloudinary.com/dr6qk9jr8/image/upload/v1737654489/c2_hszmm6.png"
                alt="Flower"
                className="w-44 sm:w-48 md:w-72 lg:w-72 xl:w-80"
                contentEditable
                onBlur={(e) => handleContentChange(e, "about.flowerImage")}
                suppressContentEditableWarning={true}
              />
            </div>
          </div>
        </section>


        <section
          id="section-4"
          className="bg-cover bg-center py-8 px-4 sm:px-8 md:px-16 lg:px-24"
          style={{
            backgroundImage:
              "url(https://res.cloudinary.com/dr6qk9jr8/image/upload/v1737654489/background4.png)",
          }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">

            {/* Left Image */}
            <div className="flower flex justify-center md:justify-start">
              <img
                src="https://res.cloudinary.com/dr6qk9jr8/image/upload/v1737654489/c2_hszmm6.png"
                alt="Flower"
                className="w-48 sm:w-48 md:w-64 lg:w-72"
              />
            </div>

            {/* Right Content */}
            <div className="py-8 sm:py-12 md:py-16 px-4 sm:px-8 md:px-16 space-y-4 text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-pink-800 font-bold">
                Our Story
              </h1>

              <div
                contentEditable
                onBlur={(e) => handleContentChange(e, "ourStory.description")}
                className="font-montserrat text-base sm:text-lg md:text-xl text-gray-800"
                suppressContentEditableWarning={true}
              >
                {formData.ourStory.description || "Your story goes here..."}
              </div>
            </div>
          </div>
        </section>


        <section
          id="section-5"
          style={{
            backgroundImage:
              "url(https://res.cloudinary.com/dr6qk9jr8/image/upload/v1737654489/background5.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex justify-between items-center px-8 text-center lg:px-24 py-16 bg-blue-200">
            <div className="flower-wed hidden lg:block">
              <img
                src="https://res.cloudinary.com/dr6qk9jr8/image/upload/v1737654489/c2_hszmm6.png"
                alt=""
                contentEditable
                onBlur={(e) => handleContentChange(e, "program.flowerImage")}
                suppressContentEditableWarning={true}
              />
            </div>
            <div className="about flex flex-col items-center gap-6">
              <h1 className="text-6xl text-pink-600">Wedding Programs</h1>
              <div className="space-y-2 flex flex-col items-center">
                <h2 className="text-3xl text-pink-600">
                  <span
                    contentEditable
                    onBlur={(e) => handleContentChange(e, "eventInfo[0].eventName")}
                    suppressContentEditableWarning={true}
                  >
                   {formData.eventInfo[0].eventName || "Monday, 21ST APRIL, 2025"}
                   
                  </span>
                </h2>
                <h3 className="text-xl text-blue-600">
                  <span
                    contentEditable
                    onBlur={(e) => handleContentChange(e, "eventInfo[0].eventName")}
                    suppressContentEditableWarning={true}
                  >
                     {formData.eventInfo[0].eventName || "Event-1 NAME - TIME"}
                  </span>
                </h3>
                <h3 className="text-xl text-blue-600">
                  <span
                    contentEditable
                    onBlur={(e) => handleContentChange(e, "eventInfo[0].eventName")}
                    suppressContentEditableWarning={true}
                  >
                  {formData.eventInfo[0].eventName || "Event-2 NAME - TIME"}
                  </span>
                </h3>
                <h2 className="text-xl text-pink-700">
                  VENUE:
                  <span
                    contentEditable
                    onBlur={(e) => handleContentChange(e, "eventInfo[0].venue.address")}
                    suppressContentEditableWarning={true}
                  >
                    {formData.eventInfo[0].venue.address || "VENUE NAME HERE"}
                  </span>
                </h2>
              </div>
            </div>
          </div>
        </section>

        <section
          id="section-6" className="px-4 sm:px-8 md:px-16 lg:px-40 py-8 md:py-16">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            {/* Left Column */}
            <div className="flex flex-col items-center text-center">
              <div className="space-y-2 flex flex-col items-center">
                <h2 className="text-2xl lg:pb-4 md:text-3xl text-pink-800">
                  <span
                    contentEditable
                    onBlur={(e) => handleContentChange(e, "eventInfo[0].eventName")}
                    suppressContentEditableWarning={true}
                    className="text-4xl"
                  >
                    {formData.eventInfo[0].eventName || "Event Name"}
                  </span>
                </h2>
                <h3 className="text-lg md:text-xl text-blue-600">
                  <span
                    contentEditable
                    onBlur={(e) => handleContentChange(e, "eventInfo[0].event1")}
                    suppressContentEditableWarning={true}
                  >
                    {formData.eventInfo[0].event1 || "Event-1 NAME - TIME"}
                  </span>
                </h3>
                <h3 className="text-lg md:text-xl text-blue-600">
                  <span
                    contentEditable
                    onBlur={(e) => handleContentChange(e, "eventInfo[0].event2")}
                    suppressContentEditableWarning={true}
                  >
                    {formData.eventInfo[0].event2 || "Event-2 NAME - TIME"}
                  </span>
                </h3>
                <h3 className="text-lg md:text-xl text-blue-600">
                  <span
                    contentEditable
                    onBlur={(e) => handleContentChange(e, "eventInfo[0].event3")}
                    suppressContentEditableWarning={true}
                  >
                    {formData.eventInfo[0].event3 || "Event-3 NAME - TIME"}
                  </span>
                </h3>
                <img
                  className="w-16 md:w-20"
                  src="https://res.cloudinary.com/dr6qk9jr8/image/upload/v1737654819/c5_nkagil.jpg"
                  alt=""
                />
                <h2 className="text-lg md:text-xl text-pink-800">
                  VENUE:{" "}
                  <span
                    contentEditable
                    onBlur={(e) => handleContentChange(e, "eventInfo[0].venue.address")}
                    suppressContentEditableWarning={true}
                  >
                    {formData.eventInfo[0].venue.address || "VENUE NAME HERE"}
                  </span>
                </h2>
              </div>
            </div>

            {/* Center Flower Image */}
            <div className="w-44 md:w-52 lg:w-72 py-6 lg:py-0">
              <img
                src="https://res.cloudinary.com/dr6qk9jr8/image/upload/v1737654489/c2_hszmm6.png"
                alt=""
              />
            </div>

            {/* Right Column - Duplicate for Mobile Symmetry */}
            <div className="flex flex-col items-center text-center">
              <div className="space-y-2 flex flex-col items-center">
                <h2 className="text-2xl lg:pb-4 md:text-3xl text-pink-800">
                  <span
                    contentEditable
                    onBlur={(e) => handleContentChange(e, "eventInfo[0].eventName")}
                    suppressContentEditableWarning={true}
                    className="text-4xl"
                  >
                    {formData.eventInfo[0].eventName || "Event Name"}
                  </span>
                </h2>
                <h3 className="text-lg md:text-xl text-blue-600">
                  <span
                    contentEditable
                    onBlur={(e) => handleContentChange(e, "eventInfo[0].event1")}
                    suppressContentEditableWarning={true}
                  >
                    {formData.eventInfo[0].event1 || "Event-1 NAME - TIME"}
                  </span>
                </h3>
                <h3 className="text-lg md:text-xl text-blue-600">
                  <span
                    contentEditable
                    onBlur={(e) => handleContentChange(e, "eventInfo[0].event2")}
                    suppressContentEditableWarning={true}
                  >
                    {formData.eventInfo[0].event2 || "Event-2 NAME - TIME"}
                  </span>
                </h3>
                <h3 className="text-lg md:text-xl text-blue-600">
                  <span
                    contentEditable
                    onBlur={(e) => handleContentChange(e, "eventInfo[0].event3")}
                    suppressContentEditableWarning={true}
                  >
                    {formData.eventInfo[0].event3 || "Event-3 NAME - TIME"}
                  </span>
                </h3>
                <img
                  className="w-16 md:w-20"
                  src="https://res.cloudinary.com/dr6qk9jr8/image/upload/v1737654819/c5_nkagil.jpg"
                  alt=""
                />
                <h2 className="text-lg md:text-xl text-pink-800">
                  VENUE:{" "}
                  <span
                    contentEditable
                    onBlur={(e) => handleContentChange(e, "eventInfo[0].venue.address")}
                    suppressContentEditableWarning={true}
                  >
                    {formData.eventInfo[0].venue.address || "VENUE NAME HERE"}
                  </span>
                </h2>
              </div>
            </div>
          </div>
        </section>


        <section
          id="section-7"
          className="bg-cover bg-center py-10 md:py-16 px-6 md:px-24"
          style={{
            backgroundImage:
              "url(https://res.cloudinary.com/dr6qk9jr8/image/upload/v1737654489/background7.png)",
          }}
        >
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl text-pink-800 text-center">
              Wedding Timeline
            </h1>
            <div
              contentEditable
              onBlur={(e) => handleContentChange(e, "eventInfo[0].timeline")}
              className="font-montserrat text-lg md:text-xl text-center"
              suppressContentEditableWarning={true}
            >
              {formData.eventInfo[0].timeline || "Enter Wedding Timeline"}
            </div>
          </div>
        </section>


        <section id="section-8">
          <div className="py-10 space-y-4 px-4 lg:px-40 bg-blue-200">
            <h2 className="text-4xl text-center text-pink-600">
              WEDDING VENUE
            </h2>
            <div className="flex justify-between">
              <div className="flower">
                <img
                  src="https://res.cloudinary.com/dr6qk9jr8/image/upload/v1737654489/c2_hszmm6.png"
                  alt=""
                />
              </div>
              <div className="flex flex-col justify-between items-center">
                <h2 className="text-3xl text-center text-blue-700">
                  <span
                    contentEditable
                    onBlur={(e) => handleContentChange(e, "eventInfo[0].venue.address")}
                    suppressContentEditableWarning={true}
                  >
                    {formData.eventInfo[0].venue.address || "Venue Address"}
                  </span>
                </h2>
                <img
                  className="w-32"
                  src="https://res.cloudinary.com/dr6qk9jr8/image/upload/v1737655025/c6_nzcplz.jpg"
                  alt=""
                />
              </div>
              <div className="flower">
                <img
                  src="https://res.cloudinary.com/dr6qk9jr8/image/upload/v1737654489/c2_hszmm6.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>

        <section
          id="section-11"
          style={{
            backgroundImage:
              "url(https://res.cloudinary.com/dr6qk9jr8/image/upload/v1737654489/background9.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="py-16 lg:px-24 px-4 space-y-4">
            <h1 className="lg:text-6xl text2xl md:text-4xl text-pink-800 text-center">
              Photo Gallery
            </h1>
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
                <img
                  key={index}
                  className="w-64 m-2"
                  src={URL.createObjectURL(photo)}
                  alt=""
                />
              ))}
            </div>
            <h2 className="text-2xl text-pink-800 text-center">
              Celebration Summary
            </h2>
          </div>
        </section>

        <section
          id="section-12"
          style={{
            backgroundImage:
              "url(https://res.cloudinary.com/dr6qk9jr8/image/upload/v1737654489/background10.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: "4rem 0",
          }}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-6xl text-center text-pink-800 font-bold mb-8">
              RSVP
            </h2>
            <form
              action=""
              className="max-w-4xl mx-auto bg-white bg-opacity-90 p-8 rounded-lg shadow-lg"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xl text-gray-700" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    className="border-2 border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-pink-500"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xl text-gray-700" htmlFor="address">
                    Full Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Enter your address"
                    className="border-2 border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-pink-500"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xl text-gray-700" htmlFor="mobile">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    placeholder="Enter your number"
                    className="border-2 border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-pink-500"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xl text-gray-700" htmlFor="response">
                    Response
                  </label>
                  <select
                    id="response"
                    name="response"
                    className="border-2 border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-pink-500"
                  >
                    <option value="accept">Accept with pleasure</option>
                    <option value="decline">Decline with regret</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="mt-6 w-full bg-pink-800 text-white text-xl px-8 py-3 rounded-md hover:bg-pink-700 transition duration-300"
              >
                Submit
              </button>
            </form>
          </div>
        </section>

        <section
          id="section-13"
          style={{
            backgroundImage:
              "url(https://res.cloudinary.com/dr6qk9jr8/image/upload/v1737654589/background11.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex flex-col gap-8 justify-center items-center">
            <h1 className="lg:text-6xl text-2xl md:text-4xl text-blue-700">
              Creating Special For Special Day
            </h1>
            <img
              src="https://res.cloudinary.com/dr6qk9jr8/image/upload/v1737654585/c4_uldilv.png"
              alt=""
            />
            <h2 className="lg:text-4xl text-2xl">NYOUTA.COM</h2>
          </div>
        </section>
      </form>
    </div>
  );
};

export default Template01;
