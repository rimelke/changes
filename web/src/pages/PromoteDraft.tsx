import { Flex, Heading, Skeleton } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { useGet } from '../hooks/useGet'
import withSidebar from '../hooks/withSidebar'
import IDetailedDraft from '../types/IDetailedDraft'
import ProductForm from '../components/ProductForm'
import api from '../services/api'

interface Params {
  id: string
}

const PromoteDraft = () => {
  const { id } = useParams<Params>()
  const { data: draft } = useGet<IDetailedDraft>(`/drafts/${id}`)

  return (
    <Flex as="main" flexDir="column" flex={1} mt={4} mb={8} mr={8}>
      <Heading size="lg" color="teal.500">
        Promover rascunho
      </Heading>

      {draft ? (
        <ProductForm
          returnUrl="/drafts"
          initialData={
            draft && {
              ...draft,
              costs: [
                {
                  name: 'Modelagem & Estilista',
                  value:
                    (draft.changes
                      .map((change) => change.description)
                      .join('')
                      .split('- ').length -
                      1) *
                    0.12
                }
              ]
            }
          }
          onSubmit={(data) => api.put(`/drafts/promote/${id}`)}
        />
      ) : (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      )}
    </Flex>
  )
}

export default withSidebar(PromoteDraft)
