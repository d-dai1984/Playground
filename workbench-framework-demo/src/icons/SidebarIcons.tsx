/** Sidebar icons: public/icons/*.svg, 32×32. Replace placeholders with Figma exports. */
import type { CSSProperties } from 'react'

const SIZE = 32

const wrapperStyle: CSSProperties = {
  width: SIZE,
  height: SIZE,
  flexShrink: 0,
  position: 'relative',
}
const imgStyle: CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  display: 'block',
}

function SidebarIcon({ name }: { name: string }) {
  return (
    <div className="sidebar-menu-icon" style={wrapperStyle}>
      <img src={`/icons/${name}.svg`} alt="" style={imgStyle} />
    </div>
  )
}

export function DashboardIcon() {
  return <SidebarIcon name="dashboard" />
}
export function AccountAcquisitionIcon() {
  return <SidebarIcon name="account-acquisition" />
}
export function AccountManagementIcon() {
  return <SidebarIcon name="account-management" />
}
export function ActivityGrowthIcon() {
  return <SidebarIcon name="activity-growth" />
}
export function SettlementRiskIcon() {
  return <SidebarIcon name="settlement-risk" />
}
export function TaskIcon() {
  return <SidebarIcon name="task" />
}
export function KnowledgeToolsIcon() {
  return <SidebarIcon name="knowledge-tools" />
}
export function NotificationIcon() {
  return <SidebarIcon name="notification" />
}
