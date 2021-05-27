import { useEffect, useRef } from 'react'
import { useField } from '@unform/core'
import {
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps
} from '@chakra-ui/react'

interface Props {
  name: string
}

type SelectProps = Props & ChakraSelectProps

const Select: React.FC<SelectProps> = ({ name, children, ...rest }) => {
  const inputRef = useRef(null)
  const { fieldName, defaultValue, registerField } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [fieldName, registerField])

  return (
    <ChakraSelect
      id={fieldName}
      ref={inputRef}
      defaultValue={defaultValue}
      {...rest}>
      {children}
    </ChakraSelect>
  )
}

export default Select
