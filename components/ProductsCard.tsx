import React from 'react'
import { Card } from 'react-bootstrap'
import { Product } from '../types/Product'
import Link from 'next/link'

interface Props {
  product: Product
}
const ProductsCard = ({product}: Props) => {
  return (
    <Link href={`/product/${product.id}`} passHref>
      <Card className='h-100' role='button'>
        <Card.Img
          variant="top"
          src={product.image}
          style={{ objectFit: 'contain', height: '200px' }}
          alt={product.title}
        />
        <Card.Body>
          <Card.Title> {product.title} </Card.Title>
          <Card.Text>Price: ${product.price}</Card.Text>
          <Card.Text>Category: {product.category}</Card.Text>
          {product.rating && <Card.Text>Rating: {product.rating.rate}</Card.Text>}
        </Card.Body>
      </Card>
    </Link>
    
  )
}
export default ProductsCard
