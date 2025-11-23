import { Skeleton } from '@/components/ui/skeleton'
import {
  Card as CardShadcn,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export interface CardProps {
  typeInfo: 'text' | 'decrypted'
  type?: 'number' | 'string'
  description?: string
  title?: string
  info?: string
}

interface CardMapProps {
  data: Array<CardProps>
  isLoading: boolean
}

export const Card = ({ data, isLoading }: CardMapProps) => {
  return data.map((item, index: number) => (
    <>
      {isLoading ? (
        <Skeleton className="w-full h-36 rounded-xl" />
      ) : (
        <CardShadcn
          className="w-full rounded-xl border border-bg-secondary bg-bg-primary shadow-xl/30"
          key={index}
        >
          <CardHeader>
            {item.typeInfo === 'text' ? (
              <CardTitle className="text-[#D1D1D2] font-poppins text-md whitespace-normal tracking-wide">
                {item.title}
              </CardTitle>
            ) : (
              <div className="text-[#D1D1D2] font-poppins text-lg font-bold whitespace-normal">
                <h1 className="text-2xl font-semibold text-start">
                  {item.title}
                </h1>
              </div>
            )}

            {item.type === 'number' ? (
              <h2 className="count-up-text">{item.info}</h2>
            ) : (
              <p className="text-[#D1D1D2] text-2xl font-sans font-bold whitespace-normal">
                {item.info}
              </p>
            )}

            <CardDescription className="font-sans text-sm text-[#A1A1AA] whitespace-normal">
              {item.description}
            </CardDescription>
          </CardHeader>
        </CardShadcn>
      )}
    </>
  ))
}
