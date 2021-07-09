import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  Flex,
  Button,
  useToast,
  UseDisclosureReturn
} from '@chakra-ui/react'
import { Form } from '@unform/web'
import { useState, FC } from 'react'
import { useGet } from '../hooks/useGet'
import ICategory from '../types/ICategory'

import { Select, Input, MaskInput } from './Form'

interface IBudgetData {
  categoryId: string
  description: string
  date: string
  value: number
}

interface IBudgetModalProps {
  disclosure: UseDisclosureReturn
  onSubmit: (data: IBudgetData) => Promise<any>
  resolveCallback?: (data: any) => void
}

const BudgetModal: FC<IBudgetModalProps> = ({
  disclosure,
  onSubmit,
  resolveCallback = () => {}
}) => {
  const { data: categories } = useGet<ICategory[]>('/categories')

  const [isLoading, setIsLoading] = useState(false)

  const toast = useToast()

  function handleSubmit(data: any) {
    setIsLoading(true)
    onSubmit({
      ...data,
      value: Number(
        data.value.replace('R$ ', '').replace('.', '').replace(',', '.')
      )
    })
      .then((value) => {
        disclosure.onClose()
        resolveCallback(value)
      })
      .catch(() => {
        setIsLoading(false)
        toast({
          title: 'Um erro inesperado ocorreu!',
          description: 'Recarregue a página e tente novamente',
          status: 'error',
          position: 'bottom-left',
          isClosable: true
        })
      })
  }

  return (
    <Modal isOpen={disclosure.isOpen} onClose={disclosure.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Adicionar registro</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <Select isRequired name="categoryId">
              {categories?.map((category) => (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
            <Input
              mt={2}
              isRequired
              name="description"
              placeholder="Digite a descrição"
            />
            <Input isRequired mt={2} name="date" type="date" />
            <MaskInput
              decimalSeparator=","
              decimalScale={2}
              fixedDecimalScale
              isRequired
              mt={2}
              thousandSeparator="."
              prefix="R$ "
              placeholder="Digite o valor"
              name="value"
            />
            <Flex justifyContent="flex-end" mt={4}>
              <Button
                onClick={disclosure.onClose}
                colorScheme="red"
                mr={2}
                variant="ghost">
                Cancelar
              </Button>
              <Button isLoading={isLoading} type="submit" colorScheme="green">
                Adicionar
              </Button>
            </Flex>
          </Form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default BudgetModal
