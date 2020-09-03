import React from 'react'
import { FiPackage, FiAperture, FiTruck } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'

import './styles.css'

const Sidebar = () => {
    return (
        <aside id="sidebar">
            <header>
                <h1>Custos</h1>
            </header>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/products" activeClassName="activeNavBtn">
                            <FiPackage size={20} />
                            <strong>Produtos</strong>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/fabrics" activeClassName="activeNavBtn">
                            <FiAperture size={20} />
                            <strong>Tecidos</strong>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/providers" activeClassName="activeNavBtn">
                            <FiTruck size={20} />
                            <strong>Fornecedores</strong>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar