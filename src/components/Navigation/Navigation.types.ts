export interface NavItem {
  label: string
  href: string
  id: string
}

export interface NavigationProps {
  items?: NavItem[]
  className?: string
}
