import { FC, useEffect, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useField } from '@unform/core'
import { Flex, Text, FlexProps } from '@chakra-ui/layout'

interface Props {
  name: string
}

interface InputRefProps extends HTMLInputElement {
  file: File | null
}

type DropzoneProps = Props & FlexProps

const Dropzone: FC<DropzoneProps> = ({ name, ...rest }) => {
  const inputRef = useRef<InputRefProps>(null)
  const { fieldName, registerField, error } = useField(name)
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null)

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop: (files) => {
      if (files.length > 0 && inputRef.current) {
        setSelectedFileName(files[0].name)
        inputRef.current.file = files[0]
      }
    }
  })

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      getValue: (ref: InputRefProps) => {
        return ref.file || null
      },
      clearValue: (ref: InputRefProps) => {
        ref.file = null
      },
      setValue: (ref: InputRefProps, value) => {
        ref.file = value
      }
    })
  }, [fieldName, registerField])

  return (
    <>
      <Flex
        bg={!error ? 'gray.50' : 'red.50'}
        px={3}
        py={8}
        borderStyle="dashed"
        borderWidth="thin"
        borderColor={!error ? 'gray.400' : 'red.600'}
        _hover={{ bg: !error ? 'gray.100' : 'red.100' }}
        cursor="pointer"
        justifyContent="center"
        alignItems="center"
        {...getRootProps()}
        onClick={() => inputRef.current?.click()}
        {...rest}>
        <input {...getInputProps()} ref={inputRef} />

        {selectedFileName ? (
          <Text fontSize="md">{selectedFileName}</Text>
        ) : (
          <Text fontSize="md">
            Arraste os arquivos aqui ou clique para selecionar
          </Text>
        )}
      </Flex>
      {error && (
        <Text textAlign="center" color="red.600" fontSize="sm">
          {error}
        </Text>
      )}
    </>
  )
}

export default Dropzone
