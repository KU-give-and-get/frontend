import React, { useState } from 'react'
import type { Product } from "../type/Product";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

type Props = {
  item: Product
  onDelete: (id: string) => void
}

const MyItem: React.FC<Props> = ({item, onDelete}) => {
  const navigate = useNavigate()
  const [status, setStatus] = useState<string>(item.status)

  const handleDeletProduct = async (productId: string) => {
    try {
      const token = localStorage.getItem('token')
      if(!token) {
        toast.error("Please login first");
        return;
      }

      const res = await axios.delete(`http://localhost:4000/api/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log(res.data.message);
      onDelete(productId);
      toast.success("Deleted Item successfully ✅");

    } catch (error: any) {
      console.error("Delete product error:", error.response?.data || error.message);
      toast.error("Failed to delete product ❌");
    }
  }


  const handleStatusChange = async (newStatus: string) => {
    try {
      const token = localStorage.getItem('token')
      if(!token) {
        alert("Please login first");
        return;
      }

      const res  = await axios.patch(
        `http://localhost:4000/api/products/${item._id}/status`,
        {status: newStatus},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )

      setStatus(res.data.status)

    } catch (error: any) {
      console.error("Update status error:", error.response?.data || error.message);
    }
  }

  return (
    <div className="grid grid-cols-[80px_1fr_120px_180px] gap-4 items-center border-b px-4 py-3 text-sm border-gray-200 mx-4">
      {/* Image */}
      <img
        src={item.imageUrl[0]}
        alt={item.name}
        className="w-16 h-16 object-cover rounded"
      />

      {/* Name */}
      <p className="truncate">{item.name}</p>

      {/* Status */}
      <select
        value={status}
        onChange={(e) => handleStatusChange(e.target.value)}
        className={`font-medium text-sm rounded border px-2 py-1 
          ${
            status === 'available' ? 'text-green-600 border-green-400' :
            status === 'reserved' ? 'text-yellow-600 border-yellow-400' :
            'text-gray-500 border-gray-400'
          }
        `}
      >
        <option value="available" className='text-green-600 border-green-400'>available</option>
        <option value="reserved" className='text-yellow-600 border-yellow-400'>reserved</option>
        <option value="completed" className='text-gray-500 border-gray-400'>completed</option>
      </select>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button 
          className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
          onClick={() => navigate(`/edit/${item._id}`)}
        >
          Edit
        </button>
        <button 
          className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
          onClick={() => handleDeletProduct(item._id)}
        >
          Delete
        </button>
        <button 
          className="px-2 py-1 bg-purple-500 text-white rounded text-xs hover:bg-purple-600"
          onClick={() => navigate(`/reservation/${item._id}`)}
        >
          Reservations
        </button>
      </div>
    </div>
  );
}

export default MyItem
