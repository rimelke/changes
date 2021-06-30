import {
  Flex,
  Heading,
  Text,
  IconButton,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Select,
  Skeleton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td
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

      <Table borderWidth="1px" mt={4}>
        <Thead>
          <Tr>
            <Th>Coleção</Th>
            <Th>Ref.</Th>
            <Th>Nome</Th>
            <Th isNumeric>Custo</Th>
            <Th isNumeric>Preço</Th>
            <Th isNumeric>Lucro</Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody>
          {!products ? (
            <>
              {' '}
              <Tr>
                <Skeleton colspan={7} as={Td}>
                  A
                </Skeleton>
              </Tr>
              <Tr>
                <Skeleton colspan={7} as={Td}>
                  A
                </Skeleton>
              </Tr>
              <Tr>
                <Skeleton colspan={7} as={Td}>
                  A
                </Skeleton>
              </Tr>
            </>
          ) : (
            products.map((product) => (
              <Tr _hover={{ bg: 'gray.50' }} key={product.id}>
                <Td>{product.group.name}</Td>
                <Td>{product.ref}</Td>
                <Td>{product.name}</Td>
                <Td isNumeric>
                  {product.cost.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </Td>
                <Td isNumeric>
                  {product.price.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </Td>
                <Td
                  fontWeight="bold"
                  color={
                    product.profit >= product.group.minimum
                      ? product.profit >= product.group.desired
                        ? 'green.500'
                        : 'yellow.500'
                      : 'red.500'
                  }
                  isNumeric>
                  {Number(product.profit).toLocaleString('pt-br', {
                    maximumFractionDigits: 1,
                    minimumFractionDigits: 1
                  })}
                  %
                </Td>
                <Td isNumeric>
                  <IconButton
                    size="sm"
                    borderRadius={7}
                    colorScheme="orange"
                    aria-label="Editar produto"
                    onClick={() => history.push(`/products/${product.id}`)}
                    icon={<FiEdit />}
                  />
                  <IconButton
                    ml={1}
                    borderRadius={7}
                    size="sm"
                    colorScheme="red"
                    aria-label="Apagar produto"
                    onClick={() => handleDelete(product)}
                    icon={<FiTrash2 />}
                  />
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </Flex>
  )
}

export default withSidebar(Products)
