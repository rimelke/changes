import React, { useState, useEffect } from 'react'
import api from '../../services/api'
import { Form } from '@unform/web'
import { Input, NumberInput } from '../../components/Form'

import '../../assets/styles/tablePage.css'
import './styles.css'

interface Provider {
    id: number
    name: string
    tax: number
}

const Provider = () => {
    const [providers, setProviders] = useState<Provider[]>([])
    const [selectedProvider, setSelectedProvider] = useState<Provider>({} as Provider)

    useEffect(() => {
        api.get('/providers')
        .then(res => setProviders(res.data))
    }, [])

    function handleSubmit(data: any) {
        api.post('/providers', data)
        .then()
    }

    return (
        <main id="ProvidersHomePage"  className="tablePage">
            <header>
                <h2>Fornecedores</h2>
                <Form className="buttons" onSubmit={handleSubmit}>
                    <Input className="input" autoComplete="off" name="name" required placeholder="Nome" />
                    <NumberInput className="input" autoComplete="off" name="tax" required placeholder="Taxa" />
                    <button type="submit" className="btn">Adicionar</button>
                    <button type="button" className="btn" onClick={handleEdit}>Editar</button>
                    <button type="button" className="btn" onClick={handleDelete}>Apagar</button>
                </Form>
            </header>
            <section>
                <table>
                    <thead>
                        <tr>
                            <th className="left">Nome</th>
                            <th className="right">Taxa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {providers.map(provider => (
                            <tr key={provider.id}
                                className={selectedProvider.id === provider.id ? 'selected' : undefined}
                                onClick={() => setSelectedProvider(provider)}
                            >
                                <td>{provider.name}</td>
                                <td className="right">{provider.tax ? provider.tax.toFixed(2) + ' %' : '-'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </main>
    )
}

export default Provider