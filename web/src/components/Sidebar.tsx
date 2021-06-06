import { Flex, Heading, List, ListIcon } from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'
import {
  FiHome,
  FiPackage,
  FiDisc,
  FiTruck,
  FiBriefcase,
  FiPenTool
} from 'react-icons/fi'

const items = [
  {
    name: 'Início',
    icon: FiHome,
    path: '/',
    isActive: (pathname: string) => pathname === '/'
  },
  { name: 'Coleções', icon: FiBriefcase, path: '/groups' },
  { name: 'Produtos', icon: FiPackage, path: '/products' },
  { name: 'Tecidos', icon: FiDisc, path: '/fabrics' },
  { name: 'Fornecedores', icon: FiTruck, path: '/providers' },
  { name: 'Rascunhos', icon: FiPenTool, path: '/drafts' }
]

const Sidebar = () => {
  const { pathname } = useLocation()

  return (
    <List spacing={4} p={4}>
      {items.map((item) => (
        <Flex
          key={item.path}
          role="group"
          alignItems="center"
          as={Link}
          to={item.path}>
          <ListIcon
            _groupHover={{ color: 'teal.300' }}
            boxSize={5}
            color={
              (
                item.isActive
                  ? item.isActive(pathname)
                  : pathname.startsWith(item.path)
              )
                ? 'teal.500'
                : 'gray.400'
            }
            as={item.icon}
          />
          <Heading
            _groupHover={{ color: 'teal.300' }}
            fontWeight="500"
            size="md"
            color={
              (
                item.isActive
                  ? item.isActive(pathname)
                  : pathname.startsWith(item.path)
              )
                ? 'teal.500'
                : 'gray.400'
            }>
            {item.name}
          </Heading>
        </Flex>
      ))}
    </List>
  )
}

export default Sidebar
