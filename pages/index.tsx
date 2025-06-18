import { GetServerSideProps } from 'next'
import { useState } from 'react'
import { Container, Row, Col, Form, Spinner } from 'react-bootstrap'
import ProductCard from '../components/ProductsCard'
import { Product } from '../types/Product'

export default function Home({ products }: { products: Product[] }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filtered, setFiltered] = useState(products)
  const [loading, setLoading] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 8

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setSearchTerm(val)
    setLoading(true)
    setCurrentPage(1) 
    setTimeout(() => {
      setFiltered(
        products.filter(p => p.title.toLowerCase().includes(val.toLowerCase()))
      )
      setLoading(false)
    }, 400)
  }

  const indexOfLast = currentPage * productsPerPage
  const indexOfFirst = indexOfLast - productsPerPage
  const currentProducts = filtered.slice(indexOfFirst, indexOfLast)

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4 fw-bold">Our Products</h2>
      <Form.Control
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4"
      />

      {loading ? (
        <div className="text-center"><Spinner animation="border" /></div>
      ) : (
        <>
          <Row>
            {currentProducts.map(product => (
              <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>

          <div className="d-flex justify-content-center mt-4">
            <button
                className="btn btn-outline-primary me-2"
              onClick={() => {
                setCurrentPage(prev => Math.max(prev - 1, 1))
              }}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={() =>{
                setCurrentPage(prev => indexOfLast < filtered.length ? prev + 1 : prev)
              }}
              disabled={indexOfLast >= filtered.length}
            >
              Next
            </button>
          </div>
        </>
      )}
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('https://fakestoreapi.com/products')
  const products: Product[] = await res.json()
  return { props: { products } }
}
