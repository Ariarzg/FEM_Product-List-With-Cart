import type { FC } from 'react';
import useCartStore, { type Order } from '../stores/cartStore';

const emptyCart = 'images/illustration-empty-cart.svg';
const removeIcon = '/images/icon-remove-item.svg';
const carbonNeutralIcon = '/images/icon-carbon-neutral.svg';

interface YourCartPropType {
  onConfirm: () => void;
}

const YourCart: FC<YourCartPropType> = ({ onConfirm }) => {
  const { orders, removeProductFromCart } = useCartStore();
  const totalCount = useCartStore((state) => state.getTotalOrdersCount());
  const totalCost = useCartStore((state) => state.getTotalCost());

  const calculateOneOrderCost = (order: Order) => {
    return order.product.price * order.count;
  };

  return (
    <div className="bg-neutral-rose-50 rounded-2xl shadow-md p-6 flex flex-col gap-6">
      <h2 className="text-accent-red font-semibold text-2xl">
        Your Cart ({totalCount})
      </h2>
      {orders.length ? (
        <div>
          {orders.map((order) => (
            <div className="border-b border-neutral-rose-100 py-4 flex justify-between items-center">
              <div>
                <p className="font-semibold">{order.product.name}</p>
                <span className="text-accent-red font-semibold mr-2 inline-block w-6">
                  {order.count}x
                </span>
                <span className="text-neutral-rose-400 font-light mr-2">
                  @ ${order.product.price.toFixed(2)}
                </span>
                <span className="text-accent-green font-medium">
                  ${calculateOneOrderCost(order).toFixed(2)}
                </span>
              </div>
              <div
                className="w-5 h-5 rounded-full flex justify-center items-center border border-neutral-rose-300"
                onClick={() => removeProductFromCart(order.product)}
              >
                <img src={removeIcon} alt="Remove Icon" className="scale-115" />
              </div>
            </div>
          ))}
          <div className="mt-10 flex justify-between items-center">
            <p>Order Total</p>
            <p className="font-semibold text-3xl">${totalCost.toFixed(2)}</p>
          </div>

          <div className="mt-8 flex justify-center items-center gap-2 py-4 bg-neutral-rose-100 rounded-sm text-sm">
            <img src={carbonNeutralIcon} alt="Carbon Neutral Icon" />
            <p>
              This is a <span className="font-semibold">carbon-neutral</span>{' '}
              delivery
            </p>
          </div>

          <button
            className="text-center w-full bg-accent-red text-neutral-rose-100 font-medium py-4 rounded-full mt-8 cursor-pointer"
            onClick={onConfirm}
          >
            Confirm Order
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-col justify-center items-center gap-4 pb-6">
            <img src={emptyCart} alt="Empty Cart Illustration" />
            <p>Your added items will appear here</p>
          </div>
        </>
      )}
    </div>
  );
};

export default YourCart;
