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
    setFilters({ ...filters, name: e.target.value })
  }

  const { state } = useSidebar()

  return (
    <>
      {isLoading ? (
        <Skeleton className="w-64 h-64 rounded-xl" />
      ) : (
        <Card
          className={`
        ${state === 'expanded' ? 'md-mobile:w-[250px] md-mobile:px-5' : 'md-mobile:w-full'}
        h-auto px-8 py-6 rounded-xl border border-bg-secondary/40
        bg-gradient-to-br from-bg-default to-bg-primary shadow-xl/40
        hover:shadow-xl/60 transition-all duration-300 hover:border-bg-secondary/60`}
        >
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
