import React from 'react'
import Product from './Product/Product.jsx'

const ProductsList = ({ products }) => {
  return (
    <>
      {products.map(product => <Product key={product.id} product={product}/>)}
    </>
  )
}

export default ProductsList