import React, { useState } from 'react'
import Banner1 from "../assets/images/Banner1.png";
import Banner2 from "../assets/images/Banner2.png";

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const forms = {
  vendor: {
    name: "Register As a Vendor",
    imgUrl: Banner1
  },
  memories: {
    name: "Share Memories",
    imgUrl: Banner2
  },
  matrimony: {
    name: "Submit Matrimonial Biodata",
    imgUrl: Banner1
  },
  submitDesign: {
    name: "Submit Design! Earn",
    imgUrl: Banner2
  }
};

const JoinNyouta = () => {
  const [currentCategory, setCurrentCategory] = useState('vendor')

  const handleCategoryChange = (category) => {
    setCurrentCategory(category)
  }
  return (
    <div>
      <div className='py-4'>
        <h1 className='lg:text-4xl text-3xl text-secondary font-avalonN text-center'>Join E-Nyouta</h1>
        <h1 className='lg:text-3xl text-2xl font-avalonN text-center text-secondary'>Choose Your type of Category Below</h1>
      </div>
      <div className='flex lg:gap-8 gap-2 px-2 lg:justify-center py-4 overflow-x-auto'>
        {Object.entries(forms).map(([key, {name}]) => (
            <button className={`px-4 py-2 text-lg flex flex-shrink-0 font-avalonB rounded-md ${currentCategory === key ? 'bg-primary text-white' : 'bg-secondary text-white'}`} key={key} onClick={()=> handleCategoryChange(key)}>{name}</button>
        ))}
      </div>
      <div>
        <img src={forms[currentCategory].imgUrl} className='w-full h-[250px]' alt={forms[currentCategory].name} />
      </div>
      <div className='mx-4 lg:mx-24 my-8 flex flex-col gap-4'>
        <div>
        <h1 className='text-center text-3xl lg:text-4xl font-avalonN text-secondary'>{forms[currentCategory].name}</h1>
        </div>
        <form action="" method="post" className='flex flex-col gap-6'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            <input type="text" placeholder='Name*' required/>
            <input type="email" name="" id="" placeholder='Email'/>
            <input type="number" name="" id="" placeholder='Phone No.'/>
            <input type="text" placeholder='Place'/>
          </div>
          <div className='flex flex-col gap-6'>
            <select name="" id="" required>
              <option value="" disabled>Select State</option>
              {indianStates.map((item) => (
                <option value="">{item}</option>
              ))}
            </select>
            <textarea name="" id="" placeholder='Write About Special Moments'></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default JoinNyouta