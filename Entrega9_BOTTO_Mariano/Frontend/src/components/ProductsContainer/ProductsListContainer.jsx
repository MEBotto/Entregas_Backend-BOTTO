import React from 'react'
import ProductsList from './ProductsList/ProductsList.jsx'
import { useState, useEffect } from 'react';

const ProductsListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Función asincrónica para hacer la solicitud GET
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/products');
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }

        const data = await response.json();
        setProducts(data.data);
        setLoading(false); // Cambia el estado de loading a false cuando los datos están listos
      } catch (error) {
        console.error('Error:', error.message);
        setLoading(false); // También cambia el estado de loading a false en caso de error
      }
    };

    // Llamada a la función para obtener los datos cuando el componente se monta
    fetchData();
  }, []); // La dependencia vacía asegura que esto solo se ejecute una vez al montar el componente

  return (
    <div className='container mt-5'>
      {loading ? (
        <p>Cargando...</p> // Muestra un mensaje de carga mientras se obtienen los datos
      ) : (
        <div className="row row-cols-4 g-4">
          <ProductsList products={products.docs} />
        </div>
      )}
    </div>
  )
}

export default ProductsListContainer