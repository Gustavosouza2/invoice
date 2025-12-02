export type NavItem = {
  icon?: () => React.JSX.Element
  isActive?: boolean
  title: string
  url: string
  items?: {
    title: string
    url: string
  }[]
}

export type SideBarProps = {
  navItems: NavItem[]
}
