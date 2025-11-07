import { create } from 'zustand';
import type { ProductType } from '../components/ProductCard';

export interface Order {
  product: ProductType;
  count: number;
}

interface OrderStore {
  orders: Order[];
  addItem: (product: ProductType) => void;
  removeItem: (product: ProductType) => void;
  removeProductFromCart: (product: ProductType) => void;
  getTotalOrdersCount: () => number;
  getTotalCost: () => number;
  resetOrders: () => void;
}

const useCartStore = create<OrderStore>((set, get) => ({
  orders: [],
  addItem: (product) => {
    set((state) => {
      const indexedOrder = state.orders.find(
        (order) => order.product.id === product.id
      );
      if (indexedOrder) {
        return {
          orders: state.orders.map((order) =>
            order.product.id === product.id
              ? { ...order, count: order.count + 1 }
              : order
          ),
        };
      } else {
        return {
          orders: [...state.orders, { product, count: 1 }],
        };
      }
    });
  },
  removeItem: (product) => {
    set((state) => {
      const indexedOrder = state.orders.find(
        (order) => order.product.id === product.id
      );
      if (indexedOrder) {
        if (indexedOrder.count === 1)
          return {
            orders: state.orders.filter(
              (order) => order.product.id !== product.id
            ),
          };
        else if (indexedOrder.count > 1)
          return {
            orders: state.orders.map((order) =>
              order.product.id === product.id
                ? { ...order, count: order.count - 1 }
                : order
            ),
          };
      }

      return {
        orders: state.orders,
      };
    });
  },
  removeProductFromCart: (product) => {
    set((state) => {
      const indexedOrder = state.orders.find(
        (order) => order.product.id === product.id
      );
      if (indexedOrder) {
        return {
          orders: state.orders.filter(
            (order) => order.product.id !== product.id
          ),
        };
      }

      return {
        orders: state.orders,
      };
    });
  },
  getTotalOrdersCount: () => {
    return get().orders.reduce(
      (total: number, order: Order) => total + order.count,
      0
    );
  },
  getTotalCost: () => {
    return get().orders.reduce(
      (total: number, order: Order) =>
        total + order.count * order.product.price,
      0
    );
  },
  resetOrders: () => {
    set({ orders: [] });
  },
}));

export default useCartStore;
