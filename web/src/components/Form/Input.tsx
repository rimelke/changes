import { useEffect, useRef } from 'react'
import { useField } from '@unform/core'
import { Input as ChakraInput, InputProps as ChakraInputProps } from '@chakra-ui/react'

interface Props {
	name: string,
}

type InputProps = Props & ChakraInputProps;

const Input: React.FC<InputProps> = ({ name, ...rest }) => {
	const inputRef = useRef(null);
	const { fieldName, defaultValue, registerField } = useField(name);
	
	useEffect(() => {
		registerField({
			name: fieldName,
			ref: inputRef.current,
			path: 'value',
		});
	}, [fieldName, registerField]);

	return <ChakraInput ref={inputRef} defaultValue={defaultValue} {...rest} />
}

export default Input