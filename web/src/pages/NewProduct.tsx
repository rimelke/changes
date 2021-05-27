import {
  Flex,
  Heading,
  List,
  Text,
  IconButton,
  Button,
  Select as ChakraSelect,
  Box,
  Alert,
  AlertIcon
} from '@chakra-ui/react'
import { Form } from '@unform/web'
import { Input, MaskInput, Select } from '../components/Form'
import withSidebar from '../hooks/withSidebar'
import { useGet } from '../hooks/useGet'
import { FiEdit, FiTrash2, FiCheck, FiX } from 'react-icons/fi'
import { useEffect, useRef, useState } from 'react'
import api from '../services/api'
import { useHistory } from 'react-router-dom'

interface Group {
  id: number
  name: string
  desired: number
  minimum: number
}

interface Cost {
  id: number
  name: string
  value: number
}

interface Provider {
  id: number
  tax: number
  name: string
}

interface allFabric {
  id: number
  name: string
  provider_id: number
  provider_name: string
  grammage: number
  price: number
  final_price: number
}

interface Fabric extends allFabric {
  orderId: number
  efficiency: number
  subtotal: number
}

const NewProduct = () => {
  const { data: groups } = useGet<Group[]>('/groups')
  const { data: providers } = useGet<Provider[]>('/providers')
  const { data: allFabrics } = useGet<allFabric[]>('/fabrics')

  const [costs, setCosts] = useState<Cost[]>([])
  const [nextId, setNextId] = useState(1)
  const [editCosts, setEditCosts] = useState<number[]>([])

  const [selectedProviderId, setSelectedProviderId] =
    useState<number | null>(null)
  const [fabrics, setFabrics] = useState<Fabric[]>([])
  const [editFabric, setEditFabric] = useState<number | null>(null)
  const editFabricRef = useRef<any>(null)

  const [price, setPrice] = useState<number | null>(null)
  const [total, setTotal] = useState(0)
  const [profit, setProfit] = useState<number | null>(null)
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)
  const [fabricsWarn, setFabricsWarn] = useState(false)
  const [costsWarn, setCostsWarn] = useState(false)

  const history = useHistory()

  useEffect(() => {
    let tmp = 0
    for (const cost of costs) {
      tmp += cost.value
    }

    for (const fabric of fabrics) {
      tmp += fabric.subtotal
    }

    setTotal(tmp)
    setFabricsWarn(false)
    setCostsWarn(false)
  }, [costs, fabrics])

  useEffect(() => {
    if (total !== 0 && price) {
      setProfit(Number((((price - total) * 100) / total).toFixed(1)))
    } else setProfit(null)
  }, [total, price])

  function handleAddCost(data: any) {
    data.id = nextId
    data.value = Number(data.value.replace(',', '.'))
    setCosts([...costs, data])
    setNextId(nextId + 1)
  }

  function handleDeleteCost(id: number) {
    setCosts(costs.filter((cost) => cost.id !== id))
  }

  function handleEditCost(id: number) {
    setEditCosts([...editCosts, id])
  }

  function cancelEditCost(id: number) {
    setEditCosts(editCosts.filter((elm) => elm !== id))
  }

  function saveEditCost(id: number, index: number, data: any) {
    const tmp = [...costs]
    tmp[index] = { ...data, id }
    setCosts(tmp)
    cancelEditCost(id)
  }

  function handleChangeProvider(value: string | number) {
    if (value === '') setSelectedProviderId(null)
    else setSelectedProviderId(Number(value))
  }

  function handleAddFabric(data: any) {
    if (allFabrics) {
      data.efficiency = Number(data.efficiency.replace(',', '.'))

      const fabric: Fabric = {
        ...allFabrics[data.fabric_index],
        efficiency: data.efficiency,
        orderId: nextId,
        subtotal: allFabrics[data.fabric_index].final_price * data.efficiency
      }

      setFabrics([...fabrics, fabric])
      setNextId(nextId + 1)
    }
  }

  function handleDeleteFabric(id: number) {
    setFabrics(fabrics.filter((fabric) => fabric.orderId !== id))
  }

  function saveEditFabric(index: number, data: any) {
    const tmp = [...fabrics]
    data.efficiency = Number(data.efficiency.replace(',', '.'))
    tmp[index] = {
      ...tmp[index],
      efficiency: data.efficiency,
      subtotal: data.efficiency * tmp[index].final_price
    }
    setFabrics(tmp)
    setEditFabric(null)
  }

  function handleEditFabric(id: number) {
    if (editFabric !== null) {
      editFabricRef?.current?.submitForm()
    }

    setEditFabric(id)
  }

  function cancelEditFabric(id: number) {
    setEditFabric(null)
  }

  function handleSubmit(data: any) {
    if (fabrics.length === 0) {
      return setFabricsWarn(true)
    }

    if (costs.length === 0) {
      return setCostsWarn(true)
    }

    data.price = Number(data.price.replace(',', '.'))

    api
      .post('/products', {
        ...data,
        fabrics: fabrics.map((fabric) => ({
          id: fabric.id,
          efficiency: fabric.efficiency
        })),
        costs: costs.map((cost) => ({ name: cost.name, value: cost.value }))
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
        Novo Produto
      </Heading>
      <Flex justifyContent="space-between" mt={4}>
        <Flex flexDir="column" as={Form} onSubmit={handleSubmit}>
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
              name="group_id">
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
            <Button flex={4} colorScheme="teal" type="submit">
              Cadastrar
            </Button>
            <Box ml={4} px={4} flex={2}>
              <Text fontWeight="bold" textAlign="center">
                Total
              </Text>
              <Text fontWeight="bold" textAlign="center">
                {total.toLocaleString('pt-BR', {
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
                {profit
                  ? Number(profit).toLocaleString('pt-BR', {
                      maximumFractionDigits: 1,
                      minimumFractionDigits: 1
                    }) + '%'
                  : '-'}
              </Text>
            </Box>
          </Flex>
        </Flex>
        <Flex w={500} flexDir="column">
          <List spacing={2} p={3} borderWidth="1px" borderRadius={7}>
            <Flex alignItems="center">
              <Text flex={4} fontWeight="bold">
                Nome
              </Text>
              <Text textAlign="center" flex={3} fontWeight="bold">
                Valor
              </Text>
              <Box w="68px" />
            </Flex>
            {costs.map((cost, index) =>
              editCosts.includes(cost.id) ? (
                <Flex
                  alignItems="center"
                  key={cost.id}
                  as={Form}
                  onSubmit={(data) => saveEditCost(cost.id, index, data)}
                  initialData={cost}
                  justifyContent="space-between">
                  <Input
                    name="name"
                    autoComplete="off"
                    isRequired
                    h={8}
                    w={52}
                    placeholder="Custo"
                  />
                  <MaskInput
                    placeholder="Valor"
                    isRequired
                    w={32}
                    h={8}
                    autoComplete="off"
                    decimalSeparator=","
                    decimalScale={2}
                    fixedDecimalScale
                    name="value"
                  />
                  <Flex>
                    <IconButton
                      size="sm"
                      colorScheme="green"
                      aria-label="Salvar edições"
                      type="submit"
                      icon={<FiCheck />}
                    />
                    <IconButton
                      ml={1}
                      size="sm"
                      colorScheme="red"
                      aria-label="Cancelar edições"
                      onClick={() => cancelEditCost(cost.id)}
                      icon={<FiX />}
                    />
                  </Flex>
                </Flex>
              ) : (
                <Flex alignItems="center" key={cost.id}>
                  <Text flex={4}>{cost.name}</Text>
                  <Text textAlign="center" flex={3}>
                    {cost.value.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </Text>
                  <Flex w="68px">
                    <IconButton
                      size="sm"
                      colorScheme="orange"
                      aria-label="Editar custo"
                      onClick={() => handleEditCost(cost.id)}
                      icon={<FiEdit />}
                    />
                    <IconButton
                      ml={1}
                      size="sm"
                      colorScheme="red"
                      aria-label="Apagar custo"
                      onClick={() => handleDeleteCost(cost.id)}
                      icon={<FiTrash2 />}
                    />
                  </Flex>
                </Flex>
              )
            )}
          </List>
          <Flex
            justifyContent="space-between"
            mt={4}
            as={Form}
            onSubmit={handleAddCost}>
            <Input
              w={52}
              isRequired
              autoComplete="off"
              name="name"
              placeholder="Custo"
            />
            <MaskInput
              placeholder="Valor"
              isRequired
              w={32}
              autoComplete="off"
              decimalSeparator=","
              decimalScale={2}
              fixedDecimalScale
              name="value"
            />
            <Button colorScheme="teal" type="submit">
              Adicionar
            </Button>
          </Flex>
          {costsWarn && (
            <Alert mt={4} status="warning">
              <AlertIcon />
              Você precisa adicionar ao menos um custo!
            </Alert>
          )}
        </Flex>
      </Flex>
      <List mt={4} spacing={2} p={3} borderWidth="1px" borderRadius={7}>
        <Flex alignItems="center" justifyContent="space-between">
          <Text flex={3} fontWeight="bold">
            Fornecedor
          </Text>
          <Text flex={5} fontWeight="bold">
            Nome
          </Text>
          <Text flex={2} fontWeight="bold" textAlign="center">
            Preço
          </Text>
          <Text flex={2} fontWeight="bold" textAlign="center">
            Preço final
          </Text>
          <Text flex={2} fontWeight="bold" textAlign="center">
            Rendimento
          </Text>
          <Text flex={2} fontWeight="bold" textAlign="center">
            Subtotal
          </Text>
          <Box w="68px" />
        </Flex>
        {fabrics.map((fabric, index) =>
          editFabric === fabric.orderId ? (
            <Flex
              alignItems="center"
              as={Form}
              key={fabric.orderId}
              ref={editFabricRef}
              onSubmit={(data) => saveEditFabric(index, data)}
              initialData={fabric}
              justifyContent="space-between">
              <Text flex={3}>{fabric.provider_name}</Text>
              <Text flex={5}>{fabric.name}</Text>
              <Text flex={2} textAlign="center">
                {Number(fabric.price).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </Text>
              <Text flex={2} textAlign="center">
                {Number(fabric.final_price).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </Text>
              <MaskInput
                placeholder="Rendimento"
                decimalSeparator=","
                decimalScale={3}
                flex={2}
                fixedDecimalScale
                name="efficiency"
              />
              <Text flex={2} textAlign="center">
                -
              </Text>
              <Flex w="68px">
                <IconButton
                  size="sm"
                  colorScheme="green"
                  aria-label="Salvar edições"
                  type="submit"
                  icon={<FiCheck />}
                />
                <IconButton
                  ml={1}
                  size="sm"
                  colorScheme="red"
                  aria-label="Cancelar edições"
                  onClick={() => cancelEditFabric(fabric.orderId)}
                  icon={<FiX />}
                />
              </Flex>
            </Flex>
          ) : (
            <Flex
              key={fabric.orderId}
              alignItems="center"
              justifyContent="space-between">
              <Text flex={3}>{fabric.provider_name}</Text>
              <Text flex={5}>{fabric.name}</Text>
              <Text flex={2} textAlign="center">
                {Number(fabric.price).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </Text>
              <Text flex={2} textAlign="center">
                {Number(fabric.final_price).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </Text>
              <Text flex={2} textAlign="center">
                {fabric.efficiency.toLocaleString('pt-BR', {
                  minimumFractionDigits: 3
                })}
              </Text>
              <Text flex={2} textAlign="center">
                {fabric.subtotal.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </Text>
              <Flex w="68px">
                <IconButton
                  size="sm"
                  colorScheme="orange"
                  aria-label="Editar custo"
                  onClick={() => handleEditFabric(fabric.orderId)}
                  icon={<FiEdit />}
                />
                <IconButton
                  ml={1}
                  size="sm"
                  colorScheme="red"
                  aria-label="Apagar custo"
                  onClick={() => handleDeleteFabric(fabric.orderId)}
                  icon={<FiTrash2 />}
                />
              </Flex>
            </Flex>
          )
        )}
      </List>
      <Flex
        as={Form}
        onSubmit={handleAddFabric}
        mt={4}
        justifyContent="space-between">
        <ChakraSelect
          flex={3}
          onChange={(evt) => handleChangeProvider(evt.target.value)}
          placeholder="Todos fornecedores">
          {providers?.map((provider) => (
            <option key={provider.id} value={provider.id}>
              {provider.name}
            </option>
          ))}
        </ChakraSelect>
        <Select
          ml={4}
          flex={4}
          name="fabric_index"
          placeholder="Selecione um tecido">
          {allFabrics
            ?.filter(
              (fabric) =>
                selectedProviderId === null ||
                fabric.provider_id === selectedProviderId
            )
            .map((fabric, index) => (
              <option key={fabric.id} value={index}>
                {fabric.name}
              </option>
            ))}
        </Select>
        <MaskInput
          ml={4}
          flex={1}
          isRequired
          autoComplete="off"
          name="efficiency"
          decimalSeparator=","
          decimalScale={3}
          fixedDecimalScale
          placeholder="Rendimento"
        />
        <Button ml={4} flex={1} colorScheme="teal" type="submit">
          Adicionar
        </Button>
      </Flex>
      {fabricsWarn && (
        <Alert mt={4} status="warning">
          <AlertIcon />
          Você precisa adicionar ao menos um tecido!
        </Alert>
      )}
    </Flex>
  )
}

export default withSidebar(NewProduct)
