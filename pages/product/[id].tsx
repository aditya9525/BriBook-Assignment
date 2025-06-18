import { GetServerSideProps } from 'next'
import { Container, Row, Col, Image } from 'react-bootstrap'
import { Product } from '../../types/Product'

interface Props {
    product: Product
}

export default function ProductDetail({ product }: Props) {
    return (
        <Container className="my-4 ">
            <Row>
                <Col md={6}>
                    <Image src={product.image} fluid style={{ maxHeight: '400px' }}  alt='product-image'/>
                </Col>
                <Col md={6}>
                    <h2>{product.title}</h2>
                    <p><strong>Price:</strong> ${product.price}</p>
                    <p><strong>Category:</strong> {product.category}</p>
                    {product.rating && (
                        <p><strong>Rating:</strong> {product.rating.rate} / 5</p>
                    )}
                    <p><strong>Description:</strong> {product.description}</p>
                </Col>
            </Row>
        </Container>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const res = await fetch(`https://fakestoreapi.com/products/${params?.id}`)
    const product: Product = await res.json()

    return {
        props: { product }
    }
}
