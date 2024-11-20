import React, { useState } from 'react'

const indianStates = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
    'Andaman and Nicobar Islands',
    'Chandigarh',
    'Dadra and Nagar Haveli and Daman and Diu',
    'Delhi',
    'Jammu and Kashmir',
    'Ladakh',
    'Lakshadweep',
    'Puducherry'
  ];

const Checkout = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        pincode: "",
        contactNumber: "",
        email: "",
      });

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };


    const handleSubmit = (e)=> {
        e.preventDefault();

    // Validation checks (basic example)
    if (!formData.state) {
      alert("Please select a state.");
      return;
    }
    if (!/^\d{6}$/.test(formData.pincode)) {
      alert("Please enter a valid 6-digit pincode.");
      return;
    }
    if (!/^\d{10}$/.test(formData.contactNumber)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    // Simulate form submission
    console.log("Form submitted:", formData);
    alert("Form submitted successfully!");
    }
  return (
    <>
    <div className='flex flex-col-reverse lg:flex-row justify-evenly'>
        <div className='mx-4 my-4 lg:w-[50%]'>
            <h1 className='text-xl font-bold'>Billing details</h1>
            <div className='mt-4'>
                <form action="" className='flex flex-col gap-4' onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-1'>
                        <label className='lg:text-lg'>First Name <span className='text-red-500 text-xl'>*</span></label>
                        <input value={formData.firstName} onChange={handleChange} name='firstName' className='py-2 border-2 px-4 rounded-lg' type="text" required placeholder='Enter your first name'/>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className='lg:text-lg'>Last Name <span className='text-red-500 text-xl'>*</span></label>
                        <input value={formData.lastName} onChange={handleChange} name='lastName' className='py-2 border-2 px-4 rounded-lg' type="text" required placeholder='Enter your last name'/>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className='lg:text-lg'>Street address <span className='text-red-500 text-xl'>*</span></label>
                        <input value={formData.addressLine1} onChange={handleChange} name='addressLine1' className='py-2 border-2 px-4 rounded-lg' type="text" required placeholder='House number and street name'/>
                        <input value={formData.addressLine2} onChange={handleChange} name='addressLine2' className='py-2 border-2 px-4 rounded-lg' type="text" required placeholder='Apartment, suite, unit, etc'/>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className='lg:text-lg'>Town / City <span className='text-red-500 text-xl'>*</span></label>
                        <input value={formData.city} onChange={handleChange} name='city' className='py-2 border-2 px-4 rounded-lg' type="text" required placeholder='Enter your Town / City name'/>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className='lg:text-lg'>State <span className='text-red-500 text-xl'>*</span></label>
                        <select value={formData.state} onChange={handleChange}
                            id="state"
                            name="state"
                            className='border-2 py-2 px-4 rounded-lg'
                        >
                            <option value="">Select a state</option>
                            {indianStates.map((state) => (
                            <option key={state} value={state}>
                                {state}
                            </option>
                            ))}
                        </select>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className='lg:text-lg'>Pincode <span className='text-red-500 text-xl'>*</span></label>
                        <input value={formData.pincode} onChange={handleChange} name='pincode' className='py-2 border-2 px-4 rounded-lg' type="text" maxLength={6} required placeholder='Enter your pincode'/>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className='lg:text-lg'>Contact Number <span className='text-red-500 text-xl'>*</span></label>
                        <input value={formData.contactNumber} onChange={handleChange} name='contactNumber' className='py-2 border-2 px-4 rounded-lg' type="tel" required placeholder='Enter your phone number'/>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className='lg:text-lg'>Email address <span className='text-red-500 text-xl'>*</span></label>
                        <input value={formData.email} onChange={handleChange} name='email' className='py-2 border-2 px-4 rounded-lg' type="email" required placeholder='Enter your Town / City name'/>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <button type='submit' className='bg-gray-500 py-2 rounded-lg text-xl font-bold hover:bg-gray-700 hover:text-white'>Place Order</button>
                    </div>
                </form>
            </div>
        </div>
        <div className='m-4 lg:w-[45%]'>
            <h1 className=' text-xl font-bold'>Your Order</h1>
            <div className='flex flex-col gap-6 mt-8 bg-blue-200 p-5 rounded-sm border-2 border-gray-700'>
                <div className='flex justify-between gap-40 border-b-2 border-gray-400'>
                    <h1 className='text-lg font-bold'>Product</h1>
                    <h1 className='text-lg font-bold'>SUBTOTAL</h1>
                </div>
                <div className='flex justify-between gap-40'>
                    <h1 className='text-lg'>Product Description</h1>
                    <h1 className='text-lg'>Price</h1>
                </div>
                <div className='flex justify-between gap-40 border-b-2 border-gray-400 py-4'>
                    <h1 className='text-lg'>Subtotal</h1>
                    <h1 className='text-lg text-red-500'>Rs.9000</h1>
                </div>
                <div className='flex justify-between gap-40'>
                    <h1 className='text-xl font-bold'>Total</h1>
                    <h1 className='text-xl font-bold text-red-500'>Rs.9000</h1>
                </div>
                <div className='flex gap-5'>
                    <input type="radio" name="payment-method" id="" />
                    <label>Credit Card/Debit Card/ Netbanking/UPI By razorpay</label>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Checkout