import { Button, IconButton } from '@chakra-ui/button'
import { Box, Flex, List, Text } from '@chakra-ui/layout'
import { Select as ChakraSelect } from '@chakra-ui/select'
import { MaskInput, Select } from './Form'
import { FiEdit, FiTrash2, FiCheck, FiX } from 'react-icons/fi'
import { useState, FC, Dispatch, SetStateAction } from 'react'
import { Form } from '@unform/web'
import { useGet } from '../hooks/useGet'
import IFabric from '../types/IFabric'
import IProvider from '../types/IProvider'

export interface IBaseFabric {
  id?: string
  fabricId: string
  orderId: string
  efficiency: number
  subtotal: number
  name: string
  price: number
  providerName: string
  finalPrice: number
}

interface Params {
  baseFabrics: IBaseFabric[]
  setBaseFabrics: Dispatch<SetStateAction<IBaseFabric[]>>
}

const BaseFabrics: FC<Params> = ({ baseFabrics, setBaseFabrics }) => {
  const { data: fabrics } = useGet<IFabric[]>('/fabrics')
  const { data: providers } = useGet<IProvider[]>('/providers')

  const [nextOrderId, setNextOrderId] = useState(1)

  const [selectedProviderId, setSelectedProviderId] =
    useState<string | null>(null)
  const [editingFabrics, setEditingFabrics] = useState<string[]>([])

  function cancelEditFabric(orderId: string) {
    setEditingFabrics(
      editingFabrics.filter((editFabricId) => editFabricId !== orderId)
    )
  }

  function saveEditFabric(data: { orderId: string; efficiency: string }) {
    const newBaseFabrics = [...baseFabrics]
    const index = newBaseFabrics.findIndex(
      (baseFabric) => baseFabric.orderId === data.orderId
    )

    console.log(data)
    console.log(index)

    newBaseFabrics[index] = {
      ...newBaseFabrics[index],
      efficiency: Number(data.efficiency.replace(',', '.')),
      subtotal:
        Math.round(
          100 *
            Number(data.efficiency.replace(',', '.')) *
            newBaseFabrics[index].finalPrice
        ) / 100
    }

    console.log(newBaseFabrics)

    setBaseFabrics(newBaseFabrics)
    cancelEditFabric(data.orderId)
  }

  function handleEditFabric(orderId: string) {
    setEditingFabrics([...editingFabrics, orderId])
  }

  function handleDeleteFabric(orderId: string) {
    setBaseFabrics(baseFabrics.filter((fabric) => fabric.orderId !== orderId))
  }

  function handleAddFabric(data: { efficiency: string; fabricId: string }) {
    if (fabrics) {
      const fabric = fabrics.find((fabric) => fabric.id === data.fabricId)

      if (fabric) {
        const newFabric: IBaseFabric = {
          efficiency: Number(data.efficiency.replace(',', '.')),
          fabricId: fabric.id,
          finalPrice: fabric.finalPrice,
          name: fabric.name,
          orderId: `baseFabric-${nextOrderId}`,
          price: fabric.price,
          providerName: fabric.provider.name,
          subtotal:
            Math.round(
              fabric.finalPrice *
                Number(data.efficiency.replace(',', '.')) *
                100
            ) / 100
        }

        setBaseFabrics([...baseFabrics, newFabric])
        setNextOrderId(nextOrderId + 1)
      }
    }
  }

  function handleChangeProvider(providerId: string) {
    if (providerId === '') setSelectedProviderId(null)
    else setSelectedProviderId(providerId)
  }

  return (
    <Flex flexDir="column">
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
        {baseFabrics.map((baseFabric) =>
          editingFabrics.includes(baseFabric.orderId) ? (
            <Flex
              alignItems="center"
              as={Form}
              key={baseFabric.orderId}
              onSubmit={(data: any) =>
                saveEditFabric({
                  orderId: baseFabric.orderId,
                  efficiency: data.efficiency
                })
              }
              initialData={baseFabric}
              justifyContent="space-between">
              <Text flex={3}>{baseFabric.providerName}</Text>
              <Text flex={5}>{baseFabric.name}</Text>
              <Text flex={2} textAlign="center">
                {baseFabric.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </Text>
              <Text flex={2} textAlign="center">
                {baseFabric.finalPrice.toLocaleString('pt-BR', {
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
                  onClick={() => cancelEditFabric(baseFabric.orderId)}
                  icon={<FiX />}
                />
              </Flex>
            </Flex>
          ) : (
            <Flex
              key={baseFabric.orderId}
              alignItems="center"
              justifyContent="space-between">
              <Text flex={3}>{baseFabric.providerName}</Text>
              <Text flex={5}>{baseFabric.name}</Text>
              <Text flex={2} textAlign="center">
                {baseFabric.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </Text>
              <Text flex={2} textAlign="center">
                {baseFabric.finalPrice.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </Text>
              <Text flex={2} textAlign="center">
                {baseFabric.efficiency.toLocaleString('pt-BR', {
                  minimumFractionDigits: 3
                })}
              </Text>
              <Text flex={2} textAlign="center">
                {baseFabric.subtotal.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </Text>
              <Flex w="68px">
                <IconButton
                  size="sm"
                  colorScheme="orange"
                  aria-label="Editar custo"
                  onClick={() => handleEditFabric(baseFabric.orderId)}
                  icon={<FiEdit />}
                />
                <IconButton
                  ml={1}
                  size="sm"
                  colorScheme="red"
                  aria-label="Apagar custo"
                  onClick={() => handleDeleteFabric(baseFabric.orderId)}
                  icon={<FiTrash2 />}
                />
              </Flex>
            </Flex>
          )
        )}
      </List>
      <Flex
        as={Form}
        onSubmit={(data: any) =>
          handleAddFabric({
            efficiency: data.efficiency,
            fabricId: data.fabricId
          })
        }
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
          name="fabricId"
          placeholder="Selecione um tecido">
          {fabrics
            ?.filter(
              (fabric) =>
                selectedProviderId === null ||
                fabric.providerId === selectedProviderId
            )
            .map((fabric) => (
              <option key={fabric.id} value={fabric.id}>
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
    </Flex>
  )
}

export default BaseFabrics
