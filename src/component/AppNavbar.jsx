import { Button } from 'react-bootstrap'
import { Link } from "react-router-dom"

const AppNav = ({ products, carts, setToken }) => {
  const handleLogout = () => {
    setToken(null); 
  };

  return (
    <div className="d-flex justify-content-center gap-4">
      <Link to={'Home'}>
        <Button variant="outline-secondary">Home</Button>
      </Link>
      <Link to={'Calculator'}>
        <Button variant="outline-secondary">Calculator</Button>
      </Link>
      <Link to={'Animetion'}>
        <Button variant="outline-secondary">Animetion</Button>
      </Link>
      <Link to={'Component'}>
        <Button variant="outline-secondary">Component</Button>
      </Link>
      <Link to={'Todos'}>
        <Button variant="outline-secondary">Todo</Button>
      </Link>
      <Link to={'products'}>
        <Button variant="outline-secondary">Products({products.length})</Button>
      </Link>
      <Link to={'carts'}>
        <Button variant="outline-secondary" className="position-relative">
          Carts
          {carts.length > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {carts.length < 10 ? carts.length : '9+'}
              <span className="visually-hidden">unread messages</span>
            </span>
          )}
        </Button>
      </Link>

      {/* ปุ่ม Logout */}
      <Button variant="outline-danger" onClick={() => {setToken('')}}>
        Logout
      </Button>
    </div>
  )
}

export default AppNav;
