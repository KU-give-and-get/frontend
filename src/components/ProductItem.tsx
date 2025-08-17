import { Link } from 'react-router-dom';
import type { Product } from '../type/Product';

type Props = {
  item: Product
}

const ProductItem: React.FC<Props> = ({item}) => {
  return (
    <Link className="border p-4  shadow border-gray-300" to={`/market/${item._id}`}>
      <img src={item.imageUrl[0]} alt={item.name} className="w-full h-40 object-cover mb-2" />
      <h2 className="font-bold text-lg truncate">{item.name}</h2>
      <p className={`
        text-xs text-gray-500 mt-2`}>Status: <span className={`
          px-2 py-0.5 rounded-3xl
          ${item.status === 'available'? 'bg-green-100 text-green-700':''}
          ${item.status === 'reserved'? 'bg-yellow-100 text-yellow-700':''}
          ${item.status === 'completed'? 'bg-gray-200 text-gray-600':''}`
        }>{item.status}</span></p>
    </Link>
  );
}

export default ProductItem
