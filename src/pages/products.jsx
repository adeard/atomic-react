import React, { useEffect, useRef, useState } from 'react'
import CardProduct from '../components/Fragments/CardProduct'
import { getProducts } from '../services/product.service';
import TableCart from '../components/Fragments/TableCart';
import Navbar from '../components/Layouts/Navbar';

const ProductsPage = () => {

    // const [cart, setCart] = useState([])
    // const [totalPrice, setTotalPrice] = useState(0)
    const [products, setProducts] = useState([])
    // const username = useLogin()
    
    // useEffect(() => {
    //     setCart(JSON.parse(localStorage.getItem("cart")) || [])
    // }, []);

    useEffect(() => {
        getProducts((data) => {
            setProducts(data)
        })
    }, [])

    // useEffect(() => {
    //     if (products.length > 0 && cart.length > 0) {
    //         const sum = cart.reduce((acc, item) => {
    //             const product = products.find((product) => product.id === item.id)
    //             return acc + product.price * item.qty
    //         }, 0)
    //         setTotalPrice(sum)
    //         localStorage.setItem("cart", JSON.stringify(cart))
    //     }
    // }, [cart])

    // const handleAddToCart = (id) => {
    //     if (cart.find((product) => product.id === id)) {
    //         setCart(
    //             cart.map(product => product.id === id ? {...product, qty: product.qty + 1}: product)
    //         ) 
            
    //     } else {
    //         setCart([...cart, {id, qty: 1}])
    //     }
    // }

    // const cartRef = useRef(JSON.parse(localStorage.getItem("cart")) || [])

    // const handleAddToCartRef = (id) => {
    //     cartRef.current = [...cartRef.current, {id , qty : 1}]
    //     localStorage.setItem("cart", JSON.stringify(cartRef.current))
    // }

    // const totalPriceRef = useRef(null)

    // useEffect(() => {
    //     if (products.length > 0 && cart.length > 0) {
    //         totalPriceRef.current.style.display = "table-row"
    //     } else {
    //         totalPriceRef.current.style.display = "none"
    //     }
    // }, [cart, products])
    
  return (
    <>
        <Navbar></Navbar>
        <div className='flex justify-center py-5'>   
            <div className='w-3/4 flex flex-wrap'>
                {products.length > 0 && products.map((product) => (
                    <CardProduct key={product.id}>
                        <CardProduct.Header image={product.image} id={product.id}></CardProduct.Header>
                        <CardProduct.Body name={product.title}>
                        {product.description}
                        </CardProduct.Body>
                        <CardProduct.Footer price={product.price} id={product.id}></CardProduct.Footer>
                    </CardProduct>
                ))}
            </div> 
            <div className='w-1/4'>
                <h1 className='text-3xl font-bold text-blue-600 ml-5 mb-2'>Cart</h1>
                <TableCart products={products}></TableCart>
            </div>
        </div>
    </>
  )
}

export default ProductsPage