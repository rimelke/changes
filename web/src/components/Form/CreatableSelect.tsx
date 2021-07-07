import { useState, FC, useRef, useEffect } from 'react'
import CSelect, { Props as CreatableSelectProps } from 'react-select/creatable'
import { Flex } from '@chakra-ui/react'
import { ControlProps, OptionTypeBase } from 'react-select'

import { useField } from '@unform/core'

interface Props extends CreatableSelectProps<OptionTypeBase, false> {
  onCreate: (value: string) => Promise<OptionTypeBase>
  name: string
}

const CreatableSelect: FC<Props> = ({ name, onCreate, ...rest }) => {
  const [value, setValue] = useState<OptionTypeBase | null>(null)
  const selectRef = useRef(null)
  const { defaultValue, fieldName, registerField } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: () => value?.value || null
    })
  }, [fieldName, registerField, value])

  const Control: FC<ControlProps<OptionTypeBase, false>> = ({
    children,
    innerRef,
    innerProps
  }) => {
    return (
      <Flex
        pl={2}
        ref={innerRef}
        borderRadius="md"
        borderWidth="1px"
        {...innerProps}>
        {children}
      </Flex>
    )
  }

  return (
    <CSelect
      {...rest}
      ref={selectRef}
      defaultValue={defaultValue}
      onChange={(opt) => setValue(opt)}
      components={{ Control }}
      styles={{ placeholder: () => ({ color: 'black' }) }}
      onCreateOption={(value) => onCreate(value).then(setValue)}
      value={value}
    />
  )
}

export default CreatableSelect
