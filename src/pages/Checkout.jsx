import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAddresses, addAddress } from '../Store/slices/addressSlice';
import {getCart} from '../Store/slices/productSlice';
import { toast } from 'react-toastify';
import { use } from 'react';
import { placeOrder } from '../Store/slices/orderSlice';
import axios from 'axios';
import { BASE_URL } from '../utils/api';

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
    'Puducherry',
];

const Checkout = () => {
    const dispatch = useDispatch();
    const [selectedAddress, setSelectedAddress] = useState(null);
    const { addresses, loading } = useSelector((state) => state.address);
    const { cart } = useSelector((state) => state.product);
    const user=localStorage.getItem('user');
    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);
    useEffect(() => {
        if (!addresses.length) {
            dispatch(getAddresses());
        }
    }, [dispatch]);

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

    const [showForm, setShowForm] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.state) {
            toast.error("Please select a state.");
            return;
        }
        if (!/^\d{6}$/.test(formData.pincode)) {
            toast.error("Please enter a valid 6-digit pincode.");
            return;
        }
        if (!/^\d{10}$/.test(formData.contactNumber)) {
            toast.error("Please enter a valid 10-digit phone number.");
            return;
        }

        dispatch(addAddress(formData));
        setShowForm(false);
        setFormData({
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
    };
 const handleAddressSelection = (address, index) => {
    setSelectedAddress(index);
    console.log(address, index);
 }
 const loadRazorpayScript = async () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {};
    document.body.appendChild(script);
  };
   React.useEffect(() => {
      loadRazorpayScript();
    }, []);

    const handleOrder = async() => { 
        if (selectedAddress === null) {
            toast.error("Please select an address.");
            return;
        }
        const products = cart.products.map((product) => ({
            product: product.productId._id,
            quantity: product.quantity,
            price: product.productId.price,
        }));
        const totalPrice = cart.products.reduce((acc, item) => acc + item.productId.price*item.quantity, 0);
        const address = addresses[selectedAddress]._id;
        const data={ products, totalPrice, address };
        const res=await dispatch(placeOrder(data));
        if(res.type==='order/placeOrder/fulfilled') {
            initPayment(res.payload.payment);
        }
        console.log(res);
    }

    const initPayment = async (data) => {
        const options = {
            key: 'rzp_test_S7O9aeETo3NXrl',
            amount: data.amount,
            currency: data.currency,
            order_id: data.id,
            name: "Nyouta",
            description: "Payment for your order",
            prefill:{
                name: user.name,
                email: user.email,
            },
            theme: {
                color: "#3399cc",
            },
             handler: async (response) => {
                    console.log(response);
                    try {
                      const verifyUrl = `${BASE_URL}/order/verify-payment`;
                      const verifyData = {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                      };
                      const headers = {Authorization: `Bearer ${localStorage.getItem('token')}`};
                      try {
                        if(!localStorage.getItem('token')) {
                            toast.error("Please login to continue");
                            return;
                        }
                        const res = await axios.post(verifyUrl, verifyData, { headers });
                        if (res.status === 200) {
                          toast.success("Payment Successful");
                        //   window.location.reload();
                        }
                      } catch (err) {
                        toast.error(err.response.data.message);
                      }
                    } catch (err) {
                      console.log(err);
                    }
                  },
        }
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    }
    return (
        <div className='flex flex-col-reverse lg:flex-row justify-evenly'>
            <div className='mx-4 my-4 lg:w-[50%]'>
                <h1 className='text-xl font-bold'>Billing Details</h1>
                {addresses.length > 0 && !showForm && (
                    <div className='mt-4'>
                        <h2 className='text-lg font-semibold'>Saved Addresses</h2>
                        <ul className='list-disc pl-5'>
                            {addresses.map((address, index) => (
                                <li key={index} className='mb-2'>
                                    <input
                                        type="radio"
                                        name="selectedAddress"
                                        checked={selectedAddress === index}
                                        onChange={() => handleAddressSelection(address, index)}
                                        className="mr-2"
                                    />
                                    <p>{`${address.firstName} ${address.lastName}, ${address.streetName}, ${address.apartment},${address.city}, ${address.state}, ${address.pincode}`}</p>
                                    <p>{`Contact: ${address.contactNo}`}</p>
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={() => setShowForm(true)}
                            className='bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-700'
                        >
                            Add New Address
                        </button>
                    </div>
                )}
                {(addresses.length === 0 || showForm) && (
                    <div className='mt-4'>
                        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                            <div className='flex flex-col gap-1'>
                                <label>First Name *</label>
                                <input
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    name='firstName'
                                    className='py-2 border-2 px-4 rounded-lg'
                                    type='text'
                                    required
                                    placeholder='Enter your first name'
                                />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label>Last Name *</label>
                                <input
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    name='lastName'
                                    className='py-2 border-2 px-4 rounded-lg'
                                    type='text'
                                    required
                                    placeholder='Enter your last name'
                                />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label>Street Address *</label>
                                <input
                                    value={formData.addressLine1}
                                    onChange={handleChange}
                                    name='addressLine1'
                                    className='py-2 border-2 px-4 rounded-lg'
                                    type='text'
                                    required
                                    placeholder='House number and street name'
                                />
                                <input
                                    value={formData.addressLine2}
                                    onChange={handleChange}
                                    name='addressLine2'
                                    className='py-2 border-2 px-4 rounded-lg'
                                    type='text'
                                    placeholder='Apartment, suite, etc.'
                                />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label>City *</label>
                                <input
                                    value={formData.city}
                                    onChange={handleChange}
                                    name='city'
                                    className='py-2 border-2 px-4 rounded-lg'
                                    type='text'
                                    required
                                    placeholder='Enter your city'
                                />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label>State *</label>
                                <select
                                    value={formData.state}
                                    onChange={handleChange}
                                    name='state'
                                    className='border-2 py-2 px-4 rounded-lg'
                                >
                                    <option value=''>Select a state</option>
                                    {indianStates.map((state) => (
                                        <option key={state} value={state}>
                                            {state}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label>Pincode *</label>
                                <input
                                    value={formData.pincode}
                                    onChange={handleChange}
                                    name='pincode'
                                    className='py-2 border-2 px-4 rounded-lg'
                                    type='text'
                                    required
                                    placeholder='Enter your pincode'
                                />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label>Contact Number *</label>
                                <input
                                    value={formData.contactNumber}
                                    onChange={handleChange}
                                    name='contactNumber'
                                    className='py-2 border-2 px-4 rounded-lg'
                                    type='tel'
                                    required
                                    placeholder='Enter your contact number'
                                />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label>Email *</label>
                                <input
                                    value={formData.email}
                                    onChange={handleChange}
                                    name='email'
                                    className='py-2 border-2 px-4 rounded-lg'
                                    type='email'
                                    required
                                    placeholder='Enter your email'
                                />
                            </div>
                            <div className='flex gap-4'>
                                <button
                                    type='submit'
                                    className='bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700'
                                >
                                    Save Address
                                </button>
                                <button
                                    type='button'
                                    onClick={() => setShowForm(false)}
                                    className='bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-700'
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
            <div className='m-4 lg:w-[45%]'>
                <h1 className='text-xl font-bold'>Your Order</h1>
                {/* Order details */}
                {cart?.products?.map((product) => (
                    <div key={product.productId._id} className='flex justify-between mt-4'>
                        <img
                            src={product.productId.image[0]}
                            alt={product.productId.name}
                            className='w-16 h-16 object-cover'
                        />
                        <p>{product.productId.name}</p>
                        <p>{`$${product.productId.price} x ${product.quantity}`}</p>
                    </div>
                ))}
                <div className='flex justify-between mt-4'>
                    <p>Items</p>
                    <p>{cart?.products?.length}</p>
                </div>
                <div className='flex justify-between mt-4'>
                    <p>Shipping</p>
                    <p>Free</p>
                </div>
                <div className='flex justify-between mt-4'>
                    <p>Subtotal</p>
                    <p>{`$${cart?.products?.reduce((acc, item) => acc + item.productId.price*item.quantity, 0)}`}</p>
                </div>

                <button className='bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-700' onClick={handleOrder}>
                    Place Order
                </button>
                {/* <button className='bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-700'>
                    Place Order via Phone Pe
                </button> */}
            </div>
        </div>
    );
};

export default Checkout;
