import { useField } from '@unform/core'
import { FC, useEffect, useRef } from 'react'
import { Textarea as ChakraTextarea, TextareaProps } from '@chakra-ui/textarea'

interface Props {
  name: string
  rows?: number
}

type TextareaInputProps = Props & TextareaProps

const Textarea: FC<TextareaInputProps> = ({ name, rows = 5, ...rest }) => {
  const textareaRef = useRef(null)
  const { fieldName, defaultValue = '', registerField } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textareaRef,
      getValue: (ref) => {
        return ref.current.value
      },
      setValue: (ref, value) => {
        ref.current.value = value
      },
      clearValue: (ref) => {
        ref.current.value = ''
      }
    })
  }, [fieldName, registerField])

  return (
    <ChakraTextarea
      ref={textareaRef}
      id={fieldName}
      defaultValue={defaultValue}
      rows={rows}
      {...rest}
    />
  )
}

export default Textarea
