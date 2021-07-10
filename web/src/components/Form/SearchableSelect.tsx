import { Flex } from '@chakra-ui/react'
import { useField } from '@unform/core'
import { useRef, useEffect, FC } from 'react'

import { ControlProps, OptionTypeBase } from 'react-select'
import AsyncSelect, { Props as AsyncProps } from 'react-select/async'

interface SearchableSelectProps extends AsyncProps<OptionTypeBase, false> {
  name: string
  returnOption?: boolean
}

const SearchableSelect: FC<SearchableSelectProps> = ({
  name,
  returnOption,
  ...rest
}) => {
  const selectRef = useRef(null)
  const { fieldName, defaultValue, registerField } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.select.state.value) {
            return []
          }

          return returnOption
            ? ref.select.state.value
            : ref.select.state.value.map((opt: OptionTypeBase) => opt.value)
        }

        if (!ref.select.state.value) {
          return returnOption ? null : ''
        }

        return returnOption
          ? ref.select.state.value
          : ref.select.state.value.value
      }
    })
  }, [registerField, fieldName, rest.isMulti])

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
    <AsyncSelect
      ref={selectRef}
      defaultValue={defaultValue}
      classNamePrefix="react-select"
      styles={{ placeholder: () => ({ color: 'black' }) }}
      components={{ Control }}
      {...rest}
    />
  )
}

export default SearchableSelect
