import {
  Button,
  Flex,
  Text,
  IconButton,
  Box,
  useToast,
  Select as ChakraSelect
} from '@chakra-ui/react'
import { Form } from '@unform/web'
import { useState, FC, useEffect } from 'react'
import BaseCosts, { IBaseCost } from './BaseCosts'
import BaseFabrics, { IBaseFabric } from './BaseFabrics'
import { Select, Input, MaskInput } from './Form'
import { FiX } from 'react-icons/fi'
import IGroup from '../types/IGroup'
import { Link, useHistory } from 'react-router-dom'
import { useGet } from '../hooks/useGet'

interface IProductInitialData {
  group?: IGroup
  groupId?: string
  ref?: string
  name?: string
  price?: number
  costs?: {
    name: string
    value: number
  }[]
}

interface IProductData {
  groupId: string
  ref: string
  name: string
  price: number
  costs: {
    id?: string
    name: string
    value: number
  }[]
  fabrics: {
    id?: string
    fabricId: string
    efficiency: number
  }[]
}

interface Props {
  returnUrl?: string
  initialData?: IProductInitialData
  onSubmit: (data: IProductData) => Promise<void>
}

const ProductForm: FC<Props> = ({
  returnUrl = '/products',
  initialData,
  onSubmit
}) => {
  const { data: groups } = useGet<IGroup[]>('/groups')

  const [price, setPrice] = useState<number>()
  const [profit, setProfit] = useState<number | null>(null)
  const [cost, setCost] = useState(0)
  const [baseFabrics, setBaseFabrics] = useState<IBaseFabric[]>([])
  const [baseCosts, setBaseCosts] = useState<IBaseCost[]>([])
  const [selectedGroup, setSelectedGroup] = useState<IGroup>()
  const [isLoading, setIsLoading] = useState(false)

  const history = useHistory()
  const toast = useToast()

  useEffect(() => {
    if (initialData) {
      setSelectedGroup(
        initialData.group ||
          groups?.find((group) => group.id === initialData.groupId)
      )

      console.log('ola')
      if (initialData.costs)
        setBaseCosts(
          initialData.costs.map((cost, index) => ({
            ...cost,
            orderId: `initialData-baseCost-${index}-${cost.name}-${cost.value}`
          }))
        )
    }
  }, [initialData])

  useEffect(() => {
    let newCost = 0

    baseFabrics.forEach((baseFabric) => (newCost += baseFabric.subtotal))
    baseCosts.forEach((baseCost) => (newCost += baseCost.value))

    setCost(newCost)
  }, [baseFabrics, baseCosts])

  useEffect(() => {
    if (cost > 0 && price)
      setProfit(Math.round((1000 * (price - cost)) / cost) / 10)
    else setProfit(null)
  }, [cost, price])

  function handleSubmit(data: any) {
    setIsLoading(true)
    onSubmit({
      ...data,
      price: Number(data.price.replace(',', '.')),
      fabrics: baseFabrics.map((baseFabric) => ({
        fabricId: baseFabric.fabricId,
        efficiency: baseFabric.efficiency,
        id: baseFabric.id
      })),
      costs: baseCosts.map((baseCost) => ({
        name: baseCost.name,
        value: baseCost.value,
        id: baseCost.id
      }))
    })
      .then(() => history.push(returnUrl))
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

  return (
    <Flex flexDir="column">
      <Flex justifyContent="space-between" mt={4}>
        <Flex
          flexDir="column"
          as={Form}
          initialData={initialData}
          onSubmit={handleSubmit}>
          <Flex>
            {groups ? (
              <Select
                onChange={(evt) => {
                  if (groups && groups[evt.target.selectedIndex - 1]) {
                    setSelectedGroup(groups[evt.target.selectedIndex - 1])
                  } else setSelectedGroup(undefined)
                }}
                isRequired
                flex={3}
                placeholder="Selecione uma coleção"
                name="groupId">
                {groups?.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </Select>
            ) : (
              <ChakraSelect
                disabled
                placeholder="Carregando coleções..."
                flex={3}
              />
            )}
            <Input
              isRequired
              flex={1}
              autoComplete="off"
              ml={4}
              name="ref"
              placeholder="Referência"
            />
          </Flex>
          <Flex mt={4}>
            <Input
              isRequired
              flex={3}
              name="name"
              autoComplete="off"
              placeholder="Nome do produto"
            />
            <MaskInput
              isRequired
              flex={1}
              ml={4}
              onChange={(evt) =>
                setPrice(Number(evt.target.value.replace(',', '.')))
              }
              placeholder="Preço"
              decimalScale={2}
              decimalSeparator=","
              fixedDecimalScale
              autoComplete="off"
              name="price"
            />
          </Flex>
          <Flex mt={4} alignItems="center">
            <Button
              flex={3}
              isLoading={isLoading}
              colorScheme="green"
              type="submit">
              Salvar
            </Button>
            <IconButton
              ml={2}
              size="md"
              borderRadius={7}
              colorScheme="red"
              aria-label="Cancelar edições"
              icon={<FiX />}
              as={Link}
              to={returnUrl}
            />
            <Box ml={4} px={4} flex={2}>
              <Text fontWeight="bold" textAlign="center">
                Total
              </Text>
              <Text fontWeight="bold" textAlign="center">
                {cost.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </Text>
            </Box>
            <Box px={4} ml={4} flex={1}>
              <Text fontWeight="bold" textAlign="center">
                Lucro
              </Text>
              <Text
                color={
                  profit && selectedGroup
                    ? profit >= selectedGroup.minimum
                      ? profit >= selectedGroup.desired
                        ? 'green.500'
                        : 'yellow.500'
                      : 'red.500'
                    : 'black'
                }
                fontWeight="bold"
                textAlign="center">
                {profit ? profit + '%' : '-'}
              </Text>
            </Box>
          </Flex>
        </Flex>
        <BaseCosts baseCosts={baseCosts} setBaseCosts={setBaseCosts} />
      </Flex>
      <BaseFabrics baseFabrics={baseFabrics} setBaseFabrics={setBaseFabrics} />
    </Flex>
  )
}

export default ProductForm
