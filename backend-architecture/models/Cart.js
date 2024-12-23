import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{
    productId:{
     type: mongoose.Schema.Types.ObjectId, ref: 'Product'
    },
    quantity:{
      type:Number
    }
   }],
  totalPrice: { type: Number, required: true },
});

export default mongoose.model('Cart', CartSchema);