import { Divider, Flex } from '@chakra-ui/react'
import { ComponentType } from 'react'
import Sidebar from '../components/Sidebar'

const withSidebar = (Component: ComponentType) => {
  const Wrapper = () => {
    return (
      <Flex h="100vh">
        <Sidebar />
        <Divider mr={6} orientation="vertical" />
        <Component />
      </Flex>
    )
  }

  return Wrapper
}

export default withSidebar
