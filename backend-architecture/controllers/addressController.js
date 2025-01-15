import Address from '../models/Address.js'; 

export const addAddress = async (req, res) => { 
    try {
        const { firstName, lastName, addressLine1, addressLine2, city, state, pincode, contactNumber, email } = req.body;
        const user = req.user.userId;
        // console.log(user);
        // console.log(req.body);
        const address = new Address({ user, firstName, lastName, streetName:addressLine1, apartment:addressLine2, city, state, pincode, contactNo:contactNumber, email });
        await address.save();
        res.status(201).json({ message: 'Address added successfully', address });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getAddress = async (req, res) => {
    try {
        const address = await Address.find({ user: req.user.userId });
        res.status(200).json(address);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateAddress = async (req, res) => {
    try {
        const { addressId } = req.params;
        const { firstName, lastName, streetName, apartment, city, state, pincode, contactNo, email } = req.body;
        const address = await Address.findByIdAndUpdate(addressId, { firstName, lastName, streetName, apartment, city, state, pincode, contactNo, email });
        res.status(200).json(address);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteAddress = async (req, res) => {
    try {
        const { addressId } = req.params;
        await Address.findByIdAndDelete(addressId);
        res.status(200).json({ message: 'Address deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
