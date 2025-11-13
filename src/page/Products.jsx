import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Products.css';

function Products({ products, carts, setCarts }) {
    return (
        <div className="products-container">
            <div className="products-itemps-container">
                {products.map((product) => {
                    return (
                        <Card key={product.id} style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={product.thumbnailUrl} />
                            <Card.Body>
                                <Card.Title>{product.title}</Card.Title>
                                <Card.Text>
                                    <strong>${product.price.toFixed(2)}</strong>
                                </Card.Text>

                                {carts.find((cart) => cart.id === product.id)  ? 
                                (
                                    <span className='badge bg-danger'>Added</span>
                                ) : (
                                    <Button variant="outline-primary" onClick={() => {
                                        setCarts([...carts, product])
                                    }}>
                                        Add to Cart
                                    </Button>
                                ) }

                            </Card.Body>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}

export default Products