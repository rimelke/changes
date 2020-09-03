import React, { useState, useEffect } from 'react'
import { Input, Select, NumberInput } from '../../../components/Form'
import { Form } from '@unform/web'
import api from '../../../services/api'
import { Scope } from '@unform/core'

import './styles.css'

interface Group {
    id: number,
    name: string
}

interface Provider {
    id: number
    name: string
}

interface Fabric {
    key: number
    id: number
    name: string
    price: number
    tax: number
    final_price: number
    efficiency: number
    subtotal: number
}

const New = () => {
    const [groups, setGroups] = useState([])
    const [custosFields, setCustosFields] = useState<(number)[]>([])
    const [providers, setProviders] = useState<Provider[]>([])
    const [selectedProviderId, setSelectedProviderId] = useState<number>(-1)
    const [selectedFabricIndex, setSelectedFabricIndex] = useState<number>(-1)
    const [fabrics, setFabrics] = useState<Fabric[]>([])
    const [addedFabrics, setAddedFabrics] = useState<Fabric[]>([])

    useEffect(() => {
        api.get('/groups').then(res => {
            setGroups(res.data.map((group: Group) => ({
                label: group.name,
                key: group.id,
                value: group.id
            })))
        })
    }, [])

    useEffect(() => {
        api.get('/providers').then(res => {
            setProviders(res.data)
        })
    }, [])

    useEffect(() => {
        api.get('/fabrics', {
            params: selectedProviderId !== -1 ? {
                provider_id: selectedProviderId
            }: undefined
        }).then(res => {
            setSelectedFabricIndex(-1)
            setFabrics(res.data)
        })
    }, [selectedProviderId])

    function handleAddField(fields: number[], setFields: (fields: number[]) => void) {
        let ele = fields[fields.length - 1]
        if (!ele) ele = 0
        ele += 1
        setFields([...fields, ele])
    }

    function handleRemoveField(fields: number[], setFields: (fields: number[]) => void, index: number) {
        let arr = [...fields]
        arr.splice(index, 1)
        setFields(arr)
    }

    function handleAddFabric() {
        let key = 1
        if (addedFabrics.length > 0) key = addedFabrics[addedFabrics.length - 1].key + 1
        setAddedFabrics([...addedFabrics, {...fabrics[selectedFabricIndex], key}])
    }

    function handleRemoveFabric(index: number) {
        let tmp = [...addedFabrics]
        tmp.splice(index, 1)
        setAddedFabrics(tmp)
    }

    return (
        <main id="produtosNewPage">
            <header>
                <h2>Novo produto</h2>
            </header>
            <section>
                <Form onSubmit={(data) => {console.log(data)}} initialData={{grupo_id: "", total: 0}}>
                    <div>
                        <h3>Dados básicos</h3>
                        <fieldset>
                            <div className="field-row three-field">
                                <Input required label="Referência" autoFocus autoComplete="off" className="input" name="ref" />
                                <Select required label="Grupo" className="input" name="grupo_id" items={groups}/>
                                <NumberInput name="total" required label="Saldo inicial" className="input" />
                            </div>
                            <Input required label="Descrição" autoComplete="off" className="input" name="descricao" />
                        </fieldset>
                    </div>
                    <div className="field-row two-field">
                        <div>
                            <h3>Custos</h3>
                            <fieldset>
                                <div>
                                    {custosFields.map((key, index) => (
                                        <div key={key} className="field-row three-field">
                                            <Scope path={`costs[${index}]`}>
                                                <Input required className="input" placeholder="Descrição" name="name"/>
                                                <NumberInput name="value" className="input" required placeholder="Valor" />
                                                <button
                                                    className="btn thin"
                                                    type="button"
                                                    onClick={() => handleRemoveField(custosFields, setCustosFields, index)}>
                                                        Remover
                                                </button>
                                            </Scope>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    type="button"
                                    className="btn thin"
                                    onClick={() => handleAddField(custosFields, setCustosFields)}>
                                        Adicionar
                                </button>
                            </fieldset>
                        </div>
                        <div>
                            <h3>Tecidos</h3>
                            <fieldset>
                                <div>
                                    {addedFabrics.map((fabric, index) => (
                                        <div key={fabric.key}>
                                            <Scope path={`fabrics[${index}]`}>
                                                <Input type="hidden" required defaultValue={fabric.id} name="id"/>
                                                <input className="input" readOnly value={fabric.name} />
                                                <input className="input" readOnly value={fabric.final_price.toFixed(2)} />
                                                <NumberInput name="efficiency" className="input" required placeholder="Rendimento" />
                                                <input className="input" readOnly value={fabric.subtotal} />
                                                <button
                                                    className="btn thin"
                                                    type="button"
                                                    onClick={() => handleRemoveFabric(index)}>
                                                        Remover
                                                </button>
                                            </Scope>
                                        </div>
                                    ))}
                                </div>
                                <div className="field-row three-field">
                                    <select className="input" value={selectedProviderId} onChange={(evt) => setSelectedProviderId(Number(evt.target.value))}>
                                        <option value={-1}>Todos</option>
                                        {providers.map(provider => (
                                            <option key={provider.id} value={provider.id}>{provider.name}</option>
                                        ))}
                                    </select>
                                    <select className="input" value={selectedFabricIndex} onChange={(evt) => setSelectedFabricIndex(Number(evt.target.value))}>
                                        <option disabled value={-1}>Selecione um tecido</option>
                                        {fabrics.map((fabric, index) => (
                                            <option key={fabric.id} value={index}>{fabric.name}</option>
                                        ))}
                                    </select>
                                    <button
                                        type="button"
                                        className="btn thin"
                                        onClick={handleAddFabric}>
                                            Adicionar
                                    </button>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                    <button type="submit" className="btn">Enviar</button>
                </Form>
            </section>
        </main>
    )
}

export default New