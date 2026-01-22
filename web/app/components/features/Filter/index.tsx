import { TbFileInvoice } from 'react-icons/tb'

import { NoteButton } from '@/components/features/Button/NoteButton'
import { usePagination } from '@/hooks/usePagination'
import { useSidebar } from '@/components/ui/sidebar'
import { Skeleton } from '@/components/ui/skeleton'
import { Card } from '@/components/ui/card'

import { Input } from '../Input'

type FilterProps = {
  isLoading: boolean
  handleCreateInvoice: () => void
}

export const Filter = ({ isLoading, handleCreateInvoice }: FilterProps) => {
  const { filters, setFilters } = usePagination()

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ name: e.target.value })
  }

  const { state } = useSidebar()

  const cardClassName = `
    ${state === 'expanded' ? 'md-mobile:w-[250px] md-mobile:px-5' : 'md-mobile:w-full'}
    h-auto px-4 md:px-8 py-6 rounded-xl border border-accent/40
    bg-gradient-to-br from-bg to-bg-primary shadow-xl/40
    hover:shadow-xl/60 transition-all duration-300 hover:border-accent/60`

  return (
    <>
      {isLoading ? (
        <div
          className={`
            ${state === 'expanded' ? 'md-mobile:w-[250px] md-mobile:px-5' : 'md-mobile:w-full'}
            w-full px-4 md:px-8 py-6 rounded-xl border border-accent/40
            bg-gradient-to-br from-bg to-bg-primary
          `}
        >
          <div className="flex flex-col space-y-4">
            <Skeleton className="w-16 h-5 rounded" />
            <Skeleton className="w-full h-10 rounded" />
            <Skeleton className="w-24 h-20 rounded-xl mt-6" />
          </div>
        </div>
      ) : (
        <Card className={cardClassName}>
          <div className="flex flex-col">
            <div className="text-md font-poppins mb-4">Filtros</div>
            <Input
              type="text"
              iconType="name"
              value={filters.name ?? ''}
              onChange={handleNameChange}
              placeholder="Filtrar pelo nome"
            />
            <div className="flex flex-row mt-10 gap-5">
              <NoteButton
                text="Criar Nota"
                onClick={handleCreateInvoice}
                icon={<TbFileInvoice size={25} />}
                className="w-24 h-20 flex justify-center items-center rounded-xl"
              />
            </div>
          </div>
        </Card>
      )}
    </>
  )
}
