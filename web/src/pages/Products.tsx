import { Flex, Heading, Stack, Text, IconButton, Button } from "@chakra-ui/react"
import withSidebar from "../hooks/withSidebar"
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import { useGet } from "../hooks/useGet"
import { Link } from "react-router-dom"

interface Product {
    id: number
    ref: string
    name: string
    group_name: string
    cost: number
    price: number
    profit: number
}


const Products = () => {
    const { data: products } = useGet<Product[]>('/products')

    function handleDelete(id: number) {

    }

    return (
        <Flex flexDir="column" as="main" flex={1} mt={4}>
            <Heading size="lg" color="teal.500">Produtos</Heading>
            <Flex mt={4}>
                <Button colorScheme="teal" to="/products/new" as={Link}>
                    Novo
                </Button>
            </Flex>
            <Stack mt={4}>
                {products?.map(product => (
                    <Flex
                        key={product.id}
                        alignItems="center"
                        width={750}
                        justifyContent="space-between"
                        borderRadius={7}
                        p={3}
                        borderWidth="1px">
                        <Text>{product.group_name}</Text>
                        <Text>{product.ref}</Text>
                        <Text>{product.name}</Text>
                        <Text>{product.cost.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</Text>
                        <Text>{product.price.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</Text>
                        <Text>{product.profit.toLocaleString('pt-BR')} %</Text>
                        <Flex>
                            <IconButton
                                size="sm"
                                colorScheme="orange"
                                aria-label="Editar tecido"
                                onClick={() => {}}
                                icon={<FiEdit />} />
                            <IconButton
                                ml={1}
                                size="sm"
                                colorScheme="red"
                                aria-label="Apagar tecido"
                                onClick={() => handleDelete(product.id)}
                                icon={<FiTrash2 />} />
                        </Flex>
                    </Flex>
                ))}
            </Stack>
        </Flex>
    )
}

export default withSidebar(Products)