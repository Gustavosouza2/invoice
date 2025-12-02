import { Skeleton } from '@/components/ui/skeleton'
import {
  Card as CardShadcn,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export interface CardProps {
  type?: 'number' | 'string'
  description?: string
  isFirstCard?: boolean
  title?: string
  info?: string
}

interface CardMapProps {
  data: Array<CardProps>
  isLoading: boolean
}

export const Card = ({ data, isLoading }: CardMapProps) => {
  return data.map((item, index: number) => (
    <div key={index} className="w-full">
      {isLoading ? (
        <CardShadcn
          className={`${item.isFirstCard ? 'w-full' : 'w-[200px]'} rounded-xl border border-bg-secondary/40 bg-gradient-to-br from-bg-default to-bg-primary shadow-xl/40`}
        >
          <CardHeader className="space-y-4">
            <Skeleton className="h-7 w-3/4 rounded-md" />
            <Skeleton className="h-12 w-2/3 rounded-md" />
            <Skeleton className="h-5 w-full rounded-md" />
          </CardHeader>
        </CardShadcn>
      ) : (
        <CardShadcn className="w-full rounded-xl border border-bg-secondary/40 bg-gradient-to-br from-bg-default to-bg-primary shadow-xl/40 hover:shadow-xl/60 transition-all duration-300 hover:border-bg-secondary/60">
          <CardHeader>
            <CardTitle className="text-text-primary font-poppins text-lg whitespace-normal tracking-wide">
              {item?.title}
            </CardTitle>
            <h2 className="count-up-text text-text-secondary">{item?.info}</h2>

            <CardDescription className="font-sans text-sm text-text-tertiary whitespace-normal">
              {item?.description}
            </CardDescription>
          </CardHeader>
        </CardShadcn>
      )}
    </div>
  ))
}
