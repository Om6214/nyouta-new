import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { createWeddingWebsite, updateWeddingWebsite } from "../Store/slices/weddingtemplateSlice";
import { useDispatch } from 'react-redux';
import WeddingPortfolioForm from './WeddingPortfolioForm';

const TemplateCard = ({ template, id, image,setShowForm,setId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = localStorage.getItem('user');
  const handleTemplateClick = async (id) => {
    if(!user || user === undefined || user === null) {
      navigate('/login');
    }
    if (!user.isWebsiteCreated) {
      const res = await dispatch(createWeddingWebsite(id));
      if(res.status===401||res.status===403){
        navigate('/login');
      }
      else if (res.type === 'weddingtemplates/createWeddingWebsite/fulfilled') {
        console.log(res);
        navigate(`/weds/${res?.payload?.slug}`);
      }
    } else {
      const res = await dispatch(updateWeddingWebsite(id));
      if(res.status===401||res.status===403){
        navigate('/login');
      }
      else if (res.type === 'weddingtemplates/updateWeddingWebsite/fulfilled') {
        navigate(`/weds/${res?.payload?.slug}`);
      }
    }
  }
  const handleUpdatedetails = () => {
    // setShowForm(true);   // Enable it when u want to use form functionality
    setId(id);
    if(localStorage.getItem('token')){
      navigate('/edit-wedding-website/01')
    }
    else navigate('/login')
  }
  const handleCreate = () => {
    handleTemplateClick(id);
  }
  return (
    <div
      className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 cursor-pointer relative group"
    >
      <div className="p-4">
        <div className="relative">
          <img src={image} alt="Template" className="w-full h-auto transition-all duration-300 group-hover:opacity-50" />
          {/* Create Button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-10 transition-all duration-500">
            <button className="bg-gray-500 text-white py-2 px-4 mr-3" onClick={handleUpdatedetails}>Update Details</button>
            <button className="bg-gray-500 text-white py-2 px-4" onClick={handleCreate}>Create</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TemplateSection = ({ weddingTemplates }) => {
  const [showForm, setShowForm] = useState(false);
  const [id, setId] = useState(null);
  return (
    <>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {weddingTemplates?.map((template) => (
        <TemplateCard
          key={template.id}
          id={template.id}
          template={template.content}
          image={template.image}
          setShowForm={setShowForm}
          setId={setId}
        />
      ))}
    </div>
    {/* <WeddingPortfolioForm /> */}
    {/* Modal - WeddingPortfolioForm */}
    {showForm && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 scrollbar-thin" onClick={() => setShowForm(false)}></div>
          
          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg max-h-[95vh] overflow-auto relative scrollbar-thin">
              {/* Close Button */}
              <button 
                className="absolute top-2 right-0 text-4xl text-gray-600 hover:text-gray-900"
                onClick={() => setShowForm(false)}
              >
                ×
              </button>

              {/* Wedding Portfolio Form */}
              <WeddingPortfolioForm id={id} setShowForm={setShowForm}/>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default TemplateSection;
