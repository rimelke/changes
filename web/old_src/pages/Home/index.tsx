import React, { useState, useEffect } from 'react'
import {FiEdit, FiTrash2, FiPlus} from 'react-icons/fi'

import api from '../../config/api'
import './styles.css'

interface Product {
    id: number
    ref: string
    name: string
    group_id: number
    cost: null | number
    price: null | number
    profit: null | number
    updated_at: string
    group_name: string
}

const EditBtn: React.FC = () => {
    return (
        <button className="edit" type="button">
            <FiEdit size={17}/>
        </button>
    )
}

const DelBtn: React.FC = () => {
    return (
        <button className="del" type="button">
            <FiTrash2 size={17}/>
        </button>
    )
}

const Home: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [selected, setSelected] = useState<number | null>(null)

    useEffect(() => {
        api.get('/products').then(res => {
            setProducts(res.data)
        })
    }, [])

    return (
        <>
        <main id="pageHome">
            <h1>Custos</h1>
            <table>
                <thead>
                    <tr>
                        <th className="left">Ref.</th>
                        <th className="left">Descrição</th>
                        <th className="left">Grupo</th>
                        <th className="right">Custo</th>
                        <th className="right">Preço</th>
                        <th className="right">Lucro</th>
                        <th className="right">Ult. Modificação</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr 
                            key={product.id}
                            className={selected === product.id ? 'selected' : ''}
                            onClick={() => setSelected(product.id)}
                        >
                            <td className="left">{product.ref}</td>
                            <td className="left">{product.name}</td>
                            <td className="left">{product.group_name}</td>
                            <td className="right">{product.cost ? product.cost.toFixed(2) : '-'}</td>
                            <td className="right">{product.price ? product.price.toFixed(2) : '-'}</td>
                            <td className="right">{product.profit ? product.profit.toFixed(1) + ' %' : '-'}</td>
                            <td className="right">{new Date(product.updated_at + ' UTC').toLocaleString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                                year: 'numeric',
                                month: 'numeric',
                                day: 'numeric'
                            })}</td>
                            <td className="thin"><EditBtn /></td>
                            <td className="thin"><DelBtn /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
        </>
    )
}

export default Home