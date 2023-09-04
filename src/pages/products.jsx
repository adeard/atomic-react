import React, { useEffect, useRef, useState } from 'react'
import CardProduct from '../components/Fragments/CardProduct'
import Button from '../components/Elements/Button/Index';
import Counter from '../components/Fragments/Counter';
import { getProducts } from '../services/product.service';
import { getUsername } from '../services/auth.service';
import { useLogin } from '../hooks/useLogin';

const ProductsPage = () => {

    const [cart, setCart] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [products, setProducts] = useState([])
    const username = useLogin()
    
    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem("cart")) || [])
    }, []);

    useEffect(() => {
        getProducts((data) => {
            setProducts(data)
        })
    }, [])

    useEffect(() => {
        if (products.length > 0 && cart.length > 0) {
            const sum = cart.reduce((acc, item) => {
                const product = products.find((product) => product.id === item.id)
                return acc + product.price * item.qty
            }, 0)
            setTotalPrice(sum)
            localStorage.setItem("cart", JSON.stringify(cart))
        }
    }, [cart])

    const handleLogout = () => {
        localStorage.removeItem('token')
        window.location.href = "/login"
    }

    const handleAddToCart = (id) => {
        if (cart.find((product) => product.id === id)) {
            setCart(
                cart.map(product => product.id === id ? {...product, qty: product.qty + 1}: product)
            ) 
            
        } else {
            setCart([...cart, {id, qty: 1}])
        }
    }

    const cartRef = useRef(JSON.parse(localStorage.getItem("cart")) || [])

    const handleAddToCartRef = (id) => {
        cartRef.current = [...cartRef.current, {id , qty : 1}]
        localStorage.setItem("cart", JSON.stringify(cartRef.current))
    }

    const totalPriceRef = useRef(null)

    useEffect(() => {
        if (products.length > 0 && cart.length > 0) {
            totalPriceRef.current.style.display = "table-row"
        } else {
            totalPriceRef.current.style.display = "none"
        }
    }, [cart, products])
    
  return (
    <>
        <div className='flex justify-end h-20 bg-blue-600 text-white items-center px-10'>
            {username}
            <Button className="ml-5 bg-black" onClick={handleLogout}>Logout</Button>
        </div>
        <div className='flex justify-center py-5'>   
            <div className='w-3/4 flex flex-wrap'>
                {products.length > 0 && products.map((product) => (
                    <CardProduct key={product.id}>
                        <CardProduct.Header image={product.image}></CardProduct.Header>
                        <CardProduct.Body name={product.title}>
                        {product.description}
                        </CardProduct.Body>
                        <CardProduct.Footer price={product.price} id={product.id} handleAddToCart={handleAddToCart}></CardProduct.Footer>
                        {/* <CardProduct.Footer price={product.price} id={product.id} handleAddToCart={handleAddToCartRef}></CardProduct.Footer> */}
                    </CardProduct>
                ))}
            </div> 
            <div className='w-1/4'>
                <h1 className='text-3xl font-bold text-blue-600 ml-5 mb-2'>Cart</h1>
                <table className='text-left table-auto border-separate border-spacing-x-5'>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>                        
                    </thead>
                    <tbody>
                        {/* {cartRef.current.map((item) => {    // menggunakan cart ref */}
                        {products.length > 0 && cart.map((item) => {               // menggunakan cart
                            const product = products.find(
                                (product) => product.id === item.id
                            );
                        
                            return (
                                <tr key={item.id}>
                                    <td>{product.title.substring(0, 10)} ...</td>
                                    <td>$ {product.price.toLocaleString("id-ID", {
                                        styles : "currency",
                                        currency : "USD",
                                    })}</td>
                                    <td>{item.qty}</td>
                                    <td>$ {(product.price * item.qty).toLocaleString("id-ID", {
                                        styles : "currency",
                                        currency : "USD",
                                    })}</td>
                                </tr>
                            );
                        })}
                        <tr ref={totalPriceRef}>
                            <td colSpan={3}>
                                <b>Total Price</b>
                            </td>
                            <td>
                                <b>
                                    $ {(totalPrice).toLocaleString("id-ID", {
                                        styles : "currency",
                                        currency : "USD",
                                    })}
                                </b>
                            </td>
                        </tr>                        
                    </tbody>
                </table>
            </div>
        </div>
        {/* <div className='flex w-100 justify-center'>
            <Counter></Counter>
        </div> */}
    </>
  )
}

export default ProductsPage