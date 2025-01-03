import React, { useState } from 'react';
import { X, Plus, Camera } from 'lucide-react';
import {updateWeddingWebsitedata} from '../Store/slices/weddingwebsiteSlice';
import { useDispatch,useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
const WeddingPortfolioForm = ({id,setShowForm}) => {
  console.log(id);
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    id: id,
    home: {
      name: '',
      partnerName: '',
      images: [],
      weddingDate: '',
      weddingLocation: '',
      text: ''
    },
    about: {
      bride: {
        image: '',
        description: ''
      },
      groom: {
        image: '',
        description: ''
      }
    },
    ourStory: {
      description: '',
      images: []
    },
    eventInfo: {
      description: '',
      time: '',
      venue: {
        name: '',
        address: '',
        location: ''
      }
    },
    socialLinks: {
      facebook: '',
      instagram: '',
      twitter: ''
    },
    tags: []
  });

  console.log(formData);
  const [sections, setSections] = useState({
    basic: true,
    quotes: true,
    story: true,
    directions: true,
    gallery: true,
    about: true
  });

  const [socialHandles, setSocialHandles] = useState([{ platform: '', link: '' }]);

  const toggleSection = (section) => {
    setSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const addSocialHandle = () => {
    setSocialHandles(prev => [...prev, { platform: '', link: '' }]);
  };

  const removeSocialHandle = (index) => {
    setSocialHandles(prev => prev.filter((_, i) => i !== index));
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
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    const res=await dispatch(updateWeddingWebsitedata(formData));
    console.log(res);
    if(res.payload.status===401||res.payload.status===403){
      navigate('/login');
    }
    else if(res.payload.status===200){
      setShowForm(false);
      toast.success(res.payload.data.message);
    }
    console.log(res);
  }
  return (
    <div className="min-h-screen bg-[#E3E0DA] p-8">
      <form className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl text-center font-serif text-amber-800 mb-12">Wedding Portfolio Details</h1>

        {/* Section Toggle Controls */}
        <div className="bg-white/80 p-6 rounded-lg shadow-md mb-8">
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
        </div>

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
                    onChange={(e) => handleChange(e, 'home', 'images', 0)}
                  />
                  <label htmlFor="couple-photo" className="cursor-pointer text-amber-600 hover:text-amber-700">
                    Click to upload couple photo
                  </label>
                </div>
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
                      onChange={(e) => handleChange(e, 'about', 'groom', 'image')}
                    />
                    <label htmlFor="groom-photo" className="cursor-pointer text-amber-600 hover:text-amber-700">
                      Upload photo
                    </label>
                  </div>
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
                      onChange={(e) => handleChange(e, 'about', 'bride', 'image')}
                    />
                    <label htmlFor="bride-photo" className="cursor-pointer text-amber-600 hover:text-amber-700">
                      Upload photo
                    </label>
                  </div>
                </div>
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
                onChange={(e) => handleChange(e, 'ourStory', 'images')}
              />
              <label htmlFor="story-photo" className="cursor-pointer text-amber-600 hover:text-amber-700">
                Add a photo to your story (optional)
              </label>
            </div>
          </div>
        )}

        {/* Directions Section */}
        {sections.directions && (
          <div className="bg-white/80 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-serif text-amber-800 mb-6">Directions</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-amber-900 mb-2">Detailed Address</label>
                <textarea
                  value={formData.eventInfo.description}
                  onChange={(e) => handleChange(e, 'eventInfo', 'description')}
                  className="w-full p-2 border border-slate-300 rounded h-32 focus:outline-none focus:border-amber-400"
                  placeholder="Enter detailed venue address and landmarks..."
                />
              </div>
              <div>
                <label className="block text-amber-900 mb-2">Google Maps Link</label>
                <input
                  type="url"
                  value={formData.eventInfo.venue.location}
                  onChange={(e) => handleChange(e, 'eventInfo', 'venue', 'location')}
                  placeholder="Paste Google Maps location link"
                  className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:border-amber-400"
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
                onChange={(e) => handleChange(e, 'ourStory', 'images')}
                className="hidden"
                id="gallery-photos"
              />
              <label htmlFor="gallery-photos" className="cursor-pointer text-amber-600 hover:text-amber-700">
                Click to upload multiple photos
              </label>
              <p className="text-sm text-gray-500 mt-4">
                Upload up to 10 photos for your gallery.
              </p>
            </div>
          </div>
        )}

        {/* Social Links Section */}
        {sections.social && (
          <div className="bg-white/80 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-serif text-amber-800 mb-6">Social Links</h2>
            <div className="space-y-4">
              {socialHandles.map((handle, index) => (
                <div key={index} className="flex space-x-4">
                  <input
                    type="text"
                    placeholder="Platform (e.g., Facebook)"
                    value={handle.platform}
                    onChange={(e) =>
                      setSocialHandles(
                        socialHandles.map((h, i) =>
                          i === index ? { ...h, platform: e.target.value } : h
                        )
                      )
                    }
                    className="w-1/2 p-2 border border-slate-300 rounded focus:outline-none focus:border-amber-400"
                  />
                  <input
                    type="url"
                    placeholder="Link"
                    value={handle.link}
                    onChange={(e) =>
                      setSocialHandles(
                        socialHandles.map((h, i) =>
                          i === index ? { ...h, link: e.target.value } : h
                        )
                      )
                    }
                    className="w-1/2 p-2 border border-slate-300 rounded focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="button"
                    className="text-red-500"
                    onClick={() => removeSocialHandle(index)}
                  >
                    <X />
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="flex items-center space-x-2 text-blue-500 hover:text-blue-700"
                onClick={addSocialHandle}
              >
                <Plus />
                <span>Add Social Media</span>
              </button>
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
