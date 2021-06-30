import {
  Button,
  Flex,
  Heading,
  IconButton,
  Stack,
  Text,
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
  CloseButton,
  Box
} from '@chakra-ui/react'
import { Form } from '@unform/web'
import { useState } from 'react'
import { Input, MaskInput, Select } from '../components/Form'
import withSidebar from '../hooks/withSidebar'
import { FiEdit, FiTrash2, FiCheck, FiX } from 'react-icons/fi'
import { useGet } from '../hooks/useGet'
import api from '../services/api'

interface Provider {
  id: number
  name: string
}

interface Fabric {
  id: number
  name: string
  providerId: number
  provider: {
    name: string
  }
  price: number
  width: number
  grammage: number
}

const Fabrics = () => {
  const [editingFabrics, setEditingFabrics] = useState<number[]>([])
  const { data: providers } = useGet<Provider[]>('/providers')
  const { data: fabrics, mutate } = useGet<Fabric[]>('/fabrics')
  const [submitLoading, setSubmitLoading] = useState(false)
  const [deleteError, setDeleteError] = useState(false)

  function handleSubmit(data: any) {
    data.width = Number(data.width.replace(',', '.'))
    data.grammage = Number(data.grammage)
    data.price = Number(data.price.replace(',', '.'))
    setSubmitLoading(true)
    api
      .post('/fabrics', data)
      .then(() => mutate())
      .catch((e) => console.log(e.response))
      .finally(() => setSubmitLoading(false))
  }

  function handleDelete(id: number) {
    api
      .delete(`/fabrics/${id}`)
      .then(() => mutate())
      .catch((e) => {
        if (
          e.response?.data?.message ===
          'There are products linked to this fabric'
        ) {
          return setDeleteError(true)
        }

        console.log(e.response)
      })
  }

  function handleEdit(id: number) {
    if (!editingFabrics.includes(id)) {
      setEditingFabrics([...editingFabrics, id])
    }
  }

  function cancelEdit(id: number) {
    setEditingFabrics(editingFabrics.filter((elm) => elm !== id))
  }

  function saveEdit(id: number, data: any) {
    data.width = Number(data.width.replace(',', '.'))
    data.grammage = Number(data.grammage)
    data.price = Number(data.price.replace(',', '.'))
    api
      .put(`/fabrics/${id}`, data)
      .then(() => {
        mutate()
        cancelEdit(id)
      })
      .catch((e) => console.log(e.response))
  }

  return (
    <Flex flexDir="column" as="main" flex={1} mt={4}>
      <Heading size="lg" color="teal.500">
        Tecidos
      </Heading>
      <Flex flexDir="column" mt={4} as={Form} onSubmit={handleSubmit}>
        <Flex>
          <Select
            isRequired
            name="providerId"
            w={56}
            placeholder="Selecione o fornecedor">
            {providers?.map((provider) => (
              <option key={provider.id} value={provider.id}>
                {provider.name}
              </option>
            ))}
          </Select>
          <Input
            isRequired
            w={80}
            ml={4}
            autoComplete="off"
            name="name"
            placeholder="Nome do tecido"
          />
        </Flex>
        <Flex mt={4}>
          <MaskInput
            autoComplete="off"
            isRequired
            w={32}
            name="grammage"
            placeholder="Gramatura"
            format="###"
          />
          <MaskInput
            isRequired
            ml={4}
            w={32}
            name="width"
            autoComplete="off"
            placeholder="Largura"
            decimalSeparator=","
            decimalScale={2}
            fixedDecimalScale
          />
          <MaskInput
            w={32}
            isRequired
            ml={4}
            placeholder="Preço"
            autoComplete="off"
            decimalSeparator=","
            decimalScale={2}
            fixedDecimalScale
            name="price"
          />
          <Button
            isLoading={submitLoading}
            colorScheme="teal"
            ml={4}
            type="submit">
            Cadastrar
          </Button>
        </Flex>
      </Flex>
      {deleteError && (
        <Alert w={750} mt={4} status="warning">
          <AlertIcon />
          <AlertTitle mr={2}>Não foi possível excluir este tecido!</AlertTitle>
          <AlertDescription>
            Ainda existem produtos atrelados a ele.
          </AlertDescription>
          <CloseButton
            onClick={() => setDeleteError(false)}
            position="absolute"
            right="8px"
            top="8px"
          />
        </Alert>
      )}
      <Stack mt={4}>
        <Flex
          alignItems="center"
          width={750}
          borderRadius={7}
          px={3}
          py={1}
          borderWidth="1px">
          <Text fontWeight="bold" flex={3}>
            Fornecedor
          </Text>
          <Text fontWeight="bold" flex={5}>
            Nome
          </Text>
          <Text textAlign="center" fontWeight="bold" flex={2}>
            Gramatura
          </Text>
          <Text textAlign="center" fontWeight="bold" flex={2}>
            Largura
          </Text>
          <Text textAlign="center" fontWeight="bold" flex={2}>
            Preço
          </Text>
          <Box w="68px" />
        </Flex>
        {fabrics?.map((fabric) =>
          editingFabrics.includes(fabric.id) ? (
            <Flex
              key={fabric.id}
              alignItems="center"
              width={750}
              justifyContent="space-between"
              borderRadius={7}
              p={3}
              _hover={{ bg: 'gray.50' }}
              borderWidth="1px"
              onSubmit={(data) => saveEdit(fabric.id, data)}
              initialData={{
                ...fabric,
                width: Number(fabric.width),
                price: Number(fabric.price)
              }}
              as={Form}>
              <Select isRequired name="providerId" w={32} h={8}>
                {providers?.map((provider) => (
                  <option key={provider.id} value={provider.id}>
                    {provider.name}
                  </option>
                ))}
              </Select>
              <Input
                isRequired
                w={44}
                h={8}
                name="name"
                placeholder="Nome do tecido"
              />
              <MaskInput
                isRequired
                h={8}
                w={20}
                name="grammage"
                mask="_"
                placeholder="Gram."
                format="###"
              />
              <MaskInput
                w={20}
                h={8}
                isRequired
                name="width"
                placeholder="Larg."
                decimalSeparator=","
                decimalScale={2}
                fixedDecimalScale
              />
              <MaskInput
                w={24}
                h={8}
                isRequired
                placeholder="Preço"
                decimalSeparator=","
                decimalScale={2}
                fixedDecimalScale
                name="price"
              />
              <Flex>
                <IconButton
                  size="sm"
                  borderRadius={7}
                  colorScheme="green"
                  aria-label="Salvar edições"
                  type="submit"
                  icon={<FiCheck />}
                />
                <IconButton
                  ml={1}
                  size="sm"
                  borderRadius={7}
                  colorScheme="red"
                  aria-label="Cancelar edições"
                  onClick={() => cancelEdit(fabric.id)}
                  icon={<FiX />}
                />
              </Flex>
            </Flex>
          ) : (
            <Flex
              key={fabric.id}
              alignItems="center"
              width={750}
              borderRadius={7}
              _hover={{ bg: 'gray.50' }}
              p={3}
              borderWidth="1px">
              <Text flex={3}>{fabric.provider.name}</Text>
              <Text flex={5}>{fabric.name}</Text>
              <Text textAlign="center" flex={2}>
                {fabric.grammage} g/m²
              </Text>
              <Text textAlign="center" flex={2}>
                {Number(fabric.width).toLocaleString('pt-BR', {
                  minimumFractionDigits: 2
                })}{' '}
                m
              </Text>
              <Text textAlign="center" flex={2}>
                {Number(fabric.price).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </Text>
              <Flex w="68px">
                <IconButton
                  size="sm"
                  colorScheme="orange"
                  borderRadius={7}
                  aria-label="Editar tecido"
                  onClick={() => handleEdit(fabric.id)}
                  icon={<FiEdit />}
                />
                <IconButton
                  ml={1}
                  size="sm"
                  colorScheme="red"
                  borderRadius={7}
                  aria-label="Apagar tecido"
                  onClick={() => handleDelete(fabric.id)}
                  icon={<FiTrash2 />}
                />
              </Flex>
            </Flex>
          )
        )}
      </Stack>
    </Flex>
  )
}

export default withSidebar(Fabrics)
