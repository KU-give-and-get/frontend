import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import type { Product } from "../type/Product"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetail = () => {
  const {productId} = useParams()
  const [productData, setProductData] = useState<Product | null>(null)
  const [selectedImage, setSelectedImage] = useState<string>()
  const [status, setStatus] = useState<string>('')
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const navigate = useNavigate()

  
  const getProductsByID = async () => {
    try {
      const res = await axios.get<Product>(`http://localhost:4000/api/products/${productId}`);

      if (res.status === 200 && res.data) {
        setProductData(res.data); 
        setSelectedImage(res.data.imageUrl[0])
        setStatus(res.data.status)
      } else {
        console.warn("Product not found or unexpected response:", res);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  }

  const handleReserve = async (quantity: number) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      return;
    }

    const res = await axios.post(
      "http://localhost:4000/api/reservations",
      {
        productId: productId,
        requestedQuantity: quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (res.data) {
      toast.success("Product reserved successfully ✅");
      setStatus("reserved"); // อัปเดต status ใน frontend
    }
  } catch (error: any) {
    toast.error("Failed to reserve product ❌");
    console.error("Reserve product error:", error.response?.data || error.message);
  }
};

  const handleContactDonor = async (donorId: string) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        alert("Please login first")
        return
      }
      const res = await axios.post(
        'http://localhost:4000/api/conversations',
        {"memberId": donorId},
        {
          headers:{
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      )

      if (res.data) {
        navigate(`/chat/${res.data._id}`)
      }
    } catch (error) {
      console.error("Error creating conversation:", error);
      alert("Failed to contact donor. Please try again.");
    }
  }

  
  useEffect(() => {
    getProductsByID()
  },[productId])

  const formatDateTime = (dateStr: string):string => 
    new Date(dateStr).toLocaleDateString("en-GB",{
      year:"numeric",
      month:"long",
      day:"numeric",
  })

  let buttonText = '';
  switch (status) {
    case 'available':
      buttonText = 'RESERVE PRODUCT';
      break;
    case 'reserved':
      buttonText = 'RESERVED';
      break;
    case 'completed':
      buttonText = 'DELIVERED';
      break;
  }

  const disabled = status !== 'available';
  

  return productData ? (
  <div className="border-t-2 pt-10">
    {/* product section */}
    <div className="flex flex-col sm:flex-row gap-12">

      {/* image section */}
      <div className="flex-1 flex flex-col items-center p-4 gap-4">
        {/* รูปหลัก */}
        <div className="w-full max-w-md aspect-square overflow-hidden rounded-lg shadow-md bg-white">
          <img
            src={selectedImage}
            alt="Product"
            className="w-full h-full object-cover transition duration-300"
          />
        </div>

        {/* แถว thumbnail */}
        <div className="flex gap-2 mt-2">
          {productData.imageUrl.map((imageUrl, index) => (
            <img
              key={index}
              src={imageUrl}
              onClick={() => setSelectedImage(imageUrl)}
              className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 transition duration-300 ${
                selectedImage === imageUrl ? 'border-blue-500' : 'border-transparent'
              } hover:opacity-80`}
              alt={`Thumbnail ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* product detail section */}
      <div className="flex-1 p-4 space-y-4">
        <div>
          <h1 className="font-bold text-2xl mb-1">{productData.name}</h1>
          <p className="text-sm text-gray-500">{formatDateTime(productData.createdAt)}</p>
        </div>

        <p className="text-gray-700">{productData.description}</p>
        <div className="flex gap-2 items-center">
          <img src="/images/location_logo.png" alt=""  className="w-[16px] h-5"/>
          <p className="text-gray-700">{productData.location}</p>
        </div>

        {/* ✅ เพิ่ม quantity selector */}
        <div className="flex gap-2 items-center">
          <span className="font-semibold text-gray-800">Quantity:</span>
          <span className="text-gray-700">{productData.quantity}</span>
        </div>

        <div className="flex flex-wrap gap-4 items-center mt-4">
        {/* เลือกจำนวนที่ต้องการรับ */}
        <div className="flex items-center gap-2">
          <label htmlFor="selectedQuantity" className="font-medium text-gray-800">
            ต้องการรับ:
          </label>
          <input
            id="selectedQuantity"
            type="number"
            min={1}
            max={productData.quantity}
            value={selectedQuantity}
            onChange={(e) => setSelectedQuantity(Number(e.target.value))}
            className="w-20 border rounded px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        {/* ปุ่มรับสินค้า */}
        <button
          onClick={() => handleReserve(selectedQuantity)}
          disabled={disabled}
          className={`px-6 py-2 rounded-lg text-sm font-medium transition
            ${
              status === "available"
                ? "bg-black text-white hover:bg-gray-800 active:bg-gray-700 cursor-pointer"
                : "bg-gray-300 text-gray-600 cursor-not-allowed opacity-70"
            }`}
        >
          {status === "available" ? `รับ ${selectedQuantity} ชิ้น` : buttonText}
        </button>
      </div>


      <hr className="mt-8 sm:w-4/5 border-gray-300" />

      {/* contact section */}
      <div className="space-y-4 mt-4">
        <h2 className="font-semibold text-lg">Contact</h2>
        <div className="flex gap-2">
          <img src="/images/telephone_logo.png" alt="" className="w-[20px]" />
          <p className="text-sm text-gray-600">Tel: <span>0656546</span></p>
        </div>
        <div className="flex gap-2">
          <img src="/images/instagram_logo.png" alt="" className="w-[20px]" />
          <p className="text-sm text-gray-600">Instagram: <span>@tassLL</span></p>
        </div>
        <div className="flex gap-2">
          <img src="/images/facebook_logo.png" alt="" className="w-[20px]" />
          <p className="text-sm text-gray-600">Facebook: <span>helo idk</span></p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-2">
          <p className="text-gray-700 font-semibold">Other:</p>
          <p className="text-sm text-gray-600 leading-relaxed">{productData.contact?.others}</p>
        </div>

        {/* ปุ่ม Contact Donor */}
        <button
          onClick={() => handleContactDonor(productData?.donorId!)}
          className="block mx-auto px-6 py-2.5 text-sm sm:text-base font-medium rounded-lg transition bg-black text-white hover:bg-gray-800 active:bg-gray-700"
        >
          Contact Donor
        </button>
      </div>


      </div>
    </div>
    
    <ToastContainer position="top-right" autoClose={2000} />
  </div>
) : <div className="opacity-0"></div>
}

export default ProductDetail
