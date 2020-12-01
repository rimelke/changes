import { Button, Flex, FormControl, FormLabel, Heading, IconButton, Stack, Text } from "@chakra-ui/react"
import withSidebar from "../hooks/withSidebar"
import { Form } from '@unform/web'
import { Input, MaskInput } from "../components/Form"
import { FiEdit, FiTrash2, FiCheck, FiX } from 'react-icons/fi'
import { useState } from "react"

const Providers = () => {
    const [editingProviders, setEditingProviders] = useState<number[]>([])

    const providers = [{
        id: 1,
        name: 'Makro',
        tax: 14
    }, {
        id: 2,
        name: 'Pettenati',
        tax: 6
    }]

    function handleEdit(id: number) {
        if (!editingProviders.includes(id))
            setEditingProviders([...editingProviders, id])
    }

    function cancelEdit(id: number) {
        setEditingProviders(editingProviders.filter(elm => elm !== id))
    }

    function saveEdit(id: number, data: any) {

    }

    return (
        <Flex flexDir="column" as="main" flex={1} mt={4}>
            <Heading size="lg" color="teal.500">Fornecedores</Heading>
            <Flex alignItems="flex-end" mt={4} as={Form} onSubmit={() => {}}>
                <Input w={80} isRequired autoComplete="off" name="name" placeholder="Digite o nome" />
                <MaskInput w={32} isRequired ml={4} autoComplete="off" name="tax" placeholder="Imposto" suffix="%" />
                <Button colorScheme="teal" ml={4} type="submit">Cadastrar</Button>
            </Flex>
            <Stack mt={4}>
                {providers.map(provider => editingProviders.includes(provider.id) ? (
                    <Flex
                        key={provider.id}
                        alignItems="center"
                        width={600}
                        justifyContent="space-between"
                        borderRadius={7}
                        p={3}
                        borderWidth="1px"
                        onSubmit={data => saveEdit(provider.id, data)}
                        initialData={provider}
                        as={Form}>
                        <Input isRequired w={300} h={8} name="name" placeholder="Nome do fornecedor" />
                        <MaskInput isRequired suffix="%" w={100} h={8} name="tax" placeholder="Imposto" />
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
                                onClick={() => cancelEdit(provider.id)}
                                icon={<FiX />} />
                        </Flex>
                    </Flex>
                ): (
                    <Flex
                        key={provider.id}
                        alignItems="center"
                        width={600}
                        justifyContent="space-between"
                        borderRadius={7}
                        p={3}
                        borderWidth="1px">
                        <Text>{provider.name}</Text>
                        <Text>{provider.tax}%</Text>
                        <Flex>
                            <IconButton
                                size="sm"
                                colorScheme="orange"
                                aria-label="Editar fornecedor"
                                onClick={() => handleEdit(provider.id)}
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

export default withSidebar(Providers)