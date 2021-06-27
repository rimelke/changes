import {
  Flex,
  Heading,
  Stack,
  Text,
  IconButton,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  Box,
  AlertDialogFooter,
  Select,
  Skeleton
} from '@chakra-ui/react'
import withSidebar from '../hooks/withSidebar'
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import { useGet } from '../hooks/useGet'
import { Link, useHistory } from 'react-router-dom'
import api from '../services/api'
import { useRef, useState } from 'react'
import IProduct from '../types/IProduct'
import IGroup from '../types/IGroup'
import getProducts from '../hooks/getProducts'
import { Input } from '../components/Form'
import { Form } from '@unform/web'

const Products = () => {
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const { data: products, mutate } = getProducts({
    groupId: selectedGroupId,
    search
  })
  const { data: groups } = useGet<IGroup[]>('/groups')

  const history = useHistory()

  const cancelRef = useRef(null)

  const [isOpen, setIsOpen] = useState(false)

  const [deletingProduct, setDeletingProduct] = useState<IProduct | null>(null)

  function onClose() {
    setIsOpen(false)
    setDeletingProduct(null)
  }

  function handleDelete(product: IProduct) {
    setDeletingProduct(product)
    setIsOpen(true)
  }

  function confirmDelete() {
    if (deletingProduct) {
      api
        .delete(`/products/${deletingProduct.id}`)
        .then((res) => {
          mutate()
          onClose()
        })
        .catch((e) => {
          if (e.response) {
            console.log(e.response)
          } else console.log(e)
        })
    }
  }

  function handleSearch(data: { search: string }) {
    setSearch(data.search)
  }

  return (
    <Flex flexDir="column" as="main" flex={1} mt={4} pr={8}>
      <Heading size="lg" color="teal.500">
        Produtos
      </Heading>
      <Flex mt={4}>
        <Button colorScheme="teal" to="/products/new" as={Link}>
          Novo
        </Button>
      </Flex>
      <Flex as={Form} onSubmit={(data: any) => handleSearch(data)} mt={4}>
        <Select
          flex={1}
          onChange={(e) =>
            setSelectedGroupId(e.target.value === '' ? null : e.target.value)
          }
          placeholder="Filtre por coleção">
          {groups?.map((group) => (
            <option value={group.id} key={group.id}>
              {group.name}
            </option>
          ))}
        </Select>
        <Input
          name="search"
          placeholder="Digite para pesquisar"
          flex={3}
          ml={4}
        />
      </Flex>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Apagar produto
            </AlertDialogHeader>
            <AlertDialogBody>
              Tem certeza que quer apagar{' '}
              <Text as="span" fontWeight="bold">
                {deletingProduct?.ref}
              </Text>{' '}
              -{' '}
              <Text as="span" fontWeight="bold">
                {deletingProduct?.name}
              </Text>{' '}
              ?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={onClose} ref={cancelRef}>
                Cancelar
              </Button>
              <Button onClick={confirmDelete} ml={4} colorScheme="red">
                Apagar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <Stack mt={4}>
        <Flex
          alignItems="center"
          borderRadius={7}
          px={3}
          py={1}
          borderWidth="1px">
          <Text fontWeight="bold" flex={2}>
            Coleção
          </Text>
          <Text fontWeight="bold" flex={1}>
            Ref.
          </Text>
          <Text fontWeight="bold" flex={3}>
            Nome
          </Text>
          <Text fontWeight="bold" textAlign="center" flex={1}>
            Custo
          </Text>
          <Text fontWeight="bold" textAlign="center" flex={1}>
            Preço
          </Text>
          <Text fontWeight="bold" textAlign="center" flex={1}>
            Lucro
          </Text>
          <Box w="68px" />
        </Flex>
        {!products ? (
          <>
            <Skeleton p={3} borderRadius={7}>
              A
            </Skeleton>
            <Skeleton p={3} borderRadius={7}>
              A
            </Skeleton>
            <Skeleton p={3} borderRadius={7}>
              A
            </Skeleton>
          </>
        ) : (
          products?.map((product) => (
            <Flex
              key={product.id}
              alignItems="center"
              borderRadius={7}
              p={3}
              _hover={{ bg: 'gray.50' }}
              borderWidth="1px">
              <Text flex={2}>{product.group.name}</Text>
              <Text flex={1}>{product.ref}</Text>
              <Text flex={3}>{product.name}</Text>
              <Text textAlign="center" flex={1}>
                {Number(product.cost).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </Text>
              <Text textAlign="center" flex={1}>
                {Number(product.price)?.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </Text>
              <Text
                textAlign="center"
                flex={1}
                fontWeight="bold"
                color={
                  Number(product.profit) >= Number(product.group.minimum)
                    ? Number(product.profit) >= Number(product.group.desired)
                      ? 'green.500'
                      : 'yellow.500'
                    : 'red.500'
                }>
                {Number(product.profit).toLocaleString('pt-br', {
                  maximumFractionDigits: 1,
                  minimumFractionDigits: 1
                })}
                %
              </Text>
              <Flex w="68px">
                <IconButton
                  size="sm"
                  colorScheme="orange"
                  aria-label="Editar tecido"
                  onClick={() => history.push(`/products/${product.id}`)}
                  icon={<FiEdit />}
                />
                <IconButton
                  ml={1}
                  size="sm"
                  colorScheme="red"
                  aria-label="Apagar tecido"
                  onClick={() => handleDelete(product)}
                  icon={<FiTrash2 />}
                />
              </Flex>
            </Flex>
          ))
        )}
      </Stack>
    </Flex>
  )
}

export default withSidebar(Products)
