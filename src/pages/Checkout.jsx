import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAddresses, addAddress } from '../Store/slices/addressSlice';
import { getCart } from '../Store/slices/productSlice';
import { toast } from 'react-toastify';
import { use } from 'react';
import { placeOrder } from '../Store/slices/orderSlice';
import { emptyCart } from '../Store/slices/productSlice';
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
    // console.log(cart)

    
    const user = localStorage.getItem('user');
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
        // console.log(address, index);
    }
    const loadRazorpayScript = async () => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => { };
        document.body.appendChild(script);
    };
    React.useEffect(() => {
        loadRazorpayScript();
    }, []);
    console.log("cart", cart)
    const handleOrder = async () => {
        if (cart.products.length === 0) {
            toast.error("Please add product to cart.")
            return;
        }
        if (selectedAddress === null) {
            toast.error("Please select an address.");
            return;
        }
        const products = cart.products.map((product) => ({
            product: product.productId._id,
            quantity: product.quantity,
            price: product.productId.price,
            customText: product.customText,
            images: product.images,
        }));
        const totalPrice = cart.products.reduce((acc, item) => acc + item.productId.price * item.quantity, 0);
        const address = addresses[selectedAddress]._id;
        const data = { products, totalPrice, address };
        const res = await dispatch(placeOrder(data));
        if (res.type === 'order/placeOrder/fulfilled') {
            initPayment(res.payload.payment);
        }
        // console.log(res);
    }

    const initPayment = async (data) => {
        const options = {
            key: 'rzp_test_S7O9aeETo3NXrl',
            amount: data.amount,
            currency: data.currency,
            order_id: data.id,
            name: "Nyouta",
            description: "Payment for your order",
            prefill: {
                name: user.name,
                email: user.email,
            },
            theme: {
                color: "#3399cc",
            },
            handler: async (response) => {
                // console.log(response);
                try {
                    const verifyUrl = `${BASE_URL}/order/verify-payment`;
                    const verifyData = {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                    };
                    const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
                    try {
                        if (!localStorage.getItem('token')) {
                            toast.error("Please login to continue");
                            return;
                        }
                        const res = await axios.post(verifyUrl, verifyData, { headers });
                        if (res.status === 200) {
                            dispatch(emptyCart());
                            toast.success("Payment Successful");
                            //   window.location.reload();
                        }
                    } catch (err) {
                        toast.error(err.response.data.message);
                    }
                } catch (err) {
                    // console.log(err);
                }
            },
        }
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    }

    
    return (
        <div className="flex flex-col-reverse lg:flex-row justify-between gap-8 p-4 md:p-6 lg:p-8 bg-gray-50">
  {/* Billing Details Section */}
  <div className="w-full lg:w-[58%] bg-white rounded-2xl shadow-2xl p-6 md:p-8">
    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-6 border-b pb-3">
      Billing Details
    </h1>
    {addresses.length > 0 && !showForm && (
      <div className="mt-4">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Saved Addresses
        </h2>
        <ul className="space-y-4">
          {addresses.map((address, index) => (
            <li
              key={index}
              className={`p-5 border-2 rounded-xl transition-all duration-200 ${
                selectedAddress === index
                  ? "border-blue-500 bg-blue-50 shadow-md"
                  : "border-gray-200 hover:border-blue-300"
              }`}
            >
              <label className="flex items-start gap-4 cursor-pointer">
                <input
                  type="radio"
                  name="selectedAddress"
                  checked={selectedAddress === index}
                  onChange={() => handleAddressSelection(address, index)}
                  className="mt-1.5 h-5 w-5 text-blue-600 focus:ring-blue-500"
                />
                <div className="flex-1">
                  <p className="text-gray-800 font-semibold">{`${address.firstName} ${address.lastName}`}</p>
                  <p className="text-gray-600 text-sm">
                    {`${address.streetName}, ${address.apartment}`}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {`${address.city}, ${address.state} - ${address.pincode}`}
                  </p>
                  <p className="text-gray-600 text-sm mt-1">
                    {`Contact: ${address.contactNo}`}
                  </p>
                </div>
              </label>
            </li>
          ))}
        </ul>
        <button
          onClick={() => setShowForm(true)}
          className="w-full md:w-auto bg-amber-600 text-white py-3 px-6 rounded-xl mt-6 hover:bg-amber-900 transition-colors font-medium text-base shadow-lg"
        >
          Add New Address
        </button>
      </div>
    )}

    {(addresses.length === 0 || showForm) && (
     <div className="mt-6">
     <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
       {/* First and Last Name in one row */}
       <div className="grid grid-cols-2 gap-4">
         <div className="space-y-1">
           <label className="text-sm font-medium text-gray-700">First Name *</label>
           <input
             value={formData.firstName}
             onChange={handleChange}
             name="firstName"
             type="text"
             required
             className="w-full py-2 px-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
           />
         </div>
         <div className="space-y-1">
           <label className="text-sm font-medium text-gray-700">Last Name *</label>
           <input
             value={formData.lastName}
             onChange={handleChange}
             name="lastName"
             type="text"
             required
             className="w-full py-2 px-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
           />
         </div>
       </div>
   
       {/* Street Address in one row */}
       <div className="grid grid-cols-2 gap-4">
         <div className="space-y-1">
           <label className="text-sm font-medium text-gray-700">Street Address *</label>
           <input
             value={formData.addressLine1}
             onChange={handleChange}
             name="addressLine1"
             type="text"
             required
             placeholder="House number and street name"
             className="w-full py-2 px-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
           />
         </div>
         <div className="space-y-1">
           <label className="text-sm font-medium text-gray-700">Apartment/Suite</label>
           <input
             value={formData.addressLine2}
             onChange={handleChange}
             name="addressLine2"
             type="text"
             placeholder="Apartment, suite, etc."
             className="w-full py-2 px-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
           />
         </div>
       </div>
   
       {/* City, State, and Pincode arranged in two columns */}
       <div className="grid grid-cols-2 gap-4">
         <div className="space-y-1">
           <label className="text-sm font-medium text-gray-700">City *</label>
           <input
             value={formData.city}
             onChange={handleChange}
             name="city"
             type="text"
             required
             className="w-full py-2 px-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
           />
         </div>
         <div className="space-y-1">
           <label className="text-sm font-medium text-gray-700">State *</label>
           <select
             value={formData.state}
             onChange={handleChange}
             name="state"
             className="w-full py-2 px-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
           >
             <option value="">Select State</option>
             {indianStates.map((state) => (
               <option key={state} value={state}>
                 {state}
               </option>
             ))}
           </select>
         </div>
         {/* Pincode on its own row spanning both columns */}
         <div className="space-y-1 col-span-2">
           <label className="text-sm font-medium text-gray-700">Email *</label>
           

<input
             value={formData.email}
             onChange={handleChange}
             name="email"
             type="email"
             required
             className="w-full py-2 px-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
           />
         </div>
       </div>
   
       {/* Contact Number and Email in one row */}
       <div className="grid grid-cols-2 gap-4">
         <div className="space-y-1">
           <label className="text-sm font-medium text-gray-700">Contact Number *</label>
           <input
             value={formData.contactNumber}
             onChange={handleChange}
             name="contactNumber"
             type="tel"
             required
             className="w-full py-2 px-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
           />
         </div>
         <div className="space-y-1">
           <label className="text-sm font-medium text-gray-700">Pincode *</label>
           <input
             value={formData.pincode}
             onChange={handleChange}
             name="pincode"
             type="text"
             required
             className="w-full py-2 px-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
           />
         </div>
       </div>
   
       {/* Buttons */}
       <div className="flex flex-col md:flex-row gap-4 mt-6">
         <button
           type="submit"
           className="w-full md:w-auto bg-amber-600 text-white py-3 px-8 rounded-xl hover:bg-amber-700 transition-colors font-semibold shadow-lg"
         >
           Save Address
         </button>
         <button
           type="button"
           onClick={() => setShowForm(false)}
           className="w-full md:w-auto bg-gray-500 text-white py-3 px-8 rounded-xl hover:bg-gray-600 transition-colors font-semibold shadow-lg"
         >
           Cancel
         </button>
       </div>
     </form>
   </div>
   
    )}
  </div>

  {/* Order Summary Section */}
  <div className="w-full lg:w-[38%] bg-white rounded-2xl shadow-2xl p-6 md:p-8 h-fit">
    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-6 border-b pb-3">
      Your Order
    </h1>
    <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
      {cart?.products?.map((product) => (
        <div
          key={product.productId._id}
          className="flex items-center gap-4 py-3 border-b border-gray-100"
        >
          <img
            src={product.productId.image[0]}
            alt={product.productId.name}
            className="w-16 h-16 object-cover rounded-xl"
          />
          <div className="flex-1">
            <p className="font-semibold text-gray-800 line-clamp-1">
              {product.productId.name}
            </p>
            <p className="text-sm text-gray-500">
              Quantity: {product.quantity}
            </p>
          </div>
          <p className="font-medium text-gray-700">
            ₹{(product.productId.price * product.quantity).toFixed(2)}
          </p>
        </div>
      ))}
    </div>

    <div className="space-y-4 mt-6">
      <div className="flex justify-between items-center">
        <span className="text-gray-600">Subtotal</span>
        <span className="font-medium text-gray-800">
          ₹
          {cart?.products
            ?.reduce(
              (acc, item) => acc + item.productId.price * item.quantity,
              0
            )
            .toFixed(2) || 0}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-600">Shipping</span>
        <span className="font-medium text-green-600">Free</span>
      </div>
    </div>

    <div className="border-t border-gray-200 mt-6 pt-6">
      <div className="flex justify-between items-center mb-6">
        <span className="font-semibold text-lg text-gray-800">Total</span>
        <span className="font-bold text-xl text-blue-600">
          ₹
          {cart?.products
            ?.reduce(
              (acc, item) => acc + item.productId.price * item.quantity,
              0
            )
            .toFixed(2) || 0}
        </span>
      </div>
      <button
        onClick={handleOrder}
        className="w-full bg-amber-600 text-white py-3.5 px-6 rounded-xl hover:bg-amber-900 transition-colors font-semibold text-base shadow-xl"
      >
        Place Order
      </button>
    </div>
  </div>
</div>


    );
};

export default Checkout;
