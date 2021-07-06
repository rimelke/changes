import {
  Flex,
  Heading,
  Table,
  Tbody,
  Thead,
  Th,
  Tr,
  Td,
  Badge
} from '@chakra-ui/react'
import { useGet } from '../hooks/useGet'
import withSidebar from '../hooks/withSidebar'
import IService from '../types/IService'

const Services = () => {
  const { data: services } = useGet<IService[]>('/services')

  return (
    <Flex as="main" flexDir="column" flex={1} mb={8} mt={4} mr={8}>
      <Heading size="lg" color="teal.500">
        Serviços
      </Heading>

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
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
  )
}

export default withSidebar(Services)
