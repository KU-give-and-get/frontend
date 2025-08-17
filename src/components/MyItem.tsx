import React from 'react'
import type { Product } from "../type/Product";
import axios from 'axios';

type Props = {
  item: Product
  onDelete: (id: string) => void
}

const MyItem: React.FC<Props> = ({item, onDelete}) => {

const handleDeletProduct = async (productId: string) => {
  try {
    const token = localStorage.getItem('token')
    if(!token) {
      alert("Please login first");
      return;
    }

      const res = await axios.delete(`http://localhost:4000/api/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log(res.data.message);

    onDelete(productId)
  } catch (error: any) {
     console.error("Delete product error:", error.response?.data || error.message);
  }
}

return (
    <div className="grid grid-cols-[80px_1fr_120px_120px] gap-4 items-center border-b px-4 py-3 text-sm border-gray-200 mx-4">
      {/* Image */}
      <img
        src={item.imageUrl[0]}
        alt={item.name}
        className="w-16 h-16 object-cover rounded"
      />

      {/* Name */}
      <p className="truncate">{item.name}</p>

      {/* Status */}
      <p
        className={`font-medium ${
          item.status === 'available' ? 'text-green-600' :
          item.status === 'reserved' ? 'text-yellow-600' :
          'text-gray-500'
        }`}
      >
        {item.status}
      </p>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600">
          Edit
        </button>
        <button 
          className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
          onClick={() => handleDeletProduct(item._id)}
        
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default MyItem
