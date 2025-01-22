import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    id: { 
      type: String, 
      required: true 
    },
    name: { 
      type: String, 
      required: true 
    },
    sku: { 
      type: String, 
      required: true 
    },
    image: { 
      type: [String], 
      required: true 
    },
    price: { 
      type: Number, 
      required: true 
    },
    tags: { 
      type: [String], 
      required: true 
    },
    category: { 
      type: String, 
      required: true 
    },
    type:{
      type: String,
      required: true
    },
    subCategory: { 
      type: String, 
      required: true 
    },
    subSubCategory: { 
      type: String, 
      required: true 
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
);

export default mongoose.model('Product', ProductSchema);
