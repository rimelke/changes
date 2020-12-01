import React, { useRef, useEffect } from 'react'
import NumberFormat, {NumberFormatProps} from 'react-number-format'
import { Input, InputProps as ChakraInputProps } from '@chakra-ui/react'

import { useField } from '@unform/core'

interface Props extends NumberFormatProps {
    name: string
}

type InputProps = Props & ChakraInputProps

const MaskInput: React.FC<InputProps> = ({ name, ...rest }) => {
    const inputRef = useRef(null)
    const { fieldName, registerField, defaultValue } = useField(name)

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value'
        })
    }, [fieldName, registerField])

    return (
        <NumberFormat id={fieldName} customInput={Input} getInputRef={inputRef} defaultValue={defaultValue} {...rest} />
    )
}

export default MaskInput