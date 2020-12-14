import { Flex, Heading, Stack, Text, IconButton, Button,
    AlertDialog, AlertDialogOverlay, AlertDialogContent,
    AlertDialogHeader, 
    AlertDialogBody,
    AlertDialogFooter} from "@chakra-ui/react"
import withSidebar from "../hooks/withSidebar"
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import { useGet } from "../hooks/useGet"
import { Link } from "react-router-dom"
import api from "../services/api"
import { useRef, useState } from "react"
import { mutate } from "swr"

interface Product {
    id: number
    ref: string
    name: string
    group_name: string
    minimum: number
    desired: number
    cost: number
    price: number
    profit: number
}


const Products = () => {
    const { data: products, mutate } = useGet<Product[]>('/products')

    const cancelRef = useRef(null)

    const [isOpen, setIsOpen] = useState(false)
    const [deletingProduct, setDeletingProduct] = useState<Product | null>(null)

    function onClose() {
        setIsOpen(false)
        setDeletingProduct(null)
    }

    function handleDelete(product: Product) {
        setDeletingProduct(product)
        setIsOpen(true)
    }

    function confirmDelete() {
        if (deletingProduct) {
            api.delete(`/products/${deletingProduct.id}`)
            .then(res => {
                mutate()
                onClose()
            }).catch(e => {
                if (e.response)
                    console.log(e.response)
                else console.log(e)
            })
        }
    }

    return (
        <Flex flexDir="column" as="main" flex={1} mt={4}>
            <Heading size="lg" color="teal.500">Produtos</Heading>
            <Flex mt={4}>
                <Button colorScheme="teal" to="/products/new" as={Link}>
                    Novo
                </Button>
            </Flex>
            <AlertDialog leastDestructiveRef={cancelRef} onClose={onClose} isOpen={isOpen}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Apagar produto
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            Tem certeza que quer apagar {" "}
                            <Text as="span" fontWeight="bold">
                                {deletingProduct?.ref}
                            </Text>
                            {" "}-{" "}
                            <Text as="span" fontWeight="bold">
                                {deletingProduct?.name}
                            </Text>
                            {" "}?
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button onClick={onClose} ref={cancelRef}>Cancelar</Button>
                            <Button onClick={confirmDelete} ml={4} colorScheme="red">Apagar</Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
            <Stack mt={4}>
                {products?.map(product => (
                    <Flex
                        key={product.id}
                        alignItems="center"
                        width={750}
                        justifyContent="space-between"
                        borderRadius={7}
                        p={3}
                        _hover={{bg: 'gray.50'}}
                        borderWidth="1px">
                        <Text>{product.group_name}</Text>
                        <Text>{product.ref}</Text>
                        <Text>{product.name}</Text>
                        <Text>{product.cost.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</Text>
                        <Text>{product.price.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</Text>
                        <Text fontWeight="bold" color={
                            product.profit >= product.minimum
                            ? product.profit >= product.desired
                            ? 'green.500'
                            : 'yellow.500'
                            : 'red.500'
                        }>{product.profit}%</Text>
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
                                onClick={() => handleDelete(product)}
                                icon={<FiTrash2 />} />
                        </Flex>
                    </Flex>
                ))}
            </Stack>
        </Flex>
    )
}

export default withSidebar(Products)