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
  useToast,
  Select as ChakraSelect,
  Skeleton,
  Text,
  IconButton,
  ModalFooter
} from '@chakra-ui/react'
import { Form } from '@unform/web'
import { useState } from 'react'
import { Input } from '../components/Form'
import { useGet } from '../hooks/useGet'
import withSidebar from '../hooks/withSidebar'
import api from '../services/api'
import IBudget from '../types/IBudget'
import ICategory from '../types/ICategory'
import { FiEdit, FiTrash } from 'react-icons/fi'
import BudgetModal from '../components/BudgetModal'

const Budgets = () => {
  const [search, setSearch] = useState<string | null>(null)
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  )

  const { data: budgets, mutate } = useGet<IBudget[]>(
    `/budgets?${search !== null ? `search=${encodeURIComponent(search)}` : ''}${
      selectedCategoryId !== null ? `&categoryId=${selectedCategoryId}` : ''
    }`
  )
  const { data: categories } = useGet<ICategory[]>('/categories')
  const toast = useToast()
  const newBudgetDisclosure = useDisclosure()

  const editBudgetDisclosure = useDisclosure()
  const [editBudget, setEditBudget] = useState<IBudget>()

  const {
    isOpen: delBudgetIsOpen,
    onClose: delBudgetOnClose,
    onOpen: delBudgetOnOpen
  } = useDisclosure()
  const [delBudget, setDelBudget] = useState<IBudget | null>(null)
  const [delBudgetIsLoading, setDelBudgetIsLoading] = useState(false)

  function handleDelBudgetSubmit() {
    if (delBudget) {
      setDelBudgetIsLoading(true)

      api
        .delete(`/budgets/${delBudget.id}`)
        .then(() => {
          mutate()
          delBudgetOnClose()
          setDelBudget(null)
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
        .finally(() => setDelBudgetIsLoading(false))
    }
  }

  return (
    <Flex as="main" flexDir="column" flex={1} mt={4} mr={8}>
      <Heading size="lg" color="teal.500">
        Orçamento
      </Heading>

      <Flex
        as={Form}
        onSubmit={(data: any) => setSearch(data.search || null)}
        mt={4}>
        <Button
          flex={1}
          onClick={newBudgetDisclosure.onOpen}
          colorScheme="green">
          Adicionar
        </Button>
        <ChakraSelect
          onChange={(e) => setSelectedCategoryId(e.target.value || null)}
          placeholder="Filtre por categoria"
          flex={3}
          ml={4}>
          {categories?.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </ChakraSelect>
        <Input name="search" placeholder="Pesquise por algo" flex={9} ml={4} />
      </Flex>

      <BudgetModal
        disclosure={newBudgetDisclosure}
        resolveCallback={() => mutate()}
        onSubmit={(data) => api.post('/budgets', data)}
        title="Adicionar registro"
        buttonLabel="Adicionar"
      />

      <BudgetModal
        disclosure={editBudgetDisclosure}
        initialData={editBudget}
        onSubmit={(data) => api.put(`/budgets/${editBudget?.id}`, data)}
        resolveCallback={() => mutate()}
        title="Editar registro"
        buttonLabel="Atualizar"
      />

      {delBudget && (
        <Modal isOpen={delBudgetIsOpen} onClose={delBudgetOnClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Apagar registro</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>
                Você tem certeza que deseja apagar o seguinte registro?
              </Text>
              <br />
              <Text
                color={
                  delBudget.category.type === 'INCOME' ? 'green.600' : 'red.600'
                }>
                {delBudget.category.name}
              </Text>
              <Text fontWeight="semibold">{delBudget.description}</Text>
              <Text>
                {new Date(delBudget.date + ' 00:00').toLocaleDateString(
                  'pt-br'
                )}
              </Text>
              <Text>
                {delBudget.value.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button onClick={delBudgetOnClose} mr={2} variant="ghost">
                Cancelar
              </Button>
              <Button
                onClick={handleDelBudgetSubmit}
                isLoading={delBudgetIsLoading}
                colorScheme="red">
                Apagar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      <Table borderWidth="1px" mt={4}>
        <Thead>
          <Tr>
            <Th>Categoria</Th>
            <Th>Descrição</Th>
            <Th>Data</Th>
            <Th isNumeric>Valor</Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody>
          {!budgets ? (
            <>
              <Tr>
                <Skeleton colspan={5} as={Td}>
                  A
                </Skeleton>
              </Tr>
              <Tr>
                <Skeleton colspan={5} as={Td}>
                  A
                </Skeleton>
              </Tr>
              <Tr>
                <Skeleton colspan={5} as={Td}>
                  A
                </Skeleton>
              </Tr>
            </>
          ) : (
            budgets.map((budget) => (
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
                <Td isNumeric>
                  <IconButton
                    colorScheme="orange"
                    borderRadius={7}
                    onClick={() => {
                      setEditBudget(budget)
                      editBudgetDisclosure.onOpen()
                    }}
                    size="sm"
                    aria-label="Editar registro"
                    icon={<FiEdit />}
                  />
                  <IconButton
                    aria-label="Apagar registro"
                    icon={<FiTrash />}
                    onClick={() => {
                      setDelBudget(budget)
                      delBudgetOnOpen()
                    }}
                    colorScheme="red"
                    ml={2}
                    borderRadius={7}
                    size="sm"
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

export default withSidebar(Budgets)
