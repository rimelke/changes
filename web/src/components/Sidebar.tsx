import { Flex, Heading, List, ListIcon } from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'
import { FiHome, FiPackage, FiDisc, FiTruck, FiBriefcase } from 'react-icons/fi'

const Sidebar = () => {
  const { pathname } = useLocation()

  return (
    <List spacing={4} p={4}>
      <Flex role="group" alignItems="center" as={Link} to="/">
        <ListIcon
          _groupHover={{ color: 'teal.300' }}
          boxSize={5}
          color={pathname === '/' ? 'teal.500' : 'gray.400'}
          as={FiHome}
        />
        <Heading
          _groupHover={{ color: 'teal.300' }}
          fontWeight="500"
          size="md"
          color={pathname === '/' ? 'teal.500' : 'gray.400'}>
          Ínicio
        </Heading>
      </Flex>
      <Flex role="group" alignItems="center" as={Link} to="/groups">
        <ListIcon
          _groupHover={{ color: 'teal.300' }}
          boxSize={5}
          color={pathname.startsWith('/groups') ? 'teal.500' : 'gray.400'}
          as={FiBriefcase}
        />
        <Heading
          _groupHover={{ color: 'teal.300' }}
          fontWeight="500"
          size="md"
          color={pathname.startsWith('/groups') ? 'teal.500' : 'gray.400'}>
          Coleções
        </Heading>
      </Flex>
      <Flex role="group" alignItems="center" as={Link} to="/products">
        <ListIcon
          _groupHover={{ color: 'teal.300' }}
          boxSize={5}
          color={pathname.startsWith('/products') ? 'teal.500' : 'gray.400'}
          as={FiPackage}
        />
        <Heading
          _groupHover={{ color: 'teal.300' }}
          fontWeight="500"
          size="md"
          color={pathname.startsWith('/products') ? 'teal.500' : 'gray.400'}>
          Produtos
        </Heading>
      </Flex>
      <Flex role="group" alignItems="center" as={Link} to="/fabrics">
        <ListIcon
          _groupHover={{ color: 'teal.300' }}
          boxSize={5}
          color={pathname.startsWith('/fabrics') ? 'teal.500' : 'gray.400'}
          as={FiDisc}
        />
        <Heading
          _groupHover={{ color: 'teal.300' }}
          fontWeight="500"
          size="md"
          color={pathname.startsWith('/fabrics') ? 'teal.500' : 'gray.400'}>
          Tecidos
        </Heading>
      </Flex>
      <Flex role="group" alignItems="center" as={Link} to="/providers">
        <ListIcon
          _groupHover={{ color: 'teal.300' }}
          boxSize={5}
          color={pathname.startsWith('/providers') ? 'teal.500' : 'gray.400'}
          as={FiTruck}
        />
        <Heading
          _groupHover={{ color: 'teal.300' }}
          fontWeight="500"
          size="md"
          color={pathname.startsWith('/providers') ? 'teal.500' : 'gray.400'}>
          Fornecedores
        </Heading>
      </Flex>
    </List>
  )
}

export default Sidebar
