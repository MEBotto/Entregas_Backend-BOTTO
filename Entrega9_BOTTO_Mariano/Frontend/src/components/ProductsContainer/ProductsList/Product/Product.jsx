import React from 'react'

const Product = ({product}) => {
  return (
    <div>
      <h1>{product._id}</h1>
      <h2>{product.title}</h2>
      <h3>{product.price}</h3>
    </div>
  )
}

export default Product