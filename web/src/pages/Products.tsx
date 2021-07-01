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
  Td,
  Modal,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react'
import withSidebar from '../hooks/withSidebar'
import { FiEdit, FiTrash2, FiEye } from 'react-icons/fi'
import { useGet } from '../hooks/useGet'
import { Link, useHistory } from 'react-router-dom'
import api from '../services/api'
import { useRef, useState } from 'react'
import IProduct from '../types/IProduct'
import IGroup from '../types/IGroup'
import getProducts from '../hooks/getProducts'
import { Input } from '../components/Form'
import { Form } from '@unform/web'
import IDetailedProduct from '../types/IDetailedProduct'

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

  const {
    isOpen: viewProductIsOpen,
    onClose: viewProcutsOnClose,
    onOpen: viewProductOnOpen
  } = useDisclosure()
  const [viewProduct, setViewProduct] = useState<IProduct | null>(null)
  const { data: viewProductDetails } = useGet<IDetailedProduct>(
    `/products/${viewProduct?.id || null}`
  )

  console.log(viewProductDetails)

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

      <Flex
        as={Form}
        onSubmit={(data: any) => handleSearch(data)}
        mt={4}
        gridGap={4}>
        <Button colorScheme="teal" to="/products/new" as={Link}>
          Novo
        </Button>
        <Select
          width="max-content"
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
          width="max-content"
          name="search"
          placeholder="Digite para pesquisar"
        />
      </Flex>

      {viewProduct && (
        <Modal
          size="4xl"
          isOpen={viewProductIsOpen}
          onClose={viewProcutsOnClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {viewProduct.ref} - {viewProduct.name}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Flex alignItems="flex-start" gridGap={8}>
                <Flex flex={1} flexDir="column">
                  <Flex justifyContent="space-between">
                    <Text color="gray.600">Coleção:</Text>
                    <Text color="gray.700">{viewProduct.group.name}</Text>
                  </Flex>
                  <Flex justifyContent="space-between">
                    <Text color="gray.600">Referência:</Text>
                    <Text color="gray.700">{viewProduct.ref}</Text>
                  </Flex>
                  <Flex justifyContent="space-between">
                    <Text color="gray.600">Nome:</Text>
                    <Text color="gray.700">{viewProduct.name}</Text>
                  </Flex>
                  <Flex justifyContent="space-between">
                    <Text color="gray.600">Custo:</Text>
                    <Text color="gray.700">
                      {viewProduct.cost.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      })}
                    </Text>
                  </Flex>
                  <Flex justifyContent="space-between">
                    <Text color="gray.600">Preço:</Text>
                    <Text color="gray.700">
                      {viewProduct.price?.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      })}
                    </Text>
                  </Flex>
                  <Flex justifyContent="space-between">
                    <Text color="gray.600">Lucro:</Text>
                    <Text color="gray.700">
                      {viewProduct.profit
                        ? viewProduct.profit?.toLocaleString('pt-br', {
                            maximumFractionDigits: 1,
                            minimumFractionDigits: 1
                          }) + ' %'
                        : '-'}
                    </Text>
                  </Flex>
                  <Flex justifyContent="space-between">
                    <Text color="gray.600">Criado em:</Text>
                    <Text color="gray.700">
                      {new Date(viewProduct.createdAt).toLocaleString('pt-br', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: 'numeric',
                        minute: '2-digit'
                      })}
                    </Text>
                  </Flex>
                  <Flex justifyContent="space-between">
                    <Text color="gray.600">Últ. Modificação:</Text>
                    <Text color="gray.700">
                      {new Date(viewProduct.updatedAt).toLocaleString('pt-br', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: 'numeric',
                        minute: '2-digit'
                      })}
                    </Text>
                  </Flex>
                </Flex>
                <Table flex={1} borderWidth="1px">
                  <Thead>
                    <Tr bg="gray.50">
                      <Th textAlign="center" colSpan={2}>
                        Custos
                      </Th>
                    </Tr>
                    <Tr>
                      <Th py={2}>Nome</Th>
                      <Th py={2} isNumeric>
                        Valor
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {!viewProductDetails ? (
                      <>
                        <Tr>
                          <Skeleton as={Td}>A</Skeleton>
                        </Tr>
                        <Tr>
                          <Skeleton as={Td}>A</Skeleton>
                        </Tr>
                        <Tr>
                          <Skeleton as={Td}>A</Skeleton>
                        </Tr>
                      </>
                    ) : (
                      viewProductDetails.costs.map((cost) => (
                        <Tr key={cost.id}>
                          <Td py={2}>{cost.name}</Td>
                          <Td py={2} isNumeric>
                            {cost.value.toLocaleString('pt-BR', {
                              style: 'currency',
                              currency: 'BRL'
                            })}
                          </Td>
                        </Tr>
                      ))
                    )}
                  </Tbody>
                </Table>
              </Flex>
              <Table borderWidth="1px" mt={8}>
                <Thead>
                  <Tr bg="gray.50">
                    <Th colSpan={5} textAlign="center">
                      Tecidos
                    </Th>
                  </Tr>
                  <Tr>
                    <Th>Fornecedor</Th>
                    <Th>Nome</Th>
                    <Th isNumeric>Preço</Th>
                    <Th isNumeric>Rendimento</Th>
                    <Th isNumeric>Subtotal</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {!viewProductDetails ? (
                    <>
                      <Tr>
                        <Skeleton as={Td}>A</Skeleton>
                      </Tr>
                      <Tr>
                        <Skeleton as={Td}>A</Skeleton>
                      </Tr>
                      <Tr>
                        <Skeleton as={Td}>A</Skeleton>
                      </Tr>
                    </>
                  ) : (
                    viewProductDetails.fabrics.map((fabric) => (
                      <Tr key={fabric.id}>
                        <Td py={2}>{fabric.fabric.provider.name}</Td>
                        <Td py={2}>{fabric.fabric.name}</Td>
                        <Td py={2} isNumeric>
                          {fabric.finalPrice.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          })}
                        </Td>
                        <Td py={2} isNumeric>
                          {fabric.efficiency.toLocaleString('pt-BR', {
                            minimumFractionDigits: 3
                          })}
                        </Td>
                        <Td py={2} isNumeric>
                          {fabric.subtotal.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          })}
                        </Td>
                      </Tr>
                    ))
                  )}
                </Tbody>
              </Table>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}

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
                    colorScheme="blue"
                    aria-label="Visualizar produto"
                    onClick={() => {
                      setViewProduct(product)
                      viewProductOnOpen()
                    }}
                    icon={<FiEye />}
                  />
                  <IconButton
                    size="sm"
                    ml={1}
                    borderRadius={7}
                    colorScheme="orange"
                    aria-label="Editar produto"
                    onClick={() => history.push(`/products/${product.id}`)}
                    icon={<FiEdit />}
                  />
                  <IconButton
                    borderRadius={7}
                    size="sm"
                    ml={1}
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
