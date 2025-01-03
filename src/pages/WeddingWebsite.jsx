import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getWeddingWebsite } from '../Store/slices/weddingwebsiteSlice';

const WeddingWebsite = () => {
    const { slug } = useParams();
    const dispatch = useDispatch();
    console.log(slug);
    const { weddingWebsite, loading, error } = useSelector((state) => state.weddingwebsite);
    console.log(weddingWebsite);
    useEffect(() => {
        dispatch(getWeddingWebsite(slug));
    }, [dispatch, slug]);
    return (
        <>
            {loading &&
                <div className="flex justify-center items-center h-full">
                    <div className="spinner-border animate-spin border-4 border-blue-500 border-t-transparent w-8 h-8 rounded-full" />
                </div>
            }
            {error && <div>{error}</div>}
            {weddingWebsite &&
                <div>
                    <div dangerouslySetInnerHTML={{ __html: weddingWebsite?.html }} />
                </div>
            }
        </>
    );
};

export default WeddingWebsite;