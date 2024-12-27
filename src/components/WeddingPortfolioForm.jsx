import React, { useState } from 'react';
import { X, Plus, Camera } from 'lucide-react';

const WeddingPortfolioForm = () => {
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
                <input type="text" className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:border-amber-400" />
              </div>
              <div>
                <label className="block text-amber-900 mb-2">Bride's Name</label>
                <input type="text" className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:border-amber-400" />
              </div>
              <div>
                <label className="block text-amber-900 mb-2">Wedding Date</label>
                <input type="date" className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:border-amber-400" />
              </div>
              <div>
                <label className="block text-amber-900 mb-2">Venue</label>
                <input type="text" className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:border-amber-400" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-amber-900 mb-2">Couple Picture</label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
                  <Camera className="mx-auto h-12 w-12 text-amber-400 mb-4" />
                  <input type="file" accept="image/*" className="hidden" id="couple-photo" />
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
                <textarea className="w-full p-2 border border-slate-300 rounded h-32 focus:outline-none focus:border-amber-400" />
                <div className="mt-4">
                  <label className="block text-amber-900 mb-2">Groom's Picture</label>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center">
                    <input type="file" accept="image/*" className="hidden" id="groom-photo" />
                    <label htmlFor="groom-photo" className="cursor-pointer text-amber-600 hover:text-amber-700">
                      Upload photo
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-amber-900 mb-2">Bride's Quote</label>
                <textarea className="w-full p-2 border border-slate-300 rounded h-32 focus:outline-none focus:border-amber-400" />
                <div className="mt-4">
                  <label className="block text-amber-900 mb-2">Bride's Picture</label>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center">
                    <input type="file" accept="image/*" className="hidden" id="bride-photo" />
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
              placeholder="Share your love story..."
              className="w-full p-4 border border-slate-300 rounded h-48 mb-4 focus:outline-none focus:border-amber-400"
            />
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center">
              <input type="file" accept="image/*" className="hidden" id="story-photo" />
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
                  className="w-full p-2 border border-slate-300 rounded h-32 focus:outline-none focus:border-amber-400"
                  placeholder="Enter detailed venue address and landmarks..."
                />
              </div>
              <div>
                <label className="block text-amber-900 mb-2">Google Maps Link</label>
                <input 
                  type="url" 
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
              <input type="file" accept="image/*" multiple className="hidden" id="gallery-photos" />
              <label htmlFor="gallery-photos" className="cursor-pointer text-amber-600 hover:text-amber-700">
                Click to upload multiple photos
              </label>
              <p className="text-sm text-gray-500 mt-2">You can select multiple images at once</p>
            </div>
          </div>
        )}

        {/* About Section */}
        {sections.about && (
          <div className="bg-white/80 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-serif text-amber-800 mb-6">Social Media</h2>
            <div className="space-y-4">
              {socialHandles.map((handle, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Platform (e.g., Instagram)"
                      className="w-full p-2 border border-slate-300 rounded mb-2 focus:outline-none focus:border-amber-400"
                    />
                    <input
                      type="url"
                      placeholder="Profile Link"
                      className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSocialHandle(index)}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addSocialHandle}
                className="flex items-center gap-2 text-amber-600 hover:text-amber-700"
              >
                <Plus className="h-5 w-5" />
                Add Another Social Handle
              </button>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-amber-600 text-white px-8 py-3 rounded-lg hover:bg-amber-700 transition-colors font-serif text-lg"
          >
            Save Portfolio
          </button>
        </div>
      </form>
    </div>
  );
};

export default WeddingPortfolioForm;