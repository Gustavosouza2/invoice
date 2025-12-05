import { Card } from '@/components/ui/card'
import { useQueryState } from 'nuqs'
import { Input } from '../Input'
import { useSidebar } from '@/components/ui/sidebar'

export const Filter = () => {
  const [name, setName] = useQueryState('name')
  const { state } = useSidebar()

  return (
    <Card
      className={`
      ${state === 'expanded' ? 'md-mobile:w-[250px] md-mobile:px-5' : 'md-mobile:w-full'}
      h-auto px-10 py-6 rounded-xl border border-bg-secondary/40
      bg-gradient-to-br from-bg-default to-bg-primary shadow-xl/40
      hover:shadow-xl/60 transition-all duration-300 hover:border-bg-secondary/60`}
    >
      <div className="text-md font-poppins mb-4">Filtros</div>
      <Input
        type="text"
        value={name ?? ''}
        iconType="name"
        placeholder="Filtrar pelo nome"
        onChange={(e) => setName(e.target.value)}
      />
    </Card>
  )
}
