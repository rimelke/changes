import {
  Flex,
  Heading,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  useToast
} from '@chakra-ui/react'
import { Form } from '@unform/web'
import { useState } from 'react'
import { Input, MaskInput, Select } from '../components/Form'
import { useGet } from '../hooks/useGet'
import withSidebar from '../hooks/withSidebar'
import api from '../services/api'
import IBudget from '../types/IBudget'
import ICategory from '../types/ICategory'

const Budgets = () => {
  const { data: budgets, mutate } = useGet<IBudget[]>('/budgets')
  const { data: categories } = useGet<ICategory[]>('/categories')
  const toast = useToast()

  const {
    isOpen: newBudgetIsOpen,
    onClose: newBudgetOnClose,
    onOpen: newBudgetOnOpen
  } = useDisclosure()
  const [newBudgetIsLoading, setNewBudgetIsLoading] = useState(false)

  function handleNewBudgetSubmit(data: {
    description: string
    date: string
    value: string
    categoryId: string
  }) {
    setNewBudgetIsLoading(true)

    api
      .post('/budgets', {
        ...data,
        value: Number(
          data.value.replace('R$ ', '').replace('.', '').replace(',', '.')
        )
      })
      .then(() => {
        mutate()
        newBudgetOnClose()
      })
      .catch(() =>
        toast({
          title: 'Um erro inesperado ocorreu!',
          description: 'Recarregue a página e tente novamente',
          status: 'error',
          position: 'bottom-left',
          isClosable: true
        })
      )
      .finally(() => setNewBudgetIsLoading(false))
  }

  return (
    <Flex as="main" flexDir="column" flex={1} mt={4} mr={8}>
      <Heading size="lg" color="teal.500">
        Orçamento
      </Heading>

      <Flex mt={4}>
        <Button onClick={newBudgetOnOpen} colorScheme="green">
          Adicionar
        </Button>
      </Flex>

      <Modal isOpen={newBudgetIsOpen} onClose={newBudgetOnClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar registro</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Form onSubmit={handleNewBudgetSubmit}>
              <Select isRequired name="categoryId">
                {categories?.map((category) => (
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
              <Input
                mt={2}
                isRequired
                name="description"
                placeholder="Digite a descrição"
              />
              <Input isRequired mt={2} name="date" type="date" />
              <MaskInput
                decimalSeparator=","
                decimalScale={2}
                fixedDecimalScale
                isRequired
                mt={2}
                thousandSeparator="."
                prefix="R$ "
                placeholder="Digite o valor"
                name="value"
              />
              <Flex justifyContent="flex-end" mt={4}>
                <Button
                  onClick={newBudgetOnClose}
                  colorScheme="red"
                  mr={2}
                  variant="ghost">
                  Cancelar
                </Button>
                <Button
                  isLoading={newBudgetIsLoading}
                  type="submit"
                  colorScheme="green">
                  Adicionar
                </Button>
              </Flex>
            </Form>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Table borderWidth="1px" mt={4}>
        <Thead>
          <Tr>
            <Th>Categoria</Th>
            <Th>Descrição</Th>
            <Th>Data</Th>
            <Th isNumeric>Valor</Th>
          </Tr>
        </Thead>
        <Tbody>
          {budgets?.map((budget) => (
            <Tr _hover={{ bg: 'gray.50' }} key={budget.id}>
              <Td
                color={
                  budget.category.type === 'INCOME' ? 'green.600' : 'red.600'
                }>
                {budget.category.name}
              </Td>
              <Td>{budget.description}</Td>
              <Td>
                {new Date(budget.date + ' 00:00').toLocaleDateString('pt-br')}
              </Td>
              <Td isNumeric>
                {budget.value.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
  )
}

export default withSidebar(Budgets)
