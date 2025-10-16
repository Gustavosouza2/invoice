import Image from 'next/image'

import Logo from '@/assets/images/logo.png'

export const HeaderLogin = () => {
  return (
    <header className="flex z-20 fixed w-full h-16 justify-between items-center p-2 bg-transparent">
      <div className="flex md:ml-28 ml-10 mt-2">
        <Image src={Logo} alt="logo" height={40} width={40} quality={100} />
      </div>
    </header>
  )
}
