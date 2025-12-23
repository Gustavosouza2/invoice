import {
  MdOutlineLock,
  MdOutlineEmail,
  MdOutlinePhone,
  MdOutlinePerson,
} from 'react-icons/md'

type IconsInputProps = {
  iconType?: 'email' | 'password' | 'phone' | 'name'
}

export const inputIcons = ({ iconType }: IconsInputProps) => {
  if (!iconType) return null

  const icons: Record<typeof iconType, JSX.Element> = {
    email: <MdOutlineEmail className="text-text-tertiary" />,
    password: <MdOutlineLock className="text-text-tertiary" />,
    phone: <MdOutlinePhone className="text-text-tertiary" />,
    name: <MdOutlinePerson className="text-text-tertiary" />,
  }

  return icons[iconType]
}
