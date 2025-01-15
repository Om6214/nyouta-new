import React, { useState, useEffect } from 'react';
import { X, Plus, Camera } from 'lucide-react';
import { updateWeddingWebsitedata, getWeddingWebsitedata } from '../Store/slices/weddingwebsiteSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Cloudinary } from 'cloudinary-core';
import axios from 'axios';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import { use } from 'react';
const cloudinary = new Cloudinary({ cloud_name: 'dr6qk9jr8', secure: false });

const WeddingPortfolioForm = ({ id, setShowForm }) => {
  // console.log(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { weddingwebsiteData } = useSelector((state) => state.weddingwebsite);
  // console.log(weddingwebsiteData);
  useEffect(() => {
    dispatch(getWeddingWebsitedata());
  }, [dispatch]);
  const [formData, setFormData] = useState({
    id: id,
    home: {
      name: weddingwebsiteData?.home?.name || '',
      partnerName: weddingwebsiteData?.home?.partnerName || '',
      images: weddingwebsiteData?.home?.images || [],
      weddingDate: weddingwebsiteData?.home?.weddingDate || '',
      weddingLocation: weddingwebsiteData?.home?.weddingLocation || '',
      text: weddingwebsiteData?.home?.text || ''
    },
    about: {
      bride: {
        image: weddingwebsiteData?.about?.bride?.image || [],
        description: weddingwebsiteData?.about?.bride?.description || ''
      },
      groom: {
        image: weddingwebsiteData?.about?.groom?.image || [],
        description: weddingwebsiteData?.about?.groom?.description || ''
      }
    },
    ourStory: {
      description: weddingwebsiteData?.ourStory?.description || '',
      images: weddingwebsiteData?.ourStory?.images || []
    },
    eventInfo: {
      description: weddingwebsiteData?.eventInfo?.description || '',
      time: weddingwebsiteData?.eventInfo?.time || '',
      venue: {
        name: '',
        address: weddingwebsiteData?.eventInfo?.venue?.address || '',
        location: weddingwebsiteData?.eventInfo?.venue?.location || ''
      }
    },
    socialLinks: {
      facebook: weddingwebsiteData?.socialLinks?.facebook || '',
      instagram: weddingwebsiteData?.socialLinks?.instagram || '',
      twitter: weddingwebsiteData?.socialLinks?.twitter || ''
    },
    tags: weddingwebsiteData?.tags || [],
    gallery: {
      photos: weddingwebsiteData?.gallery.photos || []
    }
  });

  // console.log(formData);
  const [sections, setSections] = useState({
    basic: true,
    quotes: true,
    story: true,
    directions: true,
    gallery: true,
    about: true,
    social: true,
    tags: true
  });

  const [newTag, setNewTag] = useState('');

  const [eventTime, setEventTime] = useState(formData.eventInfo.time);

  const toggleSection = (section) => {
    setSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };


  const addTag = () => {
    if (newTag.trim() !== '') {
      setFormData(prevState => ({
        ...prevState,
        tags: [...prevState.tags, `#${newTag.trim()}`]
      }));
      setNewTag('');
    }
  };

  const removeTag = (index) => {
    setFormData(prevState => ({
      ...prevState,
      tags: prevState.tags.filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = async (e, section, field, subfield = null) => {
    // console.log("handleImageUpload called");
    const files = e.target.files;
    if (!files.length) {
      console.error("No files selected");
      return;
    }

    const toastId = toast.info(
      <div>
        <div className="loader"></div>
        Uploading...
      </div>, 
      {
        position: "top-center",
        autoClose: false,
        transition: Slide,
        closeButton: false,
      }
    );

    const uploadedImages = [];

    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append('file', files[i]);
      formData.append('upload_preset', 'ml_default'); // Change this

      try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudinary.config().cloud_name}/image/upload`, {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        const imageUrl = data.secure_url;
        // console.log("Image uploaded to Cloudinary:", imageUrl);
        uploadedImages.push(imageUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }

    toast.dismiss(toastId);

    setFormData(prevState => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [field]: subfield
          ? { ...prevState[section][field], [subfield]: [...prevState[section][field][subfield], ...uploadedImages] }
          : [...prevState[section][field], ...uploadedImages]
      }
    }));
  };

  const handleChange = (e, section, field, subfield = null) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData(prevState => ({
        ...prevState,
        [section]: {
          ...prevState[section],
          [field]: subfield
            ? { ...prevState[section][field], [subfield]: files[0] }
            : [...prevState[section][field], files]
        }
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [section]: {
          ...prevState[section],
          [field]: subfield ? { ...prevState[section][field], [subfield]: value } : value
        }
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(updateWeddingWebsitedata(formData));
      // console.log(res);

      if (res.payload.status === 401 || res.payload.status === 403) {
        navigate('/login');
      } else if (res.payload.status === 200) {
        setShowForm(false);
        toast.success(res.payload.data.message || "Portfolio updated successfully!", {
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
      console.error("Error during form submission:", error);
      toast.error("Failed to update portfolio. Please try again.", {
        position: "top-center",
        autoClose: 5000,
        transition: Slide,
      });
    }
  }

  const removeGalleryImage = (index) => {
    setFormData(prevState => ({
      ...prevState,
      gallery: {
        ...prevState.gallery,
        photos: prevState.gallery.photos.filter((_, i) => i !== index)
      }
    }));
  };

  const removeGroomImage = () => {
    setFormData(prevState => ({
      ...prevState,
      about: {
        ...prevState.about,
        groom: {
          ...prevState.about.groom,
          image: ''
        }
      }
    }));
  };

  const removeBrideImage = () => {
    setFormData(prevState => ({
      ...prevState,
      about: {
        ...prevState.about,
        bride: {
          ...prevState.about.bride,
          image: ''
        }
      }
    }));
  };

  const removeOurStoryImages = (index) => {
    setFormData(prevState => ({
      ...prevState,
      ourStory: {
        ...prevState.ourStory,
        images: prevState.ourStory.images.filter((_, i) => i !== index)
      }
    }));
  };

  const removeHomeImages = (index) => {
    setFormData(prevState => ({
      ...prevState,
      home: {
        ...prevState.home,
        images: prevState.home.images.filter((_, i) => i !== index)
      }
    }));
  };

  const handleSocialLinkChange = (e, platform) => {
    const { value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      socialLinks: {
        ...prevState.socialLinks,
        [platform]: value
      }
    }));
  };

  return (
    <div className="min-h-screen bg-[#E3E0DA] p-8">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
      />
      <form className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl text-center font-serif text-amber-800 mb-12">Wedding Portfolio Details</h1>

        {/* Section Toggle Controls */}
        {/* <div className="bg-white/80 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-serif text-amber-800 mb-4">Customize Sections</h2>
          <div className="flex flex-wrap gap-4">
            {Object.entries(sections).map(([key, value]) => (
              <button
                key={key}
                type="button"
                onClick={() => toggleSection(key)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  value 
                    ? 'bg-amber-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>
        </div> */}

        {/* Basic Information */}
        {sections.basic && (
          <div className="bg-white/80 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-serif text-amber-800 mb-6">Basic Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-amber-900 mb-2">Groom's Name</label>
                <input
                  type="text"
                  value={formData.home.name}
                  onChange={(e) => handleChange(e, 'home', 'name')}
                  className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="block text-amber-900 mb-2">Bride's Name</label>
                <input
                  type="text"
                  value={formData.home.partnerName}
                  onChange={(e) => handleChange(e, 'home', 'partnerName')}
                  className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="block text-amber-900 mb-2">Wedding Date</label>
                <input
                  type="date"
                  value={formData.home.weddingDate}
                  onChange={(e) => handleChange(e, 'home', 'weddingDate')}
                  className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="block text-amber-900 mb-2">Venue</label>
                <input
                  type="text"
                  value={formData.home.weddingLocation}
                  onChange={(e) => handleChange(e, 'home', 'weddingLocation')}
                  className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:border-amber-400"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-amber-900 mb-2">Couple Picture</label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
                  <Camera className="mx-auto h-12 w-12 text-amber-400 mb-4" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="couple-photo"
                    onChange={(e) => handleImageUpload(e, 'home', 'images')}
                  />
                  <label htmlFor="couple-photo" className="cursor-pointer text-amber-600 hover:text-amber-700">
                    Click to upload couple photo
                  </label>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {formData.home.images.map((p, index) => (
                  <div key={index} className="flex items-center space-x-0 bg-gray-200 px-1 py-1">
                    <img
                      src={p}
                      className='w-10 h-15'
                    />
                    <button
                      type="button"
                      onClick={() => removeHomeImages(index)}
                      className="text-red-500"
                    >
                      <X />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Quotes Section */}
        {sections.quotes && (
          <div className="bg-white/80 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-serif text-amber-800 mb-6">Quotes</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-amber-900 mb-2">Groom's Quote</label>
                <textarea
                  value={formData.about.groom.description}
                  onChange={(e) => handleChange(e, 'about', 'groom', 'description')}
                  className="w-full p-2 border border-slate-300 rounded h-32 focus:outline-none focus:border-amber-400"
                />
                <div className="mt-4">
                  <label className="block text-amber-900 mb-2">Groom's Picture</label>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="groom-photo"
                      onChange={(e) => handleImageUpload(e, 'about', 'groom', 'image')}
                    />
                    <label htmlFor="groom-photo" className="cursor-pointer text-amber-600 hover:text-amber-700">
                      Upload photo
                    </label>
                  </div>
                  {formData.about.groom.image[0] &&
                  <div className="mt-4 flex flex-wrap gap-2">
                    <div className="flex items-center space-x-0 bg-gray-200 px-1 py-1">
                      <img
                        src={formData.about.groom.image}
                        className='w-10 h-15'
                      />
                      <button
                        type="button"
                        onClick={() => removeGroomImage()}
                        className="text-red-500"
                      >
                        <X />
                      </button>
                    </div>
                  </div>
                  }
                </div>
              </div>
              <div>
                <label className="block text-amber-900 mb-2">Bride's Quote</label>
                <textarea
                  value={formData.about.bride.description}
                  onChange={(e) => handleChange(e, 'about', 'bride', 'description')}
                  className="w-full p-2 border border-slate-300 rounded h-32 focus:outline-none focus:border-amber-400"
                />
                <div className="mt-4">
                  <label className="block text-amber-900 mb-2">Bride's Picture</label>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="bride-photo"
                      onChange={(e) => handleImageUpload(e, 'about', 'bride', 'image')}
                    />
                    <label htmlFor="bride-photo" className="cursor-pointer text-amber-600 hover:text-amber-700">
                      Upload photo
                    </label>
                  </div>
                </div>
                {formData.about.bride.image[0]&&
                <div className="mt-4 flex flex-wrap gap-2">
                  <div className="flex items-center space-x-0 bg-gray-200 px-1 py-1">
                    <img
                      src={formData.about.bride.image}
                      className='w-10 h-15'
                    />
                    <button
                      type="button"
                      onClick={() => removeBrideImage()}
                      className="text-red-500"
                    >
                      <X />
                    </button>
                  </div>
                </div>
                }
              </div>
            </div>
          </div>
        )}

        {/* Our Story Section */}
        {sections.story && (
          <div className="bg-white/80 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-serif text-amber-800 mb-6">Our Story</h2>
            <textarea
              value={formData.ourStory.description}
              onChange={(e) => handleChange(e, 'ourStory', 'description')}
              placeholder="Share your love story..."
              className="w-full p-4 border border-slate-300 rounded h-48 mb-4 focus:outline-none focus:border-amber-400"
            />
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="story-photo"
                onChange={(e) => handleImageUpload(e, 'ourStory', 'images')}
              />
              <label htmlFor="story-photo" className="cursor-pointer text-amber-600 hover:text-amber-700">
                Add a photo to your story
              </label>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {formData.ourStory.images.map((p, index) => (
                <div key={index} className="flex items-center space-x-0 bg-gray-200 px-1 py-1">
                  <img
                    src={p}
                    className='w-10 h-15'
                  />
                  <button
                    type="button"
                    onClick={() => removeOurStoryImages(index)}
                    className="text-red-500"
                  >
                    <X />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Event Info Section */}
        {sections.directions && (
          <div className="bg-white/80 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-serif text-amber-800 mb-6">Event Info</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-amber-900 mb-2">Description</label>
                <textarea
                  value={formData.eventInfo.description}
                  onChange={(e) => handleChange(e, 'eventInfo', 'description')}
                  className="w-full p-2 border border-slate-300 rounded h-32 focus:outline-none focus:border-amber-400"
                  placeholder="Enter event description..."
                />
              </div>
              <div>
                <label className="block text-amber-900 mb-2">Time</label>
                <TimePicker
                  onChange={(value) => {
                    setEventTime(value);
                    handleChange({ target: { value } }, 'eventInfo', 'time');
                  }}
                  value={eventTime}
                  className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="block text-amber-900 mb-2">Address</label>
                <textarea
                  value={formData.eventInfo.venue.address}
                  onChange={(e) => handleChange(e, 'eventInfo', 'venue', 'address')}
                  className="w-full p-2 border border-slate-300 rounded h-32 focus:outline-none focus:border-amber-400"
                  placeholder="Enter event address..."
                />
              </div>
              <div>
                <label className="block text-amber-900 mb-2">Location</label>
                <input
                  value={formData.eventInfo.venue.location}
                  onChange={(e) => handleChange(e, 'eventInfo', 'venue','location')}
                  className="w-full p-2 border border-slate-300 rounded h-10 focus:outline-none focus:border-amber-400"
                  placeholder="Enter location link from Google maps"
                />
              </div>
            </div>
          </div>
        )}

        {/* Gallery Section */}
        {sections.gallery && (
          <div className="bg-white/80 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-serif text-amber-800 mb-6">Gallery</h2>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
              <Camera className="mx-auto h-12 w-12 text-amber-400 mb-4" />
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                id="gallery-photos"
                onChange={(e) => {
                  handleImageUpload(e, 'gallery', 'photos');
                  e.target.value = null;
                }}
              />
              <label htmlFor="gallery-photos" className="cursor-pointer text-amber-600 hover:text-amber-700">
                Click to upload multiple photos
              </label>
              <p className="text-sm text-gray-500 mt-4">
                Upload up to 10 photos for your gallery.
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {formData.gallery.photos.map((p, index) => (
                <div key={index} className="flex items-center space-x-0 bg-gray-200 px-1 py-1">
                  <img
                    src={p}
                    className='w-10 h-15'
                  />
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(index)}
                    className="text-red-500"
                  >
                    <X />
                  </button>
                </div>
              ))}
            </div>
          </div>

        )}

        {/* Social Links Section */}
        {sections.social && (
          <div className="bg-white/80 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-serif text-amber-800 mb-6">Social Links</h2>
            <div className="space-y-4">
              <div className="flex space-x-4">
                <input
                  type="url"
                  placeholder="Facebook Link"
                  value={formData.socialLinks.facebook}
                  onChange={(e) => handleSocialLinkChange(e, 'facebook')}
                  className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:border-amber-400"
                />
              </div>
              <div className="flex space-x-4">
                <input
                  type="url"
                  placeholder="Instagram Link"
                  value={formData.socialLinks.instagram}
                  onChange={(e) => handleSocialLinkChange(e, 'instagram')}
                  className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:border-amber-400"
                />
              </div>
              <div className="flex space-x-4">
                <input
                  type="url"
                  placeholder="Twitter Link"
                  value={formData.socialLinks.twitter}
                  onChange={(e) => handleSocialLinkChange(e, 'twitter')}
                  className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tags Section */}
        {sections.tags && (
          <div className="bg-white/80 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-serif text-amber-800 mb-6">Tags</h2>
            <div className="flex space-x-4">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Enter your hastags with #"
                className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:border-amber-400"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 bg-amber-600 text-white rounded-full transition-all hover:bg-amber-700"
              >
                Add
              </button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <div key={index} className="flex items-center space-x-2 bg-gray-200 px-3 py-1 rounded-full">
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => removeTag(index)}
                    className="text-red-500"
                  >
                    <X />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-8 py-3 bg-amber-600 text-white rounded-full text-xl font-semibold transition-all hover:bg-amber-700"
          >
            Save Portfolio
          </button>
        </div>
      </form>
    </div>
  );
};

export default WeddingPortfolioForm;
