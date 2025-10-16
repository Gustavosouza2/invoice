export const FooterLogin = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="flex fixed bottom-0 left-0 right-0 w-full justify-center items-center h-14 bg-[#1E1E20] border-t-2 border-[#a1a1aa28]">
      <p className="text-[#fafafaaf] font-mono font-semibold md:text-sm opacity-100 animate-fade animate-once animate-duration-1000">
        © {year} All rights reserved
      </p>
    </footer>
  )
}
