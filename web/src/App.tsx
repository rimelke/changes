import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import Routes from './routes'

function App() {
	return (
		<ChakraProvider>
			<Routes />
		</ChakraProvider>
	)
}

export default App
