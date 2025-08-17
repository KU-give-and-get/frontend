import { useEffect, useState } from "react"
import ProductItem from "../components/ProductItem";
import type { Product } from "../type/Product";
import axios from "axios";
const Market = () => {
  const [showFilter, setShowFilter] = useState<boolean>(false)
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = async () => {
    try {
      const res = await axios.get<Product[]>("http://localhost:4000/api/products")
      setProducts(res.data)
    } catch (error) {
      console.error("Get products error:", error)
    }
  }

  useEffect(() => {
    getProducts()
  },[])



  return (
    <div className="flex flex-col sm:flex-row border-t pt-10 gap-10">
      <div>
        <label onClick={() => {setShowFilter(!showFilter)}} className="flex items-center gap-2 text-xl cursor-pointer">FILTERS
          <img className={`h-4 sm:hidden ${showFilter? 'rotate-90': ''}`} src="/images/dropdown_icon.png" alt="" />
        </label>
        {/* filter */}
        <div className={`border-gray-300 border pl-5 py-3 mt-6 pr-5 ${showFilter? '': 'hidden'} sm:block`}>
          <p className="py-2">CATEGORIES</p>
          <div className="flex flex-col gap-2 font-light text-gray-700">
            <label className="flex gap-2">
              <input type="checkbox"/>
              Clothing
            </label>
            <label className="flex gap-2">
              <input type="checkbox"/>
              Study Materials
            </label>
            <label className="flex gap-2">
              <input type="checkbox"/>
              Activity Equipment
            </label>
          </div>
        </div>
      </div>

        {/* products */}
      <div className="flex-1">
        <p className="text-3xl text-gray-500 font-light">All <span className="text-gray-700 font-medium">Items</span></p>
        
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {products.map((item, index) => (
            <ProductItem key={index} item={item}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Market
