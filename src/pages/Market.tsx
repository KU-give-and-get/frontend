import { useEffect, useState } from "react"
import ProductItem from "../components/ProductItem";
import type { Product } from "../type/Product";
import axios from "axios";

// กำหนด type ให้ชัดเจนว่าเป็น string[]
const categories: string[] = ["Clothing", "Study Materials", "Activity Equipment"];

const Market = () => {
  const [showFilter, setShowFilter] = useState<boolean>(false)
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  // เพิ่ม state สำหรับเก็บข้อความที่ใช้ค้นหา
  const [searchText, setSearchText] = useState<string>('');

  const getProducts = async () => {
    try {
      // สมมติว่า Product มี field ชื่อ `name` หรือ `title` ที่จะใช้ค้นหา
      const res = await axios.get<Product[]>("http://localhost:4000/api/products")
      setProducts(res.data)
    } catch (error) {
      console.error("Get products error:", error)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  // ตัวกรองหลักที่รวม Category Filter และ Search Filter เข้าด้วยกัน
  const filteredProducts = products.filter(product => {
    const isCategoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category as string);

    // สมมติว่า Product มี property ชื่อ 'name' หรือ 'description' ที่ใช้ในการค้นหา
    // เราจะแปลงให้เป็นตัวพิมพ์เล็กทั้งหมดเพื่อเปรียบเทียบแบบไม่สนใจตัวพิมพ์ใหญ่-เล็ก (case-insensitive)
    const productSearchField = (product.name || product.description || '').toLowerCase(); // ใช้ .name หรือ .description ตามโครงสร้าง Product ของคุณ
    const lowerCaseSearchText = searchText.toLowerCase().trim();

    // กรองสินค้าตามข้อความค้นหา (ถ้ามี)
    const isSearchMatch = lowerCaseSearchText.length === 0 || productSearchField.includes(lowerCaseSearchText);

    // คืนค่าเป็นจริงก็ต่อเมื่อตรงตามเงื่อนไขของ category *และ* search text
    return isCategoryMatch && isSearchMatch;
  });


  return (
    <div className="flex flex-col sm:flex-row border-t pt-10 gap-10">
      <div>
        <label onClick={() => setShowFilter(!showFilter)} className="flex items-center gap-2 text-xl cursor-pointer">
          FILTERS
          <img className={`h-4 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src="/images/dropdown_icon.png" alt="" />
        </label>

        {/* filter */}
        <div className={`border-gray-300 border pl-5 py-3 mt-6 pr-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="py-2">CATEGORIES</p>
          <div className="flex flex-col gap-2 font-light text-gray-700">
            {categories.map((cat: string) => (
              <label key={cat} className="flex gap-2">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* products */}
      <div className="flex-1">
        {/* Search Bar ถูกเพิ่มตรงนี้ */}
        <input
          type="text"
          placeholder="Search products..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {/* สิ้นสุด Search Bar */}

        <p className="text-3xl text-gray-500 font-light">All <span className="text-gray-700 font-medium">Items</span></p>

        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {filteredProducts.map((item, index) => (
            <ProductItem key={index} item={item}/>
          ))}
          {/* เพิ่มการแสดงผลถ้าไม่มีสินค้าที่ตรงตามเงื่อนไข */}
          {filteredProducts.length === 0 && (
            <p className="col-span-full text-center text-gray-500 mt-10">
              No products found matching your criteria.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Market;