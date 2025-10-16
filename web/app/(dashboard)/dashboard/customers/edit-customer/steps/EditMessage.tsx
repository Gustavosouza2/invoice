import Image from 'next/image'

import SuccessImage from '@/assets/images/boy-img.png'
import { Button } from '@/components/features/Button'

export const EditMessage = ({ onClose }: { onClose: VoidFunction }) => {
  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <div>
        <Image alt="" src={SuccessImage} height={230} width={230} />
      </div>

      <div className="mt-16 w-full">
        <Button type="button" onClick={onClose}>
          FECHAR
        </Button>
      </div>
    </div>
  )
}
