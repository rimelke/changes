import { Flex } from '@chakra-ui/react'
import withSidebar from '../hooks/withSidebar'

const Home = () => {
  return <Flex as="main" flex={1}></Flex>
}

export default withSidebar(Home)
