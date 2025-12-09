import { useQueryStates, parseAsInteger, parseAsString } from 'nuqs'

export const usePagination = () => {
  const [filters, setFilters] = useQueryStates({
    pageSize: parseAsInteger.withDefault(10),
    page: parseAsInteger.withDefault(1),
    name: parseAsString.withDefault(''),
  })

  return {
    filters,
    setFilters,
  }
}
