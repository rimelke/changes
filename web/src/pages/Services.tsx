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
  Text,
  Skeleton
} from '@chakra-ui/react'
import { Form } from '@unform/web'
import { Scope, FormHandles } from '@unform/core'
import { useState, FC, useRef, useEffect } from 'react'
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
import { FiEye, FiEdit, FiX } from 'react-icons/fi'
import IDetailedService from '../types/IDetailedService'
import IProduct from '../types/IProduct'

interface ICreateServiceModalProps {
  isOpen: boolean
  onClose: () => void
  servicesMutate: () => Promise<any>
  needlewomans: INeedlewoman[] | undefined
  needlewomansMutate: () => Promise<any>
}

interface IServiceProduct {
  productId: string
  name?: string
  ref?: string
  amount?: number
  product?: IProduct
}

interface IViewServiceModalProps {
  viewService: IService | null
  isOpen: boolean
  onClose: () => void
}

interface IUpdateServiceModal {
  updateService: IService | null
  isOpen: boolean
  onClose: () => void
  servicesMutate: () => Promise<any>
  needlewomans: INeedlewoman[] | undefined
  needlewomansMutate: () => Promise<any>
}

interface IServiceData {
  needlewomanId: string
  deliveryDate: string | null
  withdrawalDate: string | null
  isPayed?: boolean
  products?: IServiceProduct[]
}

interface IServiceForm {
  initialData?: IServiceData
  onSubmit: (data: IServiceData) => Promise<void>
  servicesMutate: () => Promise<any>
  onClose: () => void
  buttonTitle: string
  needlewomans: INeedlewoman[] | undefined
  needlewomansMutate: () => Promise<any>
}

const ServiceForm: FC<IServiceForm> = ({
  onSubmit,
  initialData,
  servicesMutate,
  onClose,
  buttonTitle,
  needlewomansMutate,
  needlewomans
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [serviceProducts, setServiceProducts] = useState<IServiceProduct[]>(
    initialData?.products || []
  )

  const toast = useToast()
  const productsFormRef = useRef<FormHandles>(null)

  async function handleAddNeedlewoman(name: string) {
    const res = await api.post<INeedlewoman>('/needlewomans', { name })

    const { id: value, name: label } = res.data

    needlewomansMutate()
    return { value, label }
  }

  function handleSumbit(data: any) {
    if (data.needlewomanId && serviceProducts.length > 0)
      onSubmit({
        deliveryDate: data.deliveryDate || undefined,
        withdrawalDate: data.withdrawalDate || undefined,
        needlewomanId: data.needlewomanId,
        products: initialData?.isPayed
          ? undefined
          : productsFormRef.current?.getData().products || undefined
      })
        .then(() => {
          servicesMutate()
          onClose()
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

  function handleAddProduct(data: {
    product: {
      value: string
      name: string
      ref: string
    }
  }) {
    if (
      data.product &&
      !serviceProducts
        .map((serviceProduct) => serviceProduct.productId)
        .includes(data.product.value)
    )
      setServiceProducts([
        ...serviceProducts,
        {
          name: data.product.name,
          productId: data.product.value,
          ref: data.product.ref
        }
      ])
  }

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

  function handleRemoveProduct(productId: string) {
    setServiceProducts(
      serviceProducts.filter(
        (serviceProduct) => serviceProduct.productId !== productId
      )
    )
  }

  return (
    <Flex justifyContent="space-between" gridGap={8}>
      <Flex
        onSubmit={(data) => handleSumbit(data)}
        initialData={initialData}
        id="serviceForm"
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
        <Button mt={4} isLoading={isLoading} type="submit" colorScheme="green">
          {buttonTitle}
        </Button>
      </Flex>
      <Flex flex={1} gridGap={4} flexDir="column">
        <Form ref={productsFormRef} onSubmit={() => {}}>
          <Table borderWidth="1px">
            <Thead>
              <Tr bg="gray.50">
                <Th textAlign="center" colSpan={initialData?.isPayed ? 3 : 4}>
                  Produtos
                </Th>
              </Tr>
              <Tr>
                <Th>Ref.</Th>
                <Th>Nome</Th>
                <Th textAlign="center">QTD</Th>
                {!initialData?.isPayed && <Th />}
              </Tr>
            </Thead>
            <Tbody>
              {serviceProducts.map((serviceProduct, index) => (
                <Scope
                  key={`${serviceProduct.productId}-${serviceProduct.amount}-${index}`}
                  path={`products[${index}]`}>
                  <Tr>
                    <Td>{serviceProduct.product?.ref || serviceProduct.ref}</Td>
                    <Td>
                      {serviceProduct.product?.name || serviceProduct.name}
                    </Td>
                    <Td textAlign="center">
                      <MaskInput
                        decimalScale={0}
                        thousandSeparator="."
                        decimalSeparator=","
                        autoComplete="off"
                        defaultValue={serviceProduct.amount}
                        name="amount"
                        disabled={initialData?.isPayed}
                        placeholder="QTD"
                        isRequired={true}
                        w={24}
                        textAlign="center"
                      />
                      <Input
                        type="hidden"
                        defaultValue={serviceProduct.productId}
                        name="productId"
                      />
                    </Td>
                    {!initialData?.isPayed && (
                      <Td isNumeric>
                        <IconButton
                          aria-label="Excluir produto"
                          icon={<FiX />}
                          size="sm"
                          colorScheme="red"
                          variant="ghost"
                          onClick={() =>
                            handleRemoveProduct(serviceProduct.productId)
                          }
                          borderRadius={7}
                        />
                      </Td>
                    )}
                  </Tr>
                </Scope>
              ))}
            </Tbody>
          </Table>
        </Form>
        {!initialData?.isPayed && (
          <Flex
            as={Form}
            gridGap={2}
            onSubmit={(data: any) => handleAddProduct(data)}>
            <Flex flexDir="column" flex={1}>
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
            </Flex>
            <Button type="submit">Adicionar</Button>
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}

const CreateServiceModal: FC<ICreateServiceModalProps> = ({
  isOpen,
  onClose,
  servicesMutate,
  needlewomans,
  needlewomansMutate
}) => {
  return (
    <Modal size="4xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Adicionar serviço</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <ServiceForm
            onClose={onClose}
            needlewomans={needlewomans}
            needlewomansMutate={needlewomansMutate}
            onSubmit={(data) => api.post('/services', data)}
            servicesMutate={servicesMutate}
            buttonTitle="Adicionar serviço"
          />
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

const UpdateServiceModal: FC<IUpdateServiceModal> = ({
  isOpen,
  onClose,
  updateService,
  servicesMutate,
  needlewomans,
  needlewomansMutate
}) => {
  const [data, setData] = useState<IDetailedService | null>(null)

  useEffect(() => {
    if (updateService)
      api
        .get<IDetailedService>(`/services/${updateService.id}`)
        .then((res) => setData(res.data))
  }, [updateService])

  return (
    <Modal size="4xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Editar serviço - #{updateService?.incrementId}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {data ? (
            <ServiceForm
              needlewomans={needlewomans}
              needlewomansMutate={needlewomansMutate}
              servicesMutate={servicesMutate}
              onClose={onClose}
              onSubmit={(data) =>
                api.put(`/services/${updateService?.id}`, data)
              }
              initialData={data}
              buttonTitle="Atualizar serviço"
            />
          ) : (
            <Flex flexDir="column" gridGap={2}>
              <Skeleton h={8} />
              <Skeleton h={8} />
              <Skeleton h={8} />
            </Flex>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

const Services = () => {
  const { data: services, mutate: servicesMutate } =
    useGet<IService[]>('/services')
  const { data: needlewomans, mutate: needlewomansMutate } =
    useGet<INeedlewoman[]>('/needlewomans')

  const [viewService, setViewService] = useState<IService | null>(null)
  const [updateService, setUpdateService] = useState<IService | null>(null)

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
  const {
    isOpen: updateServiceIsOpen,
    onClose: updateServiceOnClose,
    onOpen: updateServiceOnOpen
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
          needlewomans={needlewomans}
          needlewomansMutate={needlewomansMutate}
          servicesMutate={servicesMutate}
          isOpen={newServiceIsOpen}
          onClose={newServiceOnClose}
        />
      )}

      {updateServiceIsOpen && (
        <UpdateServiceModal
          needlewomans={needlewomans}
          needlewomansMutate={needlewomansMutate}
          isOpen={updateServiceIsOpen}
          onClose={updateServiceOnClose}
          updateService={updateService}
          servicesMutate={servicesMutate}
        />
      )}

      {viewServiceIsOpen && (
        <ViewServiceModal
          isOpen={viewServiceIsOpen}
          onClose={viewServiceOnClose}
          viewService={viewService}
        />
      )}

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
              <Flex as={Td} gridGap={1} justifyContent="flex-end">
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
                <IconButton
                  aria-label="Editar serviço"
                  size="sm"
                  borderRadius={7}
                  onClick={() => {
                    setUpdateService(service)
                    updateServiceOnOpen()
                  }}
                  colorScheme="orange"
                  icon={<FiEdit />}
                />
              </Flex>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
  )
}

export default withSidebar(Services)
