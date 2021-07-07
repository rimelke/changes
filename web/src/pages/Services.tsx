import {
  Flex,
  Heading,
  Table,
  Tbody,
  Thead,
  Th,
  Tr,
  Td,
  Badge,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  useToast,
  IconButton,
  Text
} from '@chakra-ui/react'
import { Form } from '@unform/web'
import { useState, FC } from 'react'

import {
  Input,
  CreatableSelect,
  SearchableSelect,
  MaskInput
} from '../components/Form'
import { IGetProductsData } from '../hooks/getProducts'
import { useGet } from '../hooks/useGet'
import withSidebar from '../hooks/withSidebar'
import api from '../services/api'
import INeedlewoman from '../types/INeedlewoman'
import IService from '../types/IService'
import { FiEye } from 'react-icons/fi'
import IDetailedService from '../types/IDetailedService'

interface ICreateServiceModalProps {
  isOpen: boolean
  onClose: () => void
  servicesMutate: () => Promise<any>
}

interface IServiceProduct {
  productId: string
  name: string
  ref: string
  amount: number
}

interface IViewServiceModalProps {
  viewService: IService | null
  isOpen: boolean
  onClose: () => void
}

const CreateServiceModal: FC<ICreateServiceModalProps> = ({
  isOpen,
  onClose,
  servicesMutate
}) => {
  const { data: needlewomans, mutate: needlewomansMutate } =
    useGet<INeedlewoman[]>('/needlewomans')

  const [serviceProducts, setServiceProducts] = useState<IServiceProduct[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const toast = useToast()

  async function handleSearchProducts(value: string) {
    const { data } = await api.get<IGetProductsData>(
      `/products?${value ? `search=${encodeURIComponent(value)}` : ''}`
    )

    return data.data.map((product) => ({
      label: `${product.ref} - ${product.name}`,
      value: product.id,
      name: product.name,
      ref: product.ref
    }))
  }

  async function handleAddNeedlewoman(name: string) {
    const res = await api.post<INeedlewoman>('/needlewomans', { name })

    const { id: value, name: label } = res.data

    needlewomansMutate()
    return { value, label }
  }

  function handleAddProduct(data: {
    amount: string
    product: {
      value: string
      name: string
      ref: string
    }
  }) {
    if (data.amount && data.product)
      setServiceProducts([
        ...serviceProducts,
        {
          amount: Number(data.amount.replace('.', '')),
          name: data.product.name,
          productId: data.product.value,
          ref: data.product.ref
        }
      ])
  }

  function handleSubmit(data: {
    needlewomanId: string
    deliveryDate: string
    withdrawalDate: string
  }) {
    if (serviceProducts.length > 0 && data.needlewomanId) {
      setIsLoading(true)
      api
        .post('/services', {
          needlewomanId: data.needlewomanId,
          deliveryDate: data.deliveryDate || undefined,
          withdrawalDate: data.withdrawalDate || undefined,
          products: serviceProducts.map((serviceProduct) => ({
            productId: serviceProduct.productId,
            amount: serviceProduct.amount
          }))
        })
        .then(() => {
          onClose()
          servicesMutate()
        })
        .catch(() => {
          setIsLoading(false)
          toast({
            title: 'Um erro inesperado ocorreu!',
            description: 'Recarregue a página e tente novamente',
            status: 'error',
            position: 'bottom-left',
            isClosable: true
          })
        })
    }
  }

  return (
    <Modal size="4xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Adicionar serviço</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Flex justifyContent="space-between" gridGap={8}>
            <Flex
              onSubmit={(data: any) => handleSubmit(data)}
              as={Form}
              flexDir="column"
              gridGap={4}>
              <FormControl isRequired>
                <FormLabel ml={2} fontSize="sm" color="gray.500">
                  Costureira
                </FormLabel>
                <CreatableSelect
                  name="needlewomanId"
                  formatCreateLabel={(inputValue) => `Criar "${inputValue}"`}
                  onCreate={handleAddNeedlewoman}
                  placeholder="Selecione uma costureira"
                  options={
                    needlewomans?.map((needlewoman) => ({
                      label: needlewoman.name,
                      value: needlewoman.id
                    })) || []
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel ml={2} fontSize="sm" color="gray.500">
                  Data de entrega
                </FormLabel>
                <Input mt={-1} name="deliveryDate" type="date" />
              </FormControl>
              <FormControl>
                <FormLabel ml={2} fontSize="sm" color="gray.500">
                  Data de retirada
                </FormLabel>
                <Input mt={-1} name="withdrawalDate" type="date" />
              </FormControl>
              <Button
                mt={4}
                isLoading={isLoading}
                type="submit"
                colorScheme="green">
                Adicionar serviço
              </Button>
            </Flex>
            <Flex
              flex={1}
              as={Form}
              onSubmit={(data: any) => handleAddProduct(data)}
              gridGap={4}
              flexDir="column">
              <Table borderWidth="1px">
                <Thead>
                  <Tr bg="gray.50">
                    <Th textAlign="center" colSpan={3}>
                      Produtos
                    </Th>
                  </Tr>
                  <Tr>
                    <Th>Ref.</Th>
                    <Th>Nome</Th>
                    <Th isNumeric>QTD</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {serviceProducts.map((serviceProduct, index) => (
                    <Tr
                      key={`${serviceProduct.productId}-${serviceProduct.amount}-${index}`}>
                      <Td>{serviceProduct.ref}</Td>
                      <Td>{serviceProduct.name}</Td>
                      <Td isNumeric>{serviceProduct.amount}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <SearchableSelect
                defaultOptions
                name="product"
                returnOption
                cacheOptions
                noOptionsMessage={({ inputValue }) => {
                  return `Nenhum produto encontrado com "${inputValue}"`
                }}
                placeholder="Selecione o produto"
                loadOptions={handleSearchProducts}
              />
              <Flex justifyContent="flex-end" gridGap={4}>
                <MaskInput
                  decimalScale={0}
                  thousandSeparator="."
                  decimalSeparator=","
                  autoComplete="off"
                  name="amount"
                  placeholder="QTD"
                  w={32}
                />
                <Button type="submit">Adicionar produto</Button>
              </Flex>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

const ViewServiceModal: FC<IViewServiceModalProps> = ({
  viewService,
  isOpen,
  onClose
}) => {
  const { data } = useGet<IDetailedService>(
    `/services/${viewService?.id || null}`
  )

  console.log(data)
  const BasicInfo: FC<{
    label: string
    value: any
  }> = ({ label, value }) => (
    <Flex justifyContent="space-between">
      <Text>{label}</Text>
      <Text>{value}</Text>
    </Flex>
  )

  return (
    <Modal size="6xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Visualizar serviço - #{viewService?.incrementId}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6} gridGap={8} display="flex">
          <Flex w="md" gridGap={1} flexDir="column">
            <BasicInfo label="ID" value={'#' + viewService?.incrementId} />
            <BasicInfo
              label="Costureira"
              value={viewService?.needlewoman.name}
            />
            <BasicInfo label="QTD Total" value={viewService?.amount} />

            <BasicInfo
              label="Valor total"
              value={viewService?.value.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })}
            />
            <BasicInfo
              label="Entrega"
              value={
                viewService?.deliveryDate &&
                new Date(
                  viewService.deliveryDate + ' 00:00'
                ).toLocaleDateString('pt-br')
              }
            />
            <BasicInfo
              label="Retirada"
              value={
                viewService?.withdrawalDate &&
                new Date(
                  viewService.withdrawalDate + ' 00:00'
                ).toLocaleDateString('pt-br')
              }
            />
            <BasicInfo
              label="Pago"
              value={viewService?.isPayed ? 'SIM' : 'NÃO'}
            />
            <BasicInfo
              label="Criado em"
              value={
                viewService?.createdAt &&
                new Date(viewService.createdAt).toLocaleString('pt-br', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: 'numeric',
                  minute: '2-digit'
                })
              }
            />
            <BasicInfo
              label="Últ. Modificação"
              value={
                viewService?.updatedAt &&
                new Date(viewService.updatedAt).toLocaleString('pt-br', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: 'numeric',
                  minute: '2-digit'
                })
              }
            />
          </Flex>
          <Table borderWidth="1px">
            <Thead>
              <Tr bg="gray.50">
                <Th textAlign="center" colSpan={5}>
                  Produtos
                </Th>
              </Tr>
              <Tr>
                <Th>Ref</Th>
                <Th>Nome</Th>
                <Th isNumeric>QTD</Th>
                <Th isNumeric>Valor unit.</Th>
                <Th isNumeric>Valor total</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data &&
                data.products.map((serviceProduct) => (
                  <Tr key={serviceProduct.id}>
                    <Td>{serviceProduct.product.ref}</Td>
                    <Td>{serviceProduct.product.name}</Td>
                    <Td isNumeric>{serviceProduct.amount}</Td>
                    <Td isNumeric>
                      {serviceProduct.unitValue.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      })}
                    </Td>
                    <Td isNumeric>
                      {serviceProduct.totalValue.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      })}
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

const Services = () => {
  const { data: services, mutate: servicesMutate } =
    useGet<IService[]>('/services')

  const [viewService, setViewService] = useState<IService | null>(null)

  const {
    isOpen: newServiceIsOpen,
    onClose: newServiceOnClose,
    onOpen: newServiceOnOpen
  } = useDisclosure()
  const {
    isOpen: viewServiceIsOpen,
    onClose: viewServiceOnClose,
    onOpen: viewServiceOnOpen
  } = useDisclosure()

  return (
    <Flex as="main" flexDir="column" flex={1} mb={8} mt={4} mr={8}>
      <Heading size="lg" color="teal.500">
        Serviços
      </Heading>

      <Flex mt={4}>
        <Button onClick={newServiceOnOpen} colorScheme="teal">
          Adicionar
        </Button>
      </Flex>

      {newServiceIsOpen && (
        <CreateServiceModal
          servicesMutate={servicesMutate}
          isOpen={newServiceIsOpen}
          onClose={newServiceOnClose}
        />
      )}

      <ViewServiceModal
        isOpen={viewServiceIsOpen}
        onClose={viewServiceOnClose}
        viewService={viewService}
      />

      <Table mt={4} borderWidth="1px">
        <Thead>
          <Tr>
            <Th isNumeric>ID</Th>
            <Th>Costureira</Th>
            <Th isNumeric>QTD</Th>
            <Th isNumeric>Valor</Th>
            <Th textAlign="center">Entrega</Th>
            <Th textAlign="center">Retirada</Th>
            <Th textAlign="center">Pago</Th>
            <Th textAlign="center">Situação</Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody>
          {services?.map((service) => (
            <Tr _hover={{ bg: 'gray.50' }} key={service.id}>
              <Td isNumeric>#{service.incrementId}</Td>
              <Td>{service.needlewoman.name}</Td>
              <Td isNumeric>{service.amount}</Td>
              <Td fontWeight="semibold" isNumeric>
                {service.value.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </Td>
              <Td textAlign="center">
                {service.deliveryDate &&
                  new Date(service.deliveryDate + ' 00:00').toLocaleDateString(
                    'pt-br'
                  )}
              </Td>
              <Td textAlign="center">
                {service.withdrawalDate &&
                  new Date(
                    service.withdrawalDate + ' 00:00'
                  ).toLocaleDateString('pt-br')}
              </Td>
              <Td textAlign="center">
                {service.isPayed ? (
                  <Badge colorScheme="green">SIM</Badge>
                ) : (
                  <Badge colorScheme="red">NÃO</Badge>
                )}
              </Td>
              <Td
                fontWeight="semibold"
                textAlign="center"
                color={
                  !service.deliveryDate
                    ? 'red.500'
                    : !service.withdrawalDate
                    ? 'orange.500'
                    : !service.isPayed
                    ? 'yellow.500'
                    : 'green.500'
                }>
                {!service.deliveryDate
                  ? 'Entregar'
                  : !service.withdrawalDate
                  ? 'Retirar'
                  : !service.isPayed
                  ? 'Pagar'
                  : 'Concluído'}
              </Td>
              <Td isNumeric>
                <IconButton
                  aria-label="Visualizar serviço"
                  size="sm"
                  borderRadius={7}
                  onClick={() => {
                    setViewService(service)
                    viewServiceOnOpen()
                  }}
                  colorScheme="blue"
                  icon={<FiEye />}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
  )
}

export default withSidebar(Services)
