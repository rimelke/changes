import { Flex, Heading, Text, IconButton, Button, Box } from '@chakra-ui/react'
import { Form } from '@unform/web'
import { Input, MaskInput, Select } from '../components/Form'
import withSidebar from '../hooks/withSidebar'
import { useGet } from '../hooks/useGet'
import { FiX } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import api from '../services/api'
import { useHistory } from 'react-router-dom'
import IGroup from '../types/IGroup'
import BaseFabrics, { IBaseFabric } from '../components/BaseFabrics'
import BaseCosts, { IBaseCost } from '../components/BaseCosts'

const EditProduct = () => {
  const { data: groups } = useGet<IGroup[]>('/groups')

  const [baseFabrics, setBaseFabrics] = useState<IBaseFabric[]>([])
  const [baseCosts, setBaseCosts] = useState<IBaseCost[]>([])

  const [price, setPrice] = useState<number | null>(null)
  const [profit, setProfit] = useState<number | null>(null)
  const [cost, setCost] = useState(0)

  const [selectedGroup, setSelectedGroup] = useState<IGroup | null>(null)

  const history = useHistory()

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

  function handleSubmit(data: {
    price: string
    name: string
    groupId: string
    ref: string
  }) {
    api
      .post('/products', {
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
      .then((res) => history.push('/products'))
      .catch((e) => {
        if (e.response) {
          console.log(e.response)
        } else console.log(e)
      })
  }

  return (
    <Flex pr={8} flexDir="column" as="main" flex={1} mt={4}>
      <Heading size="lg" color="teal.500">
        Novo produto
      </Heading>
      <Flex justifyContent="space-between" mt={4}>
        <Flex
          flexDir="column"
          as={Form}
          onSubmit={(data: any) => handleSubmit(data)}>
          <Flex>
            <Select
              onChange={(evt) => {
                if (groups && groups[evt.target.selectedIndex - 1]) {
                  setSelectedGroup(groups[evt.target.selectedIndex - 1])
                } else setSelectedGroup(null)
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
            <Button flex={3} colorScheme="green" type="submit">
              Salvar
            </Button>
            <IconButton
              ml={2}
              size="md"
              borderRadius={7}
              colorScheme="red"
              aria-label="Cancelar edições"
              onClick={() => history.replace('/products')}
              icon={<FiX />}
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

export default withSidebar(EditProduct)
