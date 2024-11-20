import { CircleX, ShoppingBag } from 'lucide-react';
import React, { useState } from 'react'

const Cart = ({cartItems}) => {
  const [showDrawer, setShowDrawer] = useState(false)

  
  const toggleModal = () => {
    setShowDrawer(!showDrawer);
  };
  return (
    <div>
      <div>
        <ShoppingBag onClick={toggleModal} className='cursor-pointer'/>
      </div>

    {showDrawer && (
      <div className='fixed h-full z-50 bg-red-200 top-0 right-0'>
        <div className='flex gap-8 items-center justify-around px-4 pt-5'>
          <h1 className='text-2xl font-semibold font-sans'>Here is your Shopping Bag</h1>
          <button onClick={toggleModal}><CircleX/></button>
        </div>
        <div>
        </div>
      </div>
      
    )}
    </div>
  )
}

export default Cart