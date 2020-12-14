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

interface Group {
    id: number
    name: string
    profit: number
    desired: number
    minimum: number
}

const Groups = () => {
    const [editingGroups, setEditingGroups] = useState<number[]>([])
    const { data: groups, mutate } = useGet<Group[]>('/groups')
    const [submitLoading, setSubmitLoading] = useState(false)
    const [deleteError, setDeleteError] = useState(false)

    function handleSubmit(data: any) {
        data.desired = Number(data.desired.slice(0, -1).replace(',', '.'))
        data.minimum = Number(data.minimum.slice(0, -1).replace(',', '.'))
        setSubmitLoading(true)
        api.post('/groups', data)
        .then(() => mutate())
        .catch(e => {
            console.log(e.response)
        }).finally(() => setSubmitLoading(false))
    }

    function handleDelete(id: number) {
        api.delete(`/groups/${id}`)
        .then(() => mutate())
        .catch(e => {
            if (e.response?.data?.message === 'There are products linked to this group')
                return setDeleteError(true)

            console.log(e.response)
        })
    }

    function handleEdit(id: number) {
        if (!editingGroups.includes(id))
            setEditingGroups([...editingGroups, id])
    }

    function cancelEdit(id: number) {
        setEditingGroups(editingGroups.filter(elm => elm !== id))
    }

    function saveEdit(id: number, data: any) {
        data.desired = Number(data.desired.slice(0, -1).replace(',', '.'))
        data.minimum = Number(data.minimum.slice(0, -1).replace(',', '.'))
        api.put(`/groups/${id}`, data)
        .then(res => {
            mutate()
            cancelEdit(id)
        }).catch(e => {
            console.log(e.response)
        })
    }

    return (
        <Flex flexDir="column" as="main" flex={1} mt={4}>
            <Heading size="lg" color="teal.500">Coleções</Heading>
            <Flex alignItems="flex-end" mt={4} as={Form} onSubmit={handleSubmit}>
                <Input w={44} isRequired autoComplete="off" name="name" placeholder="Nome da coleção" />
                <MaskInput
                    w={40}
                    isRequired
                    ml={4}
                    autoComplete="off"
                    name="minimum"
                    placeholder="Lucro mínimo"
                    decimalSeparator=","
                    decimalScale={1}
                    fixedDecimalScale
                    suffix=" %" />
                <MaskInput
                    w={40}
                    isRequired
                    ml={4}
                    autoComplete="off"
                    name="desired"
                    placeholder="Lucro desejado"
                    decimalSeparator=","
                    decimalScale={1}
                    fixedDecimalScale
                    suffix=" %" />
                <Button isLoading={submitLoading} colorScheme="teal" ml={4} type="submit">Cadastrar</Button>
            </Flex>
            {deleteError && (
                <Alert w={750} mt={4} status="warning">
                    <AlertIcon />
                    <AlertTitle mr={2}>Não foi possível excluir esta coleção!</AlertTitle>
                    <AlertDescription>Ainda existem produtos atrelados a ela.</AlertDescription>
                    <CloseButton onClick={() => setDeleteError(false)} position="absolute" right="8px" top="8px" />
                </Alert>
            )}
            <Stack mt={4}>
                {groups?.map(group => editingGroups.includes(group.id) ? (
                    <Flex
                        key={group.id}
                        alignItems="center"
                        width={600}
                        justifyContent="space-between"
                        borderRadius={7}
                        p={3}
                        borderWidth="1px"
                        onSubmit={data => saveEdit(group.id, data)}
                        initialData={group}
                        as={Form}>
                        <Input isRequired w={180} h={8} name="name" placeholder="Nome da coleção" />
                        <MaskInput
                            w={28}
                            isRequired
                            h={8}
                            autoComplete="off"
                            name="minimum"
                            placeholder="Lucro mín."
                            decimalSeparator=","
                            decimalScale={1}
                            fixedDecimalScale
                            suffix=" %" />
                        <MaskInput
                            w={28}
                            isRequired
                            h={8}
                            autoComplete="off"
                            name="desired"
                            placeholder="Lucro des."
                            decimalSeparator=","
                            decimalScale={1}
                            fixedDecimalScale
                            suffix=" %" />
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
                                onClick={() => cancelEdit(group.id)}
                                icon={<FiX />} />
                        </Flex>
                    </Flex>
                ): (
                    <Flex
                        key={group.id}
                        alignItems="center"
                        width={600}
                        justifyContent="space-between"
                        borderRadius={7}
                        p={3}
                        borderWidth="1px">
                        <Text>{group.name}</Text>
                        <Text>{group.minimum.toLocaleString('pt-BR')} %</Text>
                        <Text>{group.desired.toLocaleString('pt-BR')} %</Text>
                        <Text fontWeight="bold" color={
                            group.profit >= group.minimum
                            ? group.profit >= group.desired
                            ? 'green.500'
                            : 'yellow.500'
                            : 'red.500'
                        }>{group.profit ? group.profit + ' %' : '-'}</Text>
                        <Flex>
                            <IconButton
                                size="sm"
                                colorScheme="orange"
                                aria-label="Editar fornecedor"
                                onClick={() => handleEdit(group.id)}
                                icon={<FiEdit />} />
                            <IconButton
                                ml={1}
                                size="sm"
                                colorScheme="red"
                                aria-label="Apagar fornecedor"
                                onClick={() => handleDelete(group.id)}
                                icon={<FiTrash2 />} />
                        </Flex>
                    </Flex>
                ))}
            </Stack>
        </Flex>
    )
}

export default withSidebar(Groups)