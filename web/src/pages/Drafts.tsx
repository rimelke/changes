import { useDisclosure } from '@chakra-ui/hooks'
import {
  Box,
  Flex,
  Heading,
  Link,
  Stack,
  StackDivider,
  Text
} from '@chakra-ui/layout'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/modal'
import {
  Table,
  Tbody,
  Thead,
  Th,
  Td,
  Tr,
  Select as ChakraSelect
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { useGet } from '../hooks/useGet'
import withSidebar from '../hooks/withSidebar'
import IDetailedDraft from '../types/IDetailedDraft'
import IDraft from '../types/IDraft'
import { FiDownload, FiPlus, FiEdit2 } from 'react-icons/fi'
import { Button, IconButton } from '@chakra-ui/button'
import { Dropzone, Input, Select, Textarea } from '../components/Form'
import { Form } from '@unform/web'
import api from '../services/api'
import { FormHandles } from '@unform/core'
import IGroup from '../types/IGroup'
import { useToast } from '@chakra-ui/toast'

const Drafts = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null)
  const [search, setSearch] = useState<string | null>(null)
  const [selectedSituation, setSelectedSituation] = useState<string | null>(
    null
  )

  const { data: drafts, mutate: draftsMutate } = useGet<IDraft[]>(
    `/drafts?` +
      (selectedType !== null
        ? `type=${encodeURIComponent(selectedType)}`
        : '') +
      (selectedGroupId !== null ? `&groupId=${selectedGroupId}` : '') +
      (selectedSituation !== null
        ? `&situation=${encodeURIComponent(selectedSituation)}`
        : '') +
      (search !== null ? `&search=${encodeURIComponent(search)}` : '')
  )
  const { data: groups } = useGet<IGroup[]>('/groups')

  const [selectedDraftId, setSelectedDraftId] = useState<string | null>(null)
  const { data: selectedDraft, mutate } = useGet<IDetailedDraft>(
    `/drafts/${selectedDraftId}`
  )
  const { isOpen, onClose, onOpen } = useDisclosure()
  const {
    isOpen: newChangeIsOpen,
    onClose: newChangeOnClose,
    onOpen: newChangeOnOpen
  } = useDisclosure()
  const [newChangeLoading, setNewChangeLoading] = useState(false)
  const newChangeFormRef = useRef<FormHandles>(null)
  const {
    isOpen: editDraftIsOpen,
    onClose: editDraftOnClose,
    onOpen: editDraftOnOpen
  } = useDisclosure()
  const [editDraftLoading, setEditDraftLoading] = useState(false)
  const toast = useToast()
  const {
    isOpen: newDraftIsOpen,
    onClose: newDraftOnClose,
    onOpen: newDraftOnOpen
  } = useDisclosure()
  const [newDraftLoading, setNewDraftLoading] = useState(false)

  function handleSubmitNewChange(data: {
    description: string
    file: File | null
  }) {
    if (!data.file) {
      newChangeFormRef.current?.setFieldError('file', 'Selecione um arquivo!')
    } else if (selectedDraftId) {
      newChangeFormRef.current?.setErrors({})
      setNewChangeLoading(true)

      const formData = new FormData()
      formData.append('file', data.file)
      if (data.description.trim())
        formData.append('description', data.description.trim())
      formData.append('referenceType', 'draft')
      formData.append('referenceId', selectedDraftId)

      api
        .post('/changes', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then(() => {
          mutate()
          draftsMutate()
          newChangeOnClose()
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
        .finally(() => setNewChangeLoading(false))
    }
  }

  function handleSubmitEditDraft(data: {
    name: string
    groupId: string
    type: string
  }) {
    if (selectedDraftId) {
      setEditDraftLoading(true)
      api
        .put(`/drafts/${selectedDraftId}`, data)
        .then(() => {
          mutate()
          draftsMutate()
          editDraftOnClose()
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
        .finally(() => setEditDraftLoading(false))
    }
  }

  function handleSubmitNewDraft(data: {
    name: string
    groupId: string
    type: string
  }) {
    setNewDraftLoading(true)
    api
      .post('/drafts', data)
      .then(() => {
        draftsMutate()
        newDraftOnClose()
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
      .finally(() => setNewDraftLoading(false))
  }

  return (
    <Flex as="main" flexDir="column" flex={1} mt={4} mr={8}>
      <Heading size="lg" color="teal.500">
        Rascunhos
      </Heading>
      <Flex
        as={Form}
        onSubmit={(data: any) => setSearch(data.search || null)}
        gridGap={4}
        mt={4}>
        <Button colorScheme="teal" onClick={newDraftOnOpen}>
          Novo
        </Button>
        <ChakraSelect
          width="max-content"
          placeholder="Filtre por coleção"
          onChange={(e) => setSelectedGroupId(e.target.value || null)}>
          {groups?.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </ChakraSelect>
        <ChakraSelect
          width="max-content"
          placeholder="Filtre por tipo"
          onChange={(e) => setSelectedType(e.target.value || null)}>
          <option value="Bermuda">Bermuda</option>
          <option value="Blusa">Blusa</option>
          <option value="Calça">Calça</option>
          <option value="Casaco">Casaco</option>
          <option value="Conjunto">Conjunto</option>
          <option value="Jaqueta">Jaqueta</option>
          <option value="Macacão">Macacão</option>
          <option value="Moletom">Moletom</option>
          <option value="Vestido">Vestido</option>
        </ChakraSelect>
        <ChakraSelect
          width="max-content"
          placeholder="Filtre por situação"
          onChange={(e) => setSelectedSituation(e.target.value || null)}>
          <option value="Rascunho">Rascunho</option>
          <option value="Aprovado">Aprovado</option>
          <option value="Pronto">Pronto</option>
        </ChakraSelect>
        <Input name="search" placeholder="Pesquise por algo" flex={1} />
      </Flex>

      <Modal isOpen={newDraftIsOpen} onClose={newDraftOnClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Novo rascunho</ModalHeader>
          <ModalCloseButton />
          <ModalBody mb={2}>
            <Form onSubmit={handleSubmitNewDraft}>
              <Input isRequired name="name" placeholder="Digite o nome" />
              <Select isRequired mt={4} name="groupId">
                {groups?.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </Select>
              <Select isRequired mt={4} name="type">
                <option value="Bermuda">Bermuda</option>
                <option value="Blusa">Blusa</option>
                <option value="Calça">Calça</option>
                <option value="Casaco">Casaco</option>
                <option value="Conjunto">Conjunto</option>
                <option value="Jaqueta">Jaqueta</option>
                <option value="Macacão">Macacão</option>
                <option value="Moletom">Moletom</option>
                <option value="Vestido">Vestido</option>
              </Select>
              <Flex mt={6} justifyContent="flex-end">
                <Button
                  isLoading={newDraftLoading}
                  ml={2}
                  colorScheme="green"
                  type="submit">
                  Criar
                </Button>
              </Flex>
            </Form>
          </ModalBody>
        </ModalContent>
      </Modal>

      {selectedDraft && (
        <>
          <Modal isOpen={editDraftIsOpen} onClose={editDraftOnClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Editar rascunho - {selectedDraft.name}</ModalHeader>
              <ModalCloseButton />
              <ModalBody mb={2}>
                <Form
                  initialData={selectedDraft}
                  onSubmit={handleSubmitEditDraft}>
                  <Input isRequired name="name" placeholder="Digite o nome" />
                  <Select isRequired mt={4} name="groupId">
                    {groups?.map((group) => (
                      <option key={group.id} value={group.id}>
                        {group.name}
                      </option>
                    ))}
                  </Select>
                  <Select isRequired mt={4} name="type">
                    <option value="Bermuda">Bermuda</option>
                    <option value="Blusa">Blusa</option>
                    <option value="Calça">Calça</option>
                    <option value="Casaco">Casaco</option>
                    <option value="Conjunto">Conjunto</option>
                    <option value="Jaqueta">Jaqueta</option>
                    <option value="Macacão">Macacão</option>
                    <option value="Moletom">Moletom</option>
                    <option value="Vestido">Vestido</option>
                  </Select>
                  <Select
                    name="situation"
                    isRequired
                    mt={4}
                    placeholder="Selecione a situação">
                    <option value="Rascunho">Rascunho</option>
                    <option value="Aprovado">Aprovado</option>
                    <option value="Pronto">Pronto</option>
                  </Select>
                  <Flex mt={6} justifyContent="flex-end">
                    <Button
                      onClick={editDraftOnClose}
                      colorScheme="red"
                      variant="ghost">
                      Cancelar
                    </Button>
                    <Button
                      ml={2}
                      isLoading={editDraftLoading}
                      colorScheme="green"
                      type="submit">
                      Salvar
                    </Button>
                  </Flex>
                </Form>
              </ModalBody>
            </ModalContent>
          </Modal>

          <Modal isOpen={newChangeIsOpen} onClose={newChangeOnClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Nova modificação - {selectedDraft.name}</ModalHeader>
              <ModalCloseButton />
              <ModalBody mb={2}>
                <Form ref={newChangeFormRef} onSubmit={handleSubmitNewChange}>
                  <Textarea name="description" />
                  <Dropzone mt={2} name="file" />
                  <Flex justifyContent="flex-end" mt={4}>
                    <Button
                      isLoading={newChangeLoading}
                      colorScheme="green"
                      type="submit">
                      Enivar
                    </Button>
                  </Flex>
                </Form>
              </ModalBody>
            </ModalContent>
          </Modal>

          <Modal size="xl" onClose={onClose} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{selectedDraft.name}</ModalHeader>
              <ModalCloseButton />
              <ModalBody mb={2} mt={-4}>
                <Flex justifyContent="space-between">
                  <Text color="gray.500">Coleção:</Text>
                  <Text color="gray.500">{selectedDraft.group.name}</Text>
                </Flex>
                <Flex justifyContent="space-between">
                  <Text color="gray.500">Tipo:</Text>
                  <Text color="gray.500">{selectedDraft.type || '-'}</Text>
                </Flex>
                <Flex justifyContent="space-between">
                  <Text color="gray.500">Situação:</Text>
                  <Text color="gray.500">{selectedDraft.situation}</Text>
                </Flex>
                <Flex justifyContent="space-between">
                  <Text color="gray.500">Última modificação:</Text>
                  <Text color="gray.500">
                    {new Date(selectedDraft.updatedAt).toLocaleString('pt-br', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: 'numeric',
                      minute: '2-digit'
                    })}
                  </Text>
                </Flex>
                <Flex mt={6} alignItems="center" justifyContent="space-between">
                  <Heading size="md">Modificações</Heading>
                  <Stack direction="row">
                    <IconButton
                      size="xs"
                      variant="outline"
                      colorScheme="teal"
                      borderRadius={7}
                      onClick={newChangeOnOpen}
                      aria-label="Adicionar modificação"
                      icon={<FiPlus size={22} />}
                    />
                    <IconButton
                      size="xs"
                      borderRadius={7}
                      variant="outline"
                      colorScheme="orange"
                      onClick={editDraftOnOpen}
                      aria-label="Editar rascunho"
                      icon={<FiEdit2 size={18} />}
                    />
                  </Stack>
                </Flex>
                <Stack mt={4} divider={<StackDivider />}>
                  {selectedDraft.changes.map((change) => (
                    <Flex
                      alignItems="center"
                      justifyContent="space-between"
                      key={change.id}>
                      <Text fontWeight="medium" flex={1}>
                        {new Date(change.createdAt).toLocaleString('pt-br', {
                          day: '2-digit',
                          month: '2-digit',
                          year: '2-digit',
                          hour: 'numeric',
                          minute: '2-digit'
                        })}
                      </Text>
                      <Box ml={4} flex={2}>
                        <pre>{change.description}</pre>
                      </Box>
                      <Link ml={4} isExternal href={change.url}>
                        <FiDownload size={18} />
                      </Link>
                    </Flex>
                  ))}
                </Stack>
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      )}

      <Table mt={4} borderWidth="1px">
        <Thead>
          <Tr>
            <Th>Coleção</Th>
            <Th>Tipo</Th>
            <Th>Nome</Th>
            <Th>Situação</Th>
            <Th>Últ. Modificação</Th>
          </Tr>
        </Thead>
        <Tbody>
          {drafts?.map((draft) => (
            <Tr
              _hover={{ bg: 'gray.50' }}
              cursor="pointer"
              onClick={() => {
                setSelectedDraftId(draft.id)
                onOpen()
              }}
              key={draft.id}>
              <Td>{draft.group.name}</Td>
              <Td>{draft.type}</Td>
              <Td>{draft.name}</Td>
              <Td>{draft.situation}</Td>
              <Td>
                {new Date(draft.updatedAt).toLocaleString('pt-br', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: 'numeric',
                  minute: '2-digit'
                })}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
  )
}

export default withSidebar(Drafts)
