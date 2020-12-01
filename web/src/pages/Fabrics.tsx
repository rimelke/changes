import { Button, Flex, Heading, IconButton, Stack, Text, SelectProps } from "@chakra-ui/react"
import { Form } from "@unform/web"
import { useState } from "react"
import { Input, MaskInput, Select } from "../components/Form"
import withSidebar from "../hooks/withSidebar"
import { FiEdit, FiTrash2, FiCheck, FiX } from 'react-icons/fi'

const Fabrics = () => {
    const [editingFabrics, setEditingFabrics] = useState<number[]>([])

    const fabrics = [{
        id: 1,
        name: 'Courino',
        provider_id: 1,
        provider_name: 'Makro',
        price: 23.30,
        width: 1.45,
        grammage: 234
    }]

    function handleEdit(id: number) {
        if (!editingFabrics.includes(id))
            setEditingFabrics([...editingFabrics, id])
    }

    function cancelEdit(id: number) {
        setEditingFabrics(editingFabrics.filter(elm => elm !== id))
    }

    function saveEdit(id: number, data: any) {

    }

    return (
        <Flex flexDir="column" as="main" flex={1} mt={4}>
            <Heading size="lg" color="teal.500">Tecidos</Heading>
            <Flex flexDir="column" mt={4} as={Form} onSubmit={() => {}}>
                <Flex>
                    <Select isRequired name="provider_id" w={56} placeholder="Selecione o fornecedor">
                        <option value={1}>Makro</option>
                    </Select>
                    <Input isRequired w={80} ml={4} autoComplete="off" name="name" placeholder="Nome do tecido" />
                </Flex>
                <Flex mt={4}>
                    <MaskInput isRequired w={32} name="grammage" mask="_" placeholder="Gramatura" format="###" />
                    <MaskInput
                        isRequired
                        ml={4}
                        w={32}
                        name="width"
                        placeholder="Largura"
                        decimalSeparator=","
                        decimalScale={2}
                        fixedDecimalScale />
                    <MaskInput
                        w={32}
                        isRequired
                        ml={4}
                        placeholder="Preço"
                        decimalSeparator=","
                        decimalScale={2}
                        fixedDecimalScale
                        name="price" />
                    <Button colorScheme="teal" ml={4} type="submit">Cadastrar</Button>
                </Flex>
            </Flex>
            <Stack mt={4}>
                {fabrics.map(fabric => editingFabrics.includes(fabric.id) ? (
                    <Flex
                        key={fabric.id}
                        alignItems="center"
                        width={750}
                        justifyContent="space-between"
                        borderRadius={7}
                        p={3}
                        borderWidth="1px"
                        onSubmit={data => saveEdit(fabric.id, data)}
                        initialData={fabric}
                        as={Form}>
                        <Select isRequired name="provider_id" w={32} h={8}>
                            <option value={1}>Makro</option>
                            <option value={2}>Pettenati</option>
                        </Select>
                        <Input isRequired w={44} h={8} name="name" placeholder="Nome do tecido" />
                        <MaskInput isRequired h={8} w={20} name="grammage" mask="_" placeholder="Gram." format="###" />
                        <MaskInput
                            w={20}
                            h={8}
                            isRequired
                            name="width"
                            placeholder="Larg."
                            decimalSeparator=","
                            decimalScale={2}
                            fixedDecimalScale />
                        <MaskInput
                            w={24}
                            h={8}
                            isRequired
                            placeholder="Preço"
                            decimalSeparator=","
                            decimalScale={2}
                            fixedDecimalScale
                            name="price" />
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
                                onClick={() => cancelEdit(fabric.id)}
                                icon={<FiX />} />
                        </Flex>
                    </Flex>
                ): (
                    <Flex
                        key={fabric.id}
                        alignItems="center"
                        width={750}
                        justifyContent="space-between"
                        borderRadius={7}
                        p={3}
                        borderWidth="1px">
                        <Text>{fabric.provider_name}</Text>
                        <Text>{fabric.name}</Text>
                        <Text>{fabric.grammage} g/m²</Text>
                        <Text>{fabric.width} m</Text>
                        <Text>{fabric.price.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</Text>
                        <Flex>
                            <IconButton
                                size="sm"
                                colorScheme="orange"
                                aria-label="Editar fornecedor"
                                onClick={() => handleEdit(fabric.id)}
                                icon={<FiEdit />} />
                            <IconButton
                                ml={1}
                                size="sm"
                                colorScheme="red"
                                aria-label="Apagar fornecedor"
                                icon={<FiTrash2 />} />
                        </Flex>
                    </Flex>
                ))}
            </Stack>
        </Flex>
    )
}

export default withSidebar(Fabrics)