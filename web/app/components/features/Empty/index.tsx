type EmptyBannerProps = {
  title: string
  icon: JSX.Element
  description: string
}

export const EmptyBanner = ({ title, description, icon }: EmptyBannerProps) => {
  return (
    <div className="flex flex-col items-center justify-center">
      {icon}
      <h1 className="text-2xl font-bold text-text-primary/40">{title}</h1>
      <p className="text-sm text-text-primary/40">{description}</p>
    </div>
  )
}
