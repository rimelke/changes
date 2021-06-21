import {
  Flex,
  Heading,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td
} from '@chakra-ui/react'
import { useGet } from '../hooks/useGet'
import withSidebar from '../hooks/withSidebar'
import IBudget from '../types/IBudget'

const Budgets = () => {
  const { data: budgets } = useGet<IBudget[]>('/budgets')

  return (
    <Flex as="main" flexDir="column" flex={1} mt={4} mr={8}>
      <Heading size="lg" color="teal.500">
        Orçamento
      </Heading>

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
              <Td>{new Date(budget.date).toLocaleDateString('pt-br')}</Td>
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
