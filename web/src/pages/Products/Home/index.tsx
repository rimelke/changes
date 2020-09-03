import React, { useEffect, useState } from 'react'
import api from '../../../services/api'
import { NavLink } from 'react-router-dom'
import { FiEdit, FiTrash2 } from 'react-icons/fi'

import './styles.css'
import '../../../assets/styles/tablePage.css'

interface Product {
    id: number,
    ref: string,
    name: string,
    cost: number,
    price: number,
    profit: number,
    group_name: string
}

const Home = () => {
    const [Products, setProducts] = useState<Product[]>([])
    const [selectedProduct, setSelectedProduct] = useState<Product>({} as Product)

    useEffect(() => {
        api.get('/products').then(res => {
            setProducts(res.data)
        })
    }, [])

    return (
        <main id="productsHomePage" className="tablePage">
            <header>
                <h2>Produtos</h2>
                <div className="buttons">
                    <NavLink to="/products/new" className="btn">Novo</NavLink>
                    <button className="btn">Editar</button>
                </div>
            </header>
            <section>
                <table>
                    <thead>
                        <tr>
                            <th className="left">Ref.</th>
                            <th className="left">Descrição</th>
                            <th className="left">Grupo</th>
                            <th className="right">Custo</th>
                            <th className="right">Preço</th>
                            <th className="right">Lucro</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Products.map(product => (
                            <tr key={product.id}
                                className={selectedProduct.id === product.id ? 'selected' : undefined}
                                onClick={() => setSelectedProduct(product)}
                            >
                                <td>{product.ref}</td>
                                <td>{product.name}</td>
                                <td>{product.group_name}</td>
                                <td className="right">{product.cost ? product.cost.toFixed(2) : '-'}</td>
                                <td className="right">{product.price ? product.price.toFixed(2) : '-'}</td>
                                <td className="right">{product.profit ? product.profit.toFixed(1) + ' %' : '-'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </main>
    )
}

export default Home