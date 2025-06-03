import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { Product } from '../types';

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalAmount: number;
}

interface CartContextType {
  items: CartItem[];
  totalAmount: number;
  addItem: (item: Product) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
}

const CartContext = createContext<CartContextType>({
  items: [],
  totalAmount: 0,
  addItem: () => { },
  removeItem: () => { },
  updateQuantity: () => { },
});

const STORAGE_KEY = 'cart';

type CartAction =
  | { type: 'ADD_ITEM'; item: Product; }
  | { type: 'REMOVE_ITEM'; id: string; }
  | { type: 'UPDATE_QUANTITY'; id: string; delta: number; }
  | { type: 'SET_CART'; payload: CartState; };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'SET_CART':
      return action.payload;

    case 'ADD_ITEM': {
      const itemId = action.item._id;
      const existingCartItemIndex = state.items.findIndex(
        (item) => item._id === itemId
      );

      if (existingCartItemIndex > -1) {
        const updatedItems = [...state.items];
        updatedItems[existingCartItemIndex].quantity += 1;
        return {
          items: updatedItems,
          totalAmount: state.totalAmount + action.item.price,
        };
      }

      const newItem = {
        ...action.item,
        quantity: 1,
      };

      return {
        items: [...state.items, newItem],
        totalAmount: state.totalAmount + action.item.price,
      };
    }

    case 'REMOVE_ITEM': {
      const existingItem = state.items.find((item) => item._id === action.id);
      if (!existingItem) return state;

      return {
        items: state.items.filter((item) => item._id !== action.id),
        totalAmount: state.totalAmount - existingItem.price * existingItem.quantity,
      };
    }

    case 'UPDATE_QUANTITY': {
      const existingItemIndex = state.items.findIndex((item) => item._id === action.id);
      if (existingItemIndex === -1) return state;

      const updatedItems = [...state.items];
      const item = updatedItems[existingItemIndex];
      const newQuantity = item.quantity + action.delta;

      if (newQuantity <= 0) {
        return {
          items: updatedItems.filter((item) => item._id !== action.id),
          totalAmount: state.totalAmount - item.price * item.quantity,
        };
      }

      updatedItems[existingItemIndex] = {
        ...item,
        quantity: newQuantity,
      };

      return {
        items: updatedItems,
        totalAmount: state.totalAmount + item.price * action.delta,
      };
    }

    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode; }> = ({ children }) => {
  // Permet d'ajouter, retirer, modifier facilement le panier & de calculer le total
  const [cartState, dispatch] = useReducer(cartReducer, {
    items: [],
    totalAmount: 0,
  });

  // Sauvegarde du panier dans le localStorage pour qu'au F5 on ne perde pas le panier
  useEffect(() => {
    const savedCart = localStorage.getItem(STORAGE_KEY);
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        dispatch({ type: 'SET_CART', payload: parsed });
      } catch (error) {
        console.error('Erreur lors du chargement du panier:', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Sauvegarde du panier dans le localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartState));
  }, [cartState]);

  // Au clic sur ajouter au panier
  const addItem = useCallback((item: Product) => {
    dispatch({ type: 'ADD_ITEM', item });
  }, []);

  const removeItem = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_ITEM', id });
  }, []);

  const updateQuantity = useCallback((id: string, delta: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', id, delta });
  }, []);

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem,
    removeItem,
    updateQuantity,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { cartReducer };
