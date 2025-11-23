import ClientLayoutRoot from '../layout/ClientLayoutRoot'

export default function DashboardSegmentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayoutRoot>{children}</ClientLayoutRoot>
}
