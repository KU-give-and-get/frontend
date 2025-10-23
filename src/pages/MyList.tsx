import MyItem from "../components/MyItem";
import type { Product } from "../type/Product";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const MyList = () => {

    const [myProducts, setMyProducts] = useState<Product[]>([]);

    const handleDelete = (id: string) => {
      setMyProducts(prev => prev.filter(product => product._id !== id))
    }

    const getProductByDonorId = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          alert("Please login first");
          return;
        }

    const res = await axios.get<Product[]>(
      'http://localhost:4000/api/products/my-products',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

        setMyProducts(res.data)
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }

    useEffect(() => {
      getProductByDonorId();
    },[])

  return (
    <div className="border-t pt-10">
      <div className="border-3 rounded border-gray-200 pb-10">
        {/* Header */}
        <div className=" grid grid-cols-[80px_1fr_120px_120px] gap-4 bg-gray-100 px-8 py-2 text-sm font-semibold">
          <p>Image</p>
          <p>Product Name</p>
          <p>Status</p>
          <p>Actions</p>
        </div>

        {/* Items */}
        {myProducts.map((item,index) => (
          <MyItem key={index} item={item} onDelete={handleDelete}/>
        ))}

        {/* button */}
        <Link to='/create' className="flex justify-end px-4 py-4">
          <button className="bg-black text-white px-8 py-2 text-sm rounded hover:opacity-80">
            + SHARING
          </button>
        </Link>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>

  )
}

export default MyList
