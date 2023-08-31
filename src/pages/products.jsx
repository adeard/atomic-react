import React, { useEffect, useRef, useState } from 'react'
import CardProduct from '../components/Fragments/CardProduct'
import Button from '../components/Elements/Button/Index';
import Counter from '../components/Fragments/Counter';

const products = [
    {
        id: 1,
        image : "/images/image_test.png",
        name : "Coba Product",
        price : 1000000,
        description : `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde aliquam repudiandae, saepe nemo, 
                        possimus libero vitae aliquid laudantium tempore id ratione iste, totam quae quasi iusto. Unde quibusdam rem eos?`,
    },
    {
        id: 2,
        image : "/images/image_test.png",
        name : "Coba Product 2",
        price : 500000,
        description : `Lorem, ipsum dolor sit amet consectetur adipisicing elit.`,
    },
    {
        id: 3,
        image : "/images/image_test.png",
        name : "Coba Product 3",
        price : 200000,
        description : `Lorem, ipsum dolor sit amet consectetur adipisicing elit.`,
    },
];

const email = localStorage.getItem('email')

const ProductsPage = () => {

    const [cart, setCart] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    
    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem("cart")) || [])
    }, []);

    useEffect(() => {
        if (cart.length > 0) {
            const sum = cart.reduce((acc, item) => {
                const product = products.find((product) => product.id === item.id)
                return acc + product.price * item.qty
            }, 0)
            setTotalPrice(sum)
            localStorage.setItem("cart", JSON.stringify(cart))
        }
    }, [cart])

    const handleLogout = () => {
        localStorage.removeItem('email')
        localStorage.removeItem('password')
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
        if (cart.length > 0) {
            totalPriceRef.current.style.display = "table-row"
        } else {
            totalPriceRef.current.style.display = "none"
        }
    }, [cart])
    
  return (
    <>
        <div className='flex justify-end h-20 bg-blue-600 text-white items-center px-10'>
            {email}
            <Button className="ml-5 bg-black" onClick={handleLogout}>Logout</Button>
        </div>
        <div className='flex justify-center py-5'>   
            <div className='w-3/4 flex flex-wrap'>
                {products.map((product) => (
                    <CardProduct key={product.id}>
                        <CardProduct.Header image={product.image}></CardProduct.Header>
                        <CardProduct.Body name={product.name}>
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
                        {cart.map((item) => {               // menggunakan cart
                            const product = products.find(
                                (product) => product.id === item.id
                            );
                        
                            return (
                                <tr key={item.id}>
                                    <td>{product.name}</td>
                                    <td>Rp. {product.price.toLocaleString("id-ID", {
                                        styles : "currency",
                                        currency : "IDR",
                                    })}</td>
                                    <td>{item.qty}</td>
                                    <td>Rp. {(product.price * item.qty).toLocaleString("id-ID", {
                                        styles : "currency",
                                        currency : "IDR",
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
                                    Rp. {(totalPrice).toLocaleString("id-ID", {
                                        styles : "currency",
                                        currency : "IDR",
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