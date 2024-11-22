import React from 'react'

const AddProduct = () => {
  return (
    <div className='w-full'>
      <div>
        <h1 className='text-2xl text-center font-bold'>Add Your New Product Here</h1>
      </div>
      <div className='w-[60%] mx-auto my-8'>
        <form action="" method="post" className='flex flex-col gap-4'>
          <div className='flex flex-col'>
            <label>Name</label>
            <input className='rounded-md' type="text" name='name' placeholder='Enter New Product Name'/>
          </div>
          <div className='flex flex-col'>
            <label>Price</label>
            <input className='rounded-md' type="number" name="price" id="price" placeholder='Enter Product Price' />
          </div>
          <div className='flex flex-col'>
            <label>Category</label>
            <input className='rounded-md' type="text" name="category" id="category" placeholder='Enter Product Category' />
          </div>
          <div className='flex flex-col'>
            <label>Description</label>
            <input className='rounded-md' type="text" name="description" id="description" placeholder='Enter Product Description' />
          </div>
          <div className='flex flex-col'>
            <label>Stock</label>
            <input className='rounded-md' type="number" name="stock" id="stock" placeholder='Enter Number of Products/Stocks'/>
          </div>
          <div className='flex flex-col'>
            <button type="submit" className='bg-primaryBlue text-white text-xl py-2 hover:bg-blue-800 duration-300 ease-in-out rounded-md'>Add Product</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddProduct