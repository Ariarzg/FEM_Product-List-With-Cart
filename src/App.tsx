import ProductCard from './components/ProductCard';
import YourCart from './components/YourCart';
import productData from './data.json';
import { useState } from 'react';
import Modal from './components/Modal';
import useCartStore from './stores/cartStore';
import { AnimatePresence, motion } from 'motion/react';

const App = () => {
  const [isModalActive, setIsModalActive] = useState(false);

  const { orders, getTotalCost, resetOrders } = useCartStore();

  const confirmIcon = '/images/icon-order-confirmed.svg';

  const activateModal = () => {
    setIsModalActive(true);
  };

  const startNewOrder = async () => {
    await new Promise((resolve) => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(resolve, 400); // Wait for scroll animation
    });
    resetOrders();
    setIsModalActive(false);
  };

  return (
    <div className="font-redhat min-h-screen p-6 md:p-12 lg:p-20 bg-neutral-rose-50 grid grid-cols-[1fr] md:grid-cols-[1fr_auto] gap-8">
      <AnimatePresence>
        {isModalActive && (
          <Modal>
            <img src={confirmIcon} alt="Confirmation Icon" className="mt-6" />
            <p className="mt-8 text-5xl/14 font-semibold">Order Confirmed</p>
            <p className="text-accent-red mt-2 text-lg font-light">
              We hope you enjoy your food!
            </p>
            <div className="bg-neutral-100 p-6 rounded-lg mt-8">
              {orders.map((order) => {
                return (
                  <div className="flex justify-between items-center border-b border-neutral-200 pb-5 mb-5">
                    <div className="flex gap-4">
                      <img
                        src={order.product.image.thumbnail}
                        alt={`Thumbnail of ${order.product.name}`}
                        className="rounded-lg w-18"
                      />
                      <div className="flex flex-col justify-around w-7/12 sm:w-max">
                        <p className="font-semibold truncate">
                          {order.product.name}
                        </p>
                        <div>
                          <span className="text-accent-red font-medium inline-block w-6 mr-4">
                            {order.count}x
                          </span>
                          <span className="text-neutral-rose-500">
                            @ ${order.product.price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="font-semibold text-xl">
                      ${(order.count * order.product.price).toFixed(2)}
                    </p>
                  </div>
                );
              })}
              <div className="flex justify-between items-center mt-8">
                <p>Order Total</p>
                <p className="font-semibold text-3xl">
                  ${getTotalCost().toFixed(2)}
                </p>
              </div>
            </div>
            <motion.button
              className="text-center w-full text-neutral-rose-50 rounded-full py-4 mt-8 cursor-pointer"
              initial={{ backgroundColor: '#c73a0f' }}
              whileHover={{ backgroundColor: '#1ea475' }}
              transition={{ duration: 0.25 }}
              onClick={startNewOrder}
            >
              Start New Order
            </motion.button>
          </Modal>
        )}
      </AnimatePresence>

      <div id="title-grid" className="flex flex-col gap-8">
        <h1 className="font-bold text-[2.5rem] text-neutral-rose-900">
          Desserts
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
          {productData.map((product, index) => (
            <ProductCard product={product} key={index} />
          ))}
        </div>
      </div>
      <div id="your-cart" className="md:w-78 lg:w-84">
        <YourCart onConfirm={activateModal} />
      </div>
    </div>
  );
};

export default App;
