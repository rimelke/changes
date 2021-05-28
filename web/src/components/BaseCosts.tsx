import { Button, IconButton } from '@chakra-ui/button'
import { Box, Flex, List, Text } from '@chakra-ui/layout'
import { Input, MaskInput } from './Form'
import { FiEdit, FiTrash2, FiCheck, FiX } from 'react-icons/fi'
import { Form } from '@unform/web'
import { Dispatch, FC, SetStateAction, useState } from 'react'

export interface IBaseCost {
  id?: string
  orderId: string
  name: string
  value: number
}

interface Props {
  baseCosts: IBaseCost[]
  setBaseCosts: Dispatch<SetStateAction<IBaseCost[]>>
}

const BaseCosts: FC<Props> = ({ baseCosts, setBaseCosts }) => {
  const [nextOrderId, setNextOrderId] = useState(1)
  const [editingCosts, setEditingCosts] = useState<string[]>([])

  function cancelEditCost(orderId: string) {
    setEditingCosts(
      editingCosts.filter((editingOrderId) => editingOrderId !== orderId)
    )
  }

  function handleAddCost(data: { name: string; value: string }) {
    setBaseCosts([
      ...baseCosts,
      {
        name: data.name,
        orderId: `baseCost-${nextOrderId}`,
        value: Number(data.value.replace(',', '.'))
      }
    ])
    setNextOrderId(nextOrderId + 1)
  }

  function handleDeleteCost(orderId: string) {
    setBaseCosts(baseCosts.filter((baseCost) => baseCost.orderId !== orderId))
  }

  function handleEditCost(orderId: string) {
    setEditingCosts([...editingCosts, orderId])
  }

  function saveEditCost(data: {
    orderId: string
    name: string
    value: string
  }) {
    const newBaseCosts: IBaseCost[] = [...baseCosts]
    const index = newBaseCosts.findIndex(
      (baseCost) => baseCost.orderId === data.orderId
    )
    newBaseCosts[index] = {
      ...newBaseCosts[index],
      name: data.name,
      value: Number(data.value.replace(',', '.'))
    }

    setBaseCosts(newBaseCosts)
    cancelEditCost(data.orderId)
  }

  return (
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
        {baseCosts.map((baseCost) =>
          editingCosts.includes(baseCost.orderId) ? (
            <Flex
              alignItems="center"
              key={baseCost.orderId}
              as={Form}
              onSubmit={(data: any) =>
                saveEditCost({ ...data, orderId: baseCost.orderId })
              }
              initialData={baseCost}
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
                  onClick={() => cancelEditCost(baseCost.orderId)}
                  icon={<FiX />}
                />
              </Flex>
            </Flex>
          ) : (
            <Flex alignItems="center" key={baseCost.orderId}>
              <Text flex={4}>{baseCost.name}</Text>
              <Text textAlign="center" flex={3}>
                {baseCost.value.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </Text>
              <Flex w="68px">
                <IconButton
                  size="sm"
                  colorScheme="orange"
                  aria-label="Editar custo"
                  onClick={() => handleEditCost(baseCost.orderId)}
                  icon={<FiEdit />}
                />
                <IconButton
                  ml={1}
                  size="sm"
                  colorScheme="red"
                  aria-label="Apagar custo"
                  onClick={() => handleDeleteCost(baseCost.orderId)}
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
        onSubmit={(data: any) => handleAddCost(data)}>
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
    </Flex>
  )
}

export default BaseCosts
