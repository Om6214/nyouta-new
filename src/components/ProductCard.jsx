import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../Store/slices/productSlice';
import { ChevronRight } from 'lucide-react';

const ProductCard = () => {
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.product);

     useEffect(() => {
        if (!products.length) {
          dispatch(getProducts());
        }
      }, [dispatch, products]);
  return (
    <div className='grid lg:grid-cols-3 grid-cols-1 gap-4 lg:px-8 px-2 bg-priBg font-heroFont'>
        <div className='bg-primary p-2'>
            <div className='flex justify-between items-center py-2'>
            <h1 className='text-3xl'>Flat 40% Off</h1>
            <a className='bg-secondary rounded-[50%] p-1 hover:bg-amber-500 transition duration-300 ease-in' href="#"><ChevronRight /></a>
            </div>
            <div className='grid grid-cols-2 gap-3'>
                {products?.slice(10, 14).map((product) => (
                    <div className='p-3 border-2 border-secondary bg-priBg hover:bg-transparent transition duration-300 ease-in'>
                      <a href="">
                        <img className='h-[120px] w-full object-cover hover:scale-105' src={product.image[0]} alt="" />
                        <h2 className='pt-2'>{product.name}</h2>
                        </a>
                    </div>
                ))}
            </div>
        </div>
        <div className='bg-primary p-2'>
            <div className='flex justify-between items-center py-2'>
            <h1 className='text-3xl'>Hand Crafted</h1>
            <a className='bg-secondary rounded-[50%] p-1 hover:bg-amber-500 transition duration-300 ease-in' href="#"><ChevronRight /></a>
            </div>
            <div className='grid grid-cols-2 gap-3'>
                {products?.slice(30, 34).map((product) => (
                    <div className='p-3 border-2 border-secondary bg-priBg hover:bg-transparent transition duration-300 ease-in'>
                      <a href="">
                        <img className='h-[120px] w-full object-cover' src={product.image[0]} alt="" />
                        <h2 className='pt-2'>{product.name}</h2>
                        </a>
                    </div>
                ))}
            </div>
        </div>
        <div className='bg-primary p-2'>
            <div className='flex justify-between items-center py-2'>
            <h1 className='text-3xl'>Most Popular</h1>
            <a className='bg-secondary rounded-[50%] p-1 hover:bg-amber-500 transition duration-300 ease-in' href="#"><ChevronRight /></a>
            </div>
            <div className='grid grid-cols-2 gap-3'>
                {products?.slice(68, 72).map((product) => (
                    <div className='p-3 border-2 border-secondary bg-priBg hover:bg-transparent transition duration-300 ease-in'>
                      <a href="">
                        <img className='h-[120px] w-full object-cover' src={product.image[0]} alt="" />
                        <h2 className='pt-2'>{product.name}</h2>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default ProductCard