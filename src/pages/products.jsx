import React from 'react'
import CardProduct from '../components/Fragments/CardProduct'
import Button from '../components/Elements/Button/Index';

const products = [
    {
        id: 1,
        image : "/images/image_test.png",
        name : "Coba Product",
        price : "Rp. 1.000.000",
        description : `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde aliquam repudiandae, saepe nemo, 
                        possimus libero vitae aliquid laudantium tempore id ratione iste, totam quae quasi iusto. Unde quibusdam rem eos?`,
    },
    {
        id: 2,
        image : "/images/image_test.png",
        name : "Coba Product 2",
        price : "Rp. 1.000.000",
        description : `Lorem, ipsum dolor sit amet consectetur adipisicing elit.`,
    },
];

const email = localStorage.getItem('email')

const ProductsPage = () => {

    const handleLogout = () => {
        localStorage.removeItem('email')
        localStorage.removeItem('password')
        window.location.href = "/login"
    }
    
  return (
    <>
        <div className='flex justify-end h-20 bg-blue-600 text-white items-center px-10'>
            {email}
            <Button className="ml-5 bg-black" onClick={handleLogout}>Logout</Button>
        </div>
        <div className='flex justify-center py-5'>        
            {products.map((product) => (
                <CardProduct key={product.id}>
                    <CardProduct.Header image={product.image}></CardProduct.Header>
                    <CardProduct.Body name={product.name}>
                    {product.description}
                    </CardProduct.Body>
                    <CardProduct.Footer price={product.price}></CardProduct.Footer>
                </CardProduct>
            ))}
        </div>
    </>
  )
}

export default ProductsPage