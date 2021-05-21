import { Button,Flex, Heading, IconButton,
    Stack, Text, Alert, AlertIcon, AlertDescription,
    CloseButton, AlertTitle } from "@chakra-ui/react"
import withSidebar from "../hooks/withSidebar"
import { Form } from '@unform/web'
import { Input, MaskInput } from "../components/Form"
import { FiEdit, FiTrash2, FiCheck, FiX } from 'react-icons/fi'
import { useState } from "react"
import { useGet } from "../hooks/useGet"
import api from "../services/api"

interface Provider {
    id: number
    name: string
    tax: number
}

const Providers = () => {
    const [editingProviders, setEditingProviders] = useState<number[]>([])
    const { data: providers, mutate } = useGet<Provider[]>('/providers')
    const [submitLoading, setSubmitLoading] = useState(false)
    const [deleteError, setDeleteError] = useState(false)

    function handleSubmit(data: any) {
        data.tax = Number(data.tax.slice(0, -1))
        setSubmitLoading(true)
        api.post('/providers', data)
        .then(() => mutate())
        .catch(e => {
            console.log(e.response)
        }).finally(() => setSubmitLoading(false))
    }

    function handleDelete(id: number) {
        api.delete(`/providers/${id}`)
        .then(() => mutate())
        .catch(e => {
            if (e.response?.data?.message === 'There are fabrics linked to this provider')
                return setDeleteError(true)

            console.log(e.response)
        })
    }

    function handleEdit(id: number) {
        if (!editingProviders.includes(id))
            setEditingProviders([...editingProviders, id])
    }

    function cancelEdit(id: number) {
        setEditingProviders(editingProviders.filter(elm => elm !== id))
    }

    function saveEdit(id: number, data: any) {
        data.tax = Number(data.tax.slice(0, -1))
        api.put(`/providers/${id}`, data)
        .then(res => {
            mutate()
            cancelEdit(id)
        }).catch(e => {
            console.log(e.response)
        })
    }

    return (
        <Flex flexDir="column" as="main" flex={1} mt={4}>
            <Heading size="lg" color="teal.500">Fornecedores</Heading>
            <Flex alignItems="flex-end" mt={4} as={Form} onSubmit={handleSubmit}>
                <Input w={80} isRequired autoComplete="off" name="name" placeholder="Digite o nome" />
                <MaskInput w={32} isRequired ml={4} autoComplete="off" name="tax" placeholder="Imposto" suffix="%" />
                <Button isLoading={submitLoading} colorScheme="teal" ml={4} type="submit">Cadastrar</Button>
            </Flex>
            {deleteError && (
                <Alert w={750} mt={4} status="warning">
                    <AlertIcon />
                    <AlertTitle mr={2}>Não foi possível excluir este fornecedor!</AlertTitle>
                    <AlertDescription>Ainda existem tecidos atrelados a ele.</AlertDescription>
                    <CloseButton onClick={() => setDeleteError(false)} position="absolute" right="8px" top="8px" />
                </Alert>
            )}
            <Stack mt={4}>
                {providers?.map(provider => editingProviders.includes(provider.id) ? (
                    <Flex
                        key={provider.id}
                        alignItems="center"
                        width={600}
                        justifyContent="space-between"
                        borderRadius={7}
                        p={3}
                        borderWidth="1px"
                        onSubmit={data => saveEdit(provider.id, data)}
                        initialData={{
                            ...provider,
                            tax: Number(provider.tax)
                        }}
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
                        <Text>{Number(provider.tax)}%</Text>
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
                                onClick={() => handleDelete(provider.id)}
                                icon={<FiTrash2 />} />
                        </Flex>
                    </Flex>
                ))}
            </Stack>
        </Flex>
    )
}

export default withSidebar(Providers)