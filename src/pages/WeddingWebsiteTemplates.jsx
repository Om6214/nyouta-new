import React, {useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getWeddingTemplates, updateWeddingWebsitedata,createWeddingWebsite,updateWeddingWebsite } from '../Store/slices/weddingtemplateSlice';
import { useNavigate } from 'react-router-dom';

const TemplateCard = ({ template, id }) => {
    const dispatch=useDispatch();
    const navigate = useNavigate();
    const user = localStorage.getItem('user');
    const handleTemplateClick = async(id) => {
        console.log(id);
        console.log(user);
        if(!user.isWebsiteCreated){
            console.log("Website created");
            const res=await dispatch(createWeddingWebsite(id));
            console.log(res);
            if(res.type==='weddingtemplates/createWeddingWebsite/rejected'){
                navigate('/login');
            }
            else if(res.type==='weddingtemplates/createWeddingWebsite/fulfilled'){
                console.log(res.payload);
                navigate(`/wedding-website/${res?.payload?.slug}`);
            }
        }else{
            console.log("Website not created");
            const res=await dispatch(updateWeddingWebsite(id));
            if(res.type==='weddingtemplates/updateWeddingWebsite/rejected'){
                navigate('/login');
            }
            else if(res.type==='weddingtemplates/updateWeddingWebsite/fulfilled'){
                navigate(`/wedding-website/${res?.payload?.slug}`);
            }
        }
    }
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 cursor-pointer" onClick={() => handleTemplateClick(id)}>
            <div className="p-4">
                <div
                    className="bg-gray-50 p-4 rounded-md"
                    dangerouslySetInnerHTML={{ __html: template }}
                />
            </div>
        </div>
    );
};

const WeddingWebsiteTemplates = () => {
    const dispatch = useDispatch();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({
        partnerName: '',
        weddingDate: '',
        weddingVenue: ''
    });
    const { weddingTemplates, loading, error } = useSelector((state) => state.weddingtemplates);

    useEffect(() => {
        dispatch(getWeddingTemplates());
    }, [dispatch]);
    const handleCreateYourOwn = () => {
        setIsFormOpen(true);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateWeddingWebsitedata(formData));
    }

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">Wedding Website Templates</h1>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleCreateYourOwn}>Create Your Own</button>
            {loading && <p className="text-center text-gray-600">Loading...</p>}
            
            {isFormOpen && (
                <form onSubmit={handleSubmit} className="mt-4">
                    <div>
                        <label className="block mb-2">Partner's Name (required)</label>
                        <input
                            type="text"
                            name="partnerName"
                            value={formData.partnerName}
                            onChange={handleInputChange}
                            required
                            className="border p-2 rounded w-full"
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Wedding Date (optional)</label>
                        <input
                            type="date"
                            name="weddingDate"
                            value={formData.weddingDate}
                            onChange={handleInputChange}
                            className="border p-2 rounded w-full"
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Wedding Venue (optional)</label>
                        <input
                            type="text"
                            name="weddingVenue"
                            value={formData.weddingVenue}
                            onChange={handleInputChange}
                            className="border p-2 rounded w-full"
                        />
                    </div>
                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md mt-4">Submit</button>
                </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {weddingTemplates?.map((template) => (
                    <TemplateCard key={template.id} id={template.id} template={template.content} />
                ))}
            </div>
        </div>
    );
};

export default WeddingWebsiteTemplates;
