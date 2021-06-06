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
  const { data: drafts, mutate: draftsMutate } = useGet<IDraft[]>('/drafts')
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

  function handleSubmitEditDraft(data: { name: string; groupId: string }) {
    console.log(data)
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

  return (
    <Flex as="main" flexDir="column" flex={1} mt={4} mr={8}>
      <Heading size="lg" color="teal.500">
        Rascunhos
      </Heading>
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
                  <Text color="gray.500">Última modificação:</Text>
                  <Text color="gray.500">
                    {new Date(selectedDraft.updatedAt).toLocaleString()}
                  </Text>
                </Flex>
                <Flex mt={6} alignItems="center" justifyContent="space-between">
                  <Heading size="md">Modificações</Heading>
                  <Stack direction="row">
                    <IconButton
                      size="xs"
                      variant="outline"
                      colorScheme="teal"
                      onClick={newChangeOnOpen}
                      aria-label="Adicionar modificação"
                      icon={<FiPlus size={22} />}
                    />
                    <IconButton
                      size="xs"
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
      <Stack mt={4}>
        <Flex
          borderWidth="1px"
          px={3}
          py={1}
          alignItems="center"
          borderRadius={7}>
          <Text fontWeight="bold" flex={1}>
            Coleção
          </Text>
          <Text fontWeight="bold" flex={3}>
            Nome
          </Text>
          <Text fontWeight="bold" flex={1}>
            Últ. Modificação
          </Text>
        </Flex>
        {drafts?.map((draft) => (
          <Flex
            key={draft.id}
            borderWidth="1px"
            px={3}
            _hover={{ bg: 'gray.50' }}
            cursor="pointer"
            onClick={() => {
              setSelectedDraftId(draft.id)
              onOpen()
            }}
            py={1}
            alignItems="center"
            borderRadius={7}>
            <Text flex={1}>{draft.group.name}</Text>
            <Text flex={3}>{draft.name}</Text>
            <Text flex={1}>{new Date(draft.updatedAt).toLocaleString()}</Text>
          </Flex>
        ))}
      </Stack>
    </Flex>
  )
}

export default withSidebar(Drafts)
