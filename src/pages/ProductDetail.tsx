import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import type { Product } from "../type/Product"
import axios from "axios"

const ProductDetail = () => {
  const {productId} = useParams()
  const [productData, setProductData] = useState<Product | null>(null)
  const [selectedImage, setSelectedImage] = useState<string>()

  
  const getProductsByID = async () => {
try {
  const res = await axios.get<Product>(`http://localhost:4000/api/products/${productId}`);

  if (res.status === 200 && res.data) {
    setProductData(res.data); 
    setSelectedImage(res.data.imageUrl[0])
  } else {
    console.warn("Product not found or unexpected response:", res);
  }
} catch (error) {
  console.error("Error fetching product:", error);
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
          <p className="text-gray-700">กรุงเทพ</p>
        </div>

        <button className="bg-black text-white px-8 py-2 text-sm rounded hover:bg-gray-800 active:bg-gray-700 transition">
          RESERVE PRODUCT
        </button>

        <hr className="mt-8 sm:w-4/5 border-gray-300" />

        <div className="space-y-1 mt-4">
          <h2 className="font-semibold text-lg">Contact</h2>
          <div className="flex gap-2">
            <img src="/images/telephone_logo.png" alt="" className="w-[20px]"/>
            <p className="text-sm text-gray-600">Tel:  <span>0656546</span></p>
          </div>
          <div className="flex gap-2">
            <img src="/images/instagram_logo.png" alt="" className="w-[20px]"/>
            <p className="text-sm text-gray-600">Instagram:  <span>@tassLL</span></p>
          </div>
          <div className="flex gap-2">
            <img src="/images/facebook_logo.png" alt="" className="w-[20px]"/>
            <p className="text-sm text-gray-600">Facebook: <span>helo idk</span></p>
          </div>
          <div className="mt-4 bg-gray-50 p-4 rounded-lg shadow-sm space-y-2">
            <p className="text-gray-700 font-semibold">Other:</p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque fugiat soluta, at repellendus cupiditate doloribus odio id repellat hic consequatur!
            </p>
          </div>

        </div>

      </div>
    </div>
    
  </div>
) : <div className="opacity-0"></div>
}

export default ProductDetail
