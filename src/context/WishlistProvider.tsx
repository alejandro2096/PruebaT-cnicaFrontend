import React, { createContext, useState, useContext, useEffect } from 'react';

// Definir el tipo de props para WishlistProvider
interface WishlistProviderProps {
  children: React.ReactNode;
}

// Definimos la interfaz para un producto
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
}

// Definimos la interfaz para el contexto
interface WishlistContextProps {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: number) => void;
  isProductInWishlist: (id: number) => boolean;
}

const WishlistContext = createContext<WishlistContextProps | undefined>(undefined);

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {  // Aceptamos 'children'
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // Cargar los productos deseados del localStorage cuando la app se inicia
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  // Guardar la lista de productos deseados en el localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Agregar un producto a la lista de deseos
  const addToWishlist = (product: Product) => {
    setWishlist((prevWishlist) => [...prevWishlist, product]);
  };

  // Eliminar un producto de la lista de deseos
  const removeFromWishlist = (id: number) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== id));
  };

  // Comprobar si un producto ya está en la lista de deseos
  const isProductInWishlist = (id: number) => {
    return wishlist.some((item) => item.id === id);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isProductInWishlist }}
    >
      {children} {/* Renderizamos los children */}
    </WishlistContext.Provider>
  );
};

// Hook personalizado para acceder al contexto
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};