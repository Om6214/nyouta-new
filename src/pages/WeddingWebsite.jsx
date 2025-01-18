import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getWeddingWebsite, resetState, verifyWeddingWebsite } from '../Store/slices/weddingwebsiteSlice';
import { toast } from 'react-toastify';

const WeddingWebsite = () => {
    const { slug } = useParams();
    const dispatch = useDispatch();
    const { weddingWebsite, loading, error } = useSelector((state) => state.weddingwebsite);
    const [password, setPassword] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            await dispatch(resetState()); // Clear persisted state
            const res = await dispatch(getWeddingWebsite(slug));
            console.log(res);
            if (res.payload && res.payload.status === 401) {
                setOpenModal(true);
            }
        };
        fetchData();
    }, [dispatch, slug]);

    const handleSubmit = async () => {
        const res=await dispatch(verifyWeddingWebsite({ slug, password }));
        console.log(res);
        if(res.payload.status!==200){
            toast.error('Invalid Password');
        }
        else setOpenModal(false);
    };

    return (
        <>
            {openModal && <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                                        Password Required
                                    </h3>
                                    <div className="mt-2 flex items-center relative">
                                        <input 
                                            type={showPassword ? 'text' : 'password'}
                                            value={password} 
                                            onChange={(e) => setPassword(e.target.value)} 
                                            className="border p-2 rounded w-full pr-10"
                                            placeholder="Enter Password" 
                                        />
                                        <button 
                                            type="button" 
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                                        >
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button onClick={handleSubmit} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                                Submit
                            </button>
                            <button onClick={() => setOpenModal(false)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>}
            {loading && <div className="flex justify-center items-center h-full">
                <div className="spinner-border animate-spin border-4 border-blue-500 border-t-transparent w-8 h-8 rounded-full" />
            </div>}
            {weddingWebsite && <div dangerouslySetInnerHTML={{ __html: weddingWebsite?.html }} />}
        </>
    );
};

export default WeddingWebsite;