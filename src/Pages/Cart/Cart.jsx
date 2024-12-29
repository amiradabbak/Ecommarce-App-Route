import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/Cart.context";
import { Link } from "react-router-dom";
import { WishListContext } from "../../Context/WishList.context";
import { FiHeart, FiShoppingCart } from "react-icons/fi";

export default function ProductCard({ productDetails }) {
  const { images, title, price, ratingsAverage, category, _id, priceAfterDiscount } = productDetails;
  const { addProductToCart } = useContext(CartContext);
  const { addProductToWishlist, removeItemWishList, favouriteItems } = useContext(WishListContext);
  const [favHeart, setFavHeart] = useState(null);

  useEffect(() => {
    if (favouriteItems) setFavHeart(favouriteItems);
  }, [favouriteItems]);

  const handleWishlistToggle = () => {
    if (favHeart) {
      if (favHeart.includes(_id)) {
        removeItemWishList(_id);
        setFavHeart(favHeart.filter((id) => id !== _id));
      } else {
        addProductToWishlist({ productId: _id });
        setFavHeart([...favHeart, _id]);
      }
    }
  };

  return (
    <div className="border border-gray-100 rounded p-2 bg-white hover:shadow-md transition-shadow duration-300">
      <div className="relative">
        {/* Cart and Wishlist buttons */}
        <div className="absolute top-2 left-2 flex flex-col gap-2 z-10">
          <button
            onClick={() => addProductToCart({ productId: _id })}
            className=" text-white p-2 rounded-md hover:bg-green-600 transition-colors"
          >
            <FiShoppingCart size={20} />
          </button>
          <button
            onClick={handleWishlistToggle}
            className="bg-white p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            <FiHeart 
              size={20}
              className={favHeart && favHeart.includes(_id) ? "text-red-500" : "text-gray-400"} 
            />
          </button>
        </div>
        
        {/* Product Image */}
        <img 
          src={images[0]} 
          alt={title} 
          className="w-full h-[200px] object-cover rounded"
        />
      </div>

      {/* Product Details */}
      <div className="mt-3 space-y-2">
        {/* Category */}
        <p className="text-green-500 text-sm">{category.name}</p>
        
        {/* Title */}
        <h3 className="text-gray-800 font-medium truncate">{title}</h3>
        
        {/* Price and Rating */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="font-bold">
              {price} EGP
            </span>
            <div className="flex items-center">
              <span className="text-yellow-400">★</span>
              <span className="text-sm text-gray-600 ml-1">{ratingsAverage}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}