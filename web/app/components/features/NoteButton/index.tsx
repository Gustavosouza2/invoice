import { Card, CardContent } from '@/components/ui/card'

type NoteButtonProps = {
  icon: React.ReactNode
  onClick: () => void
  text: string
}

export const NoteButton = ({ icon, text, onClick }: NoteButtonProps) => {
  return (
    <Card
      onClick={onClick}
      className="cursor-pointer  bg-input-default border border-transparent hover:border-zinc-700"
    >
      <CardContent className="flex flex-col gap-1 justify-center items-center p-4">
        <p className="font-inter text-sm font-medium">{text}</p>
        <div className="">{icon}</div>
      </CardContent>
    </Card>
  )
}
