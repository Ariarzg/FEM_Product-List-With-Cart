import type { FC } from 'react';
import useCartStore from '../stores/cartStore';

export interface ProductType {
  id: number;
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
  name: string;
  category: string;
  price: number;
}

interface ProductCardPropsType {
  product: ProductType;
}

const ProductCard: FC<ProductCardPropsType> = ({ product }) => {
  const { orders, addItem, removeItem } = useCartStore();

  const indexedOrder = orders.find((order) => order.product.id === product.id);

  const buttonClasses =
    `absolute w-44 z-10 bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 px-6 py-3 border rounded-full flex ` +
    (indexedOrder
      ? `bg-accent-red justify-between items-center border-accent-red`
      : `bg-neutral-rose-50 hover:bg-neutral-rose-100 border-neutral-rose-500  justify-center items-center gap-2 cursor-pointer`);
  // Convert relative paths to module imports
  const mobileImg = new URL(product.image.mobile, import.meta.url).href;
  const tabletImg = new URL(product.image.tablet, import.meta.url).href;
  const desktopImg = new URL(product.image.desktop, import.meta.url).href;

  const addToCartIcon = new URL(
    '../assets/images/icon-add-to-cart.svg',
    import.meta.url
  ).href;
  const incrementIcon = new URL(
    '../assets/images/icon-increment-quantity.svg',
    import.meta.url
  ).href;
  const decrementIcon = new URL(
    '../assets/images/icon-decrement-quantity.svg',
    import.meta.url
  ).href;

  //This is here so that when an item is in the cart, it doesn't add it twice when clicking increment button.
  const handleAddToCart = () => {
    if (!indexedOrder) {
      addItem(product);
    }
  };

  return (
    <div>
      <div className="relative mb-6">
        <div
          className={`overflow-hidden rounded-2xl shadow-md ${
            indexedOrder ? `ring-2 ring-accent-red` : ``
          }`}
        >
          <picture>
            <source srcSet={mobileImg} media="(max-width : 48rem)" />
            <source srcSet={tabletImg} media="(max-width : 64rem)" />
            <img src={desktopImg} alt={product.name} />
          </picture>
        </div>
        <button className={buttonClasses} onClick={handleAddToCart}>
          {indexedOrder ? (
            <>
              <div
                className="w-5 h-5 rounded-full flex justify-center items-center border border-neutral-rose-50"
                onClick={() => removeItem(product)}
              >
                <img src={decrementIcon} alt="decrement icon" />
              </div>

              <p className="text-neutral-rose-50">{indexedOrder.count}</p>

              <div
                className="w-5 h-5 rounded-full flex justify-center items-center border border-neutral-rose-50"
                onClick={() => addItem(product)}
              >
                <img src={incrementIcon} alt="increment icon" />
              </div>
            </>
          ) : (
            <>
              <img src={addToCartIcon} alt="Add To Cart Icon" />
              <span className="font-semibold">Add to Cart</span>
            </>
          )}
        </button>
      </div>
      <p className="text-sm text-neutral-rose-400">{product.category}</p>
      <p className="font-semibold text-neutral-rose-900">{product.name}</p>
      <p className="text-accent-red font-semibold">
        ${product.price.toFixed(2)}
      </p>
    </div>
  );
};

export default ProductCard;
