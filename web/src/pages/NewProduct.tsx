import { Flex, Heading, List, Text, IconButton, Button } from "@chakra-ui/react"
import { Form } from "@unform/web"
import { Input, MaskInput, Select } from "../components/Form"
import withSidebar from "../hooks/withSidebar"
import { useGet } from '../hooks/useGet'
import { FiEdit, FiTrash2, FiCheck, FiX } from 'react-icons/fi'
import { useState } from "react"

interface Group {
    id: number
    name: string
    desired: number
    minimum: number
}

interface Cost {
    id: number
    name: string
    value: number
}

const NewProduct = () => {
    const { data: groups } = useGet<Group[]>('/groups')
    const [costs, setCosts] = useState<Cost[]>([])
    const [nextId, setNextId] = useState(1)
    const [editCosts, setEditCosts] = useState<number[]>([])

    function handleAddCost(data: any) {
        data.id = nextId
        data.value = Number(data.value.replace(',', '.'))
        setCosts([...costs, data])
        setNextId(nextId + 1)
    }

    function handleDeleteCost(id: number) {
        setCosts(costs.filter(cost => cost.id !== id))
    }

    function handleEditCost(id: number) {
        setEditCosts([...editCosts, id])
    }

    function cancelEditCost(id: number) {
        setEditCosts(editCosts.filter(elm => elm !== id))
    }

    function saveEditCost(id: number, index: number, data: any) {
        let tmp = [...costs]
        tmp[index] = {...data, id}
        setCosts(tmp)
        cancelEditCost(id)
    }

    return (
        <Flex flexDir="column" as="main" flex={1} mt={4}>
            <Heading size="lg" color="teal.500">Novo Produto</Heading>
            <Flex justifyContent="space-between" mt={4}>
                <Flex flexDir="column" as={Form} onSubmit={() => {}}>
                    <Flex>
                        <Select flex={3} placeholder="Selecione uma coleção" name="group_id">
                            {groups?.map(group => (
                                <option value={group.id}>{group.name}</option>
                            ))}
                        </Select>
                        <Input flex={1} autoComplete="off" ml={4} name="ref" placeholder="Referência" />
                    </Flex>
                    <Flex mt={4}>
                        <Input flex={3} name="name" autoComplete="off" placeholder="Nome do produto" />
                        <MaskInput
                            flex={1}
                            ml={4}
                            placeholder="Preço"
                            decimalScale={2}
                            decimalSeparator=","
                            fixedDecimalScale
                            autoComplete="off"
                            name="price" />
                    </Flex>
                </Flex>
                <Flex mr={8} w={500} flexDir="column">
                    <List spacing={2} p={3} borderWidth="1px" borderRadius={7}>
                        {costs.map((cost, index) => editCosts.includes(cost.id) ? (
                            <Flex
                                alignItems="center"
                                key={cost.id}
                                as={Form}
                                onSubmit={data => saveEditCost(cost.id, index, data)}
                                initialData={cost}
                                justifyContent="space-between">
                                <Input
                                    name="name"
                                    autoComplete="off"
                                    isRequired
                                    h={8}
                                    w={52}
                                    placeholder="Custo" />
                                <MaskInput 
                                    placeholder="Valor"
                                    isRequired
                                    w={32}
                                    h={8}
                                    autoComplete="off"
                                    decimalSeparator=","
                                    decimalScale={2}
                                    fixedDecimalScale
                                    name="value" />
                                <Flex>
                                    <IconButton
                                        size="sm"
                                        colorScheme="green"
                                        aria-label="Salvar edições"
                                        type="submit"
                                        icon={<FiCheck />} />
                                    <IconButton
                                        ml={1}
                                        size="sm"
                                        colorScheme="red"
                                        aria-label="Cancelar edições"
                                        onClick={() => cancelEditCost(cost.id)}
                                        icon={<FiX />} />
                                </Flex>
                            </Flex>
                        ) : (
                            <Flex
                                alignItems="center"
                                key={cost.id}
                                justifyContent="space-between">
                                <Text>{cost.name}</Text>
                                <Text>{cost.value.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</Text>
                                <Flex>
                                    <IconButton
                                        size="sm"
                                        colorScheme="orange"
                                        aria-label="Editar custo"
                                        onClick={() => handleEditCost(cost.id)}
                                        icon={<FiEdit />} />
                                    <IconButton
                                        ml={1}
                                        size="sm"
                                        colorScheme="red"
                                        aria-label="Apagar custo"
                                        onClick={() => handleDeleteCost(cost.id)}
                                        icon={<FiTrash2 />} />
                                </Flex>
                            </Flex>
                        ))}
                    </List>
                    <Flex justifyContent="space-between" mt={4} as={Form} onSubmit={handleAddCost}>
                        <Input w={52} isRequired autoComplete="off" name="name" placeholder="Custo" />
                        <MaskInput 
                            placeholder="Valor"
                            isRequired
                            w={32}
                            autoComplete="off"
                            decimalSeparator=","
                            decimalScale={2}
                            fixedDecimalScale
                            name="value" />
                        <Button colorScheme="teal" type="submit">Adicionar</Button>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default withSidebar(NewProduct)