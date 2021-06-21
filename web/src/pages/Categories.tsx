import {
  Flex,
  Heading,
  Stack,
  Text,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  useToast,
  IconButton,
  Input as ChakraInput
} from '@chakra-ui/react'
import { Form } from '@unform/web'
import { useState } from 'react'
import { Input, Select } from '../components/Form'
import { useGet } from '../hooks/useGet'
import withSidebar from '../hooks/withSidebar'
import api from '../services/api'
import ICategory from '../types/ICategory'
import { FiEdit } from 'react-icons/fi'

const Categories = () => {
  const { data: categories, mutate } = useGet<ICategory[]>('/categories')
  const toast = useToast()

  const {
    isOpen: newCategoryIsOpen,
    onClose: newCategoryOnClose,
    onOpen: newCategoryOnOpen
  } = useDisclosure()
  const [newCategoryIsLoading, setNewCategoryIsLoading] = useState(false)

  const [editCategory, setEditCategory] = useState<ICategory>()
  const {
    isOpen: editCategoryIsOpen,
    onClose: editCategoryOnClose,
    onOpen: editCategoryOnOpen
  } = useDisclosure()
  const [editCategoryIsLoading, setEditCategoryIsLoading] = useState(false)

  function handleNewCategorySubmit(data: {
    type: 'INCOME' | 'EXPENSE'
    name: string
  }) {
    setNewCategoryIsLoading(true)

    api
      .post('/categories', data)
      .then(() => {
        mutate()
        newCategoryOnClose()
      })
      .catch(() =>
        toast({
          title: 'Um erro inesperado ocorreu!',
          description: 'Recarregue a página e tente novamente',
          status: 'error',
          position: 'bottom-left',
          isClosable: true
        })
      )
      .finally(() => setNewCategoryIsLoading(false))
  }

  function handleEditCategorySubmit(data: { name: string }) {
    if (editCategory) {
      setEditCategoryIsLoading(true)

      api
        .put(`/categories/${editCategory.id}`, data)
        .then(() => {
          mutate()
          editCategoryOnClose()
        })
        .catch(() =>
          toast({
            title: 'Um erro inesperado ocorreu!',
            description: 'Recarregue a página e tente novamente',
            status: 'error',
            position: 'bottom-left',
            isClosable: true
          })
        )
        .finally(() => setEditCategoryIsLoading(false))
    }
  }

  return (
    <Flex as="main" flexDir="column" flex={1} mt={4} mr={8}>
      <Heading size="lg" color="teal.500">
        Categorias
      </Heading>

      <Modal isOpen={newCategoryIsOpen} onClose={newCategoryOnClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nova categoria</ModalHeader>
          <ModalCloseButton />
          <ModalBody mb={2}>
            <Form onSubmit={handleNewCategorySubmit}>
              <Select name="type">
                <option value="INCOME">Entrada</option>
                <option value="EXPENSE">Saída</option>
              </Select>
              <Input placeholder="Digite o nome aqui" mt={4} name="name" />
              <Flex justifyContent="flex-end" mt={6}>
                <Button
                  onClick={newCategoryOnClose}
                  mr={2}
                  colorScheme="red"
                  variant="ghost">
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  isLoading={newCategoryIsLoading}
                  colorScheme="green">
                  Criar
                </Button>
              </Flex>
            </Form>
          </ModalBody>
        </ModalContent>
      </Modal>

      {editCategory && (
        <Modal isOpen={editCategoryIsOpen} onClose={editCategoryOnClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Editar categoria - {editCategory.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody mb={2}>
              <Form
                initialData={editCategory}
                onSubmit={handleEditCategorySubmit}>
                <ChakraInput
                  isDisabled
                  value={editCategory.type === 'INCOME' ? 'Entrada' : 'Saída'}
                />
                <Input placeholder="Digite o nome aqui" mt={4} name="name" />
                <Flex justifyContent="flex-end" mt={6}>
                  <Button
                    onClick={editCategoryOnClose}
                    mr={2}
                    colorScheme="red"
                    variant="ghost">
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    isLoading={editCategoryIsLoading}
                    colorScheme="green">
                    Salvar
                  </Button>
                </Flex>
              </Form>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}

      <Stack mt={4}>
        <Flex
          borderWidth="1px"
          px={3}
          py={1}
          w="2xl"
          alignItems="center"
          borderRadius={7}>
          <Text flex={1} fontWeight="bold">
            Tipo
          </Text>
          <Text flex={1} fontWeight="bold">
            Nome
          </Text>
        </Flex>
        <Flex
          borderWidth="1px"
          px={3}
          py={1}
          w="2xl"
          alignItems="center"
          borderStyle="dashed"
          backgroundColor="gray.50"
          cursor="pointer"
          _hover={{ backgroundColor: 'gray.100' }}
          justifyContent="center"
          onClick={newCategoryOnOpen}
          borderRadius={7}>
          <Text color="gray.600" fontSize="sm">
            + Nova categoria
          </Text>
        </Flex>
        {categories?.map((category) => (
          <Flex
            w="2xl"
            key={category.id}
            borderWidth="1px"
            px={3}
            _hover={{ backgroundColor: 'gray.50' }}
            py={1}
            alignItems="center"
            borderRadius={7}>
            <Text
              fontWeight="semibold"
              color={category.type === 'INCOME' ? 'green.600' : 'red.600'}
              flex={1}>
              {category.type === 'INCOME' ? 'Entrada' : 'Saída'}
            </Text>
            <Text flex={1}>{category.name}</Text>
            <Stack direction="row">
              <IconButton
                size="sm"
                borderRadius={7}
                colorScheme="orange"
                onClick={() => {
                  setEditCategory(category)
                  editCategoryOnOpen()
                }}
                aria-label="Editar categoria"
                icon={<FiEdit />}
              />
            </Stack>
          </Flex>
        ))}
      </Stack>
    </Flex>
  )
}

export default withSidebar(Categories)
