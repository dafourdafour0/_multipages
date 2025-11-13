// Carts.jsx
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './Carts.css';

function Carts({ carts, setCarts }) {
  return (
    <div className="carts-container">
      {/* ส่วนการ์ดสินค้า (เดิม) */}
      <div className="carts-items-container">
        {carts.map((cart) => (
          <Card key={cart.id} style={{ width: '18rem' }}>
            <Card.Img variant="top" src={cart.thumbnailUrl} />
            <Card.Body>
              <Card.Title>{cart.title}</Card.Title>
              <Card.Text>
                <strong>${cart.price.toFixed(2)}</strong>
              </Card.Text>
              <Button variant="outline-primary" onClick={() => {
                setCarts(carts.filter((c) => c.id !== cart.id))

              }}
              >
                Remove from Cart
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* ส่วนสรุปตะกร้าสินค้า (ย้ายลงมาด้านล่าง) */}
      <div className="carts-summary-section">
        <div className="summary-text">
          Products: {carts.length} items - Total price: $
          {carts.reduce((total, cart) => total + cart.price, 0).toFixed(2)}
        </div>
        <button className="checkout-button">Checkout ➔️</button>
      </div>
    </div>
  );
}

export default Carts;