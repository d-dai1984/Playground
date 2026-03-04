import { useState } from 'react'
import type { ReactNode } from 'react'
import { Layout, Menu, Input, Avatar, Typography, Button, Row, Col, Modal, Table, Tag, message } from 'antd'
import { SettingOutlined, SettingTwoTone, UserSwitchOutlined, PlusOutlined } from '@ant-design/icons'
import { Line, Bar, Pie } from '@ant-design/charts'
import type { MenuProps, TableColumnsType } from 'antd'
import {
  DashboardIcon,
  AccountAcquisitionIcon,
  AccountManagementIcon,
  ActivityGrowthIcon,
  SettlementRiskIcon,
  TaskIcon,
  KnowledgeToolsIcon,
  NotificationIcon,
} from './icons/SidebarIcons'
import './App.css'

const { Header, Sider, Content } = Layout
const { Text } = Typography

const menuItems: MenuProps['items'] = [
  {
    type: 'group',
    label: 'MENU',
    children: [
      { key: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
      { key: 'account-acquisition', label: 'Account Acquisition', icon: <AccountAcquisitionIcon /> },
      { key: 'account-management', label: 'Account Management', icon: <AccountManagementIcon /> },
      { key: 'activity-growth', label: 'Activity & Growth', icon: <ActivityGrowthIcon /> },
      { key: 'settlement-risk', label: 'Settlement & Risk', icon: <SettlementRiskIcon /> },
    ],
  },
  {
    type: 'group',
    label: 'GENERAL',
    children: [
      { key: 'task', label: 'Task', icon: <TaskIcon /> },
      { key: 'knowledge-tools', label: 'Knowledge & Tools', icon: <KnowledgeToolsIcon /> },
      { key: 'notification', label: 'Notification', icon: <NotificationIcon /> },
    ],
  },
]

const submenuByKey: Record<string, { label: string; key: string }[]> = {
  'account-acquisition': [
    { label: 'Prospective Customers', key: 'prospective' },
    { label: 'Navigation', key: 'navigation' },
    { label: 'Conversion Tracking', key: 'conversion' },
    { label: 'Acquisition Analysis', key: 'acquisition' },
  ],
}

type TodoRow = {
  key: string
  priority: string
  taskTitle: string
  taskSubtitle: string
  stage: string
  deadline: string
  risk: string
  status: string
  primaryAction: string
  secondaryAction: string
}

type LayoutMode = 'single' | 'split-16-8'
const LAYOUT_MODE_STORAGE_KEY = 'workbench.dashboard.layout.mode'
const stageTagClassMap: Record<string, string> = {
  contracting: 'todo-stage-tag--contracting',
  Active: 'todo-stage-tag--active',
  Growth: 'todo-stage-tag--growth',
}

function ModuleContainer({
  title,
  action,
  children,
  className,
  bodyClassName,
}: {
  title: string
  action?: ReactNode
  children: ReactNode
  className?: string
  bodyClassName?: string
}) {
  return (
    <div className={`module-card ${className ?? ''}`}>
      <div className="module-card-header">
        <div className="module-card-title">{title}</div>
        {action}
      </div>
      <div className={`module-card-body ${bodyClassName ?? ''}`}>{children}</div>
    </div>
  )
}

const todoColumns: TableColumnsType<TodoRow> = [
  {
    title: '',
    dataIndex: 'priority',
    key: 'priority',
    width: 36,
    render: (text: string) => <span className="todo-priority">{text}</span>,
  },
  {
    title: 'Task Name',
    dataIndex: 'taskTitle',
    key: 'taskName',
    width: 300,
    render: (_, record) => (
      <div className="todo-task-name">
        <div>{record.taskTitle}</div>
        <div>{record.taskSubtitle}</div>
      </div>
    ),
  },
  {
    title: 'Stage',
    dataIndex: 'stage',
    key: 'stage',
    width: 108,
    align: 'center',
    render: (text: string) => (
      <Tag className={`todo-stage-tag ${stageTagClassMap[text] ?? ''}`} bordered={false}>
        {text}
      </Tag>
    ),
  },
  {
    title: 'Deadline',
    dataIndex: 'deadline',
    key: 'deadline',
    width: 84,
    align: 'center',
  },
  {
    title: 'Risk',
    dataIndex: 'risk',
    key: 'risk',
    width: 64,
    align: 'center',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    width: 124,
    align: 'center',
  },
  {
    title: 'Actions',
    key: 'actions',
    width: 190,
    align: 'left',
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
    render: (_, record) => (
      <div className="todo-actions">
        <Button type="link" className="todo-action-btn">
          {record.primaryAction}
        </Button>
        <span className="todo-action-divider" />
        <Button type="link" className="todo-action-btn">
          {record.secondaryAction}
        </Button>
      </div>
    ),
  },
]

const todoData: TodoRow[] = [
  {
    key: '1',
    priority: 'P0',
    taskTitle: 'Spring Campaign Resource Confirmation – 5 Merchants',
    taskSubtitle: 'Merchant Fund Promo $25K',
    stage: 'contracting',
    deadline: 'Mar 20',
    risk: 'High',
    status: 'Waiting Approval',
    primaryAction: 'Approve Contact',
    secondaryAction: 'View terms',
  },
  {
    key: '2',
    priority: 'P0',
    taskTitle: 'Spring Campaign Resource Confirmation – 5 Merchants',
    taskSubtitle: 'Merchant Fund Promo $25K',
    stage: 'Active',
    deadline: 'Mar 20',
    risk: 'High',
    status: 'Waiting Approval',
    primaryAction: 'Send Reminder',
    secondaryAction: 'Confirm Budget',
  },
  {
    key: '3',
    priority: 'P0',
    taskTitle: 'Spring Campaign Resource Confirmation – 5 Merchants',
    taskSubtitle: 'Merchant Fund Promo $25K',
    stage: 'Growth',
    deadline: 'Mar 20',
    risk: 'High',
    status: 'Waiting Approval',
    primaryAction: 'Review Assets',
    secondaryAction: 'Request Revision',
  },
]

const takeRateData = [
  { day: '1', value: 1300, type: '目标值' },
  { day: '2', value: 1360, type: '目标值' },
  { day: '3', value: 1350, type: '目标值' },
  { day: '4', value: 1420, type: '目标值' },
  { day: '5', value: 1410, type: '目标值' },
  { day: '6', value: 1540, type: '目标值' },
  { day: '7', value: 1620, type: '目标值' },
  { day: '8', value: 1630, type: '目标值' },
  { day: '9', value: 1710, type: '目标值' },
  { day: '1', value: 1280, type: '实际值' },
  { day: '2', value: 1320, type: '实际值' },
  { day: '3', value: 1330, type: '实际值' },
  { day: '4', value: 1350, type: '实际值' },
  { day: '5', value: 1350, type: '实际值' },
  { day: '6', value: 1370, type: '实际值' },
  { day: '7', value: 1385, type: '实际值' },
  { day: '8', value: 1400, type: '实际值' },
  { day: '9', value: 1400, type: '实际值' },
]

const merchantAcquisitionData = [
  { channel: '今天四', value: 18 },
  { channel: '今天三', value: 28 },
  { channel: '今天二', value: 52 },
  { channel: '今天一', value: 120 },
]

const merchantFundPromoData = [
  { type: '分类一', value: 12 },
  { type: '分类二', value: 10 },
  { type: '分类三', value: 11 },
  { type: '分类四', value: 9 },
  { type: '分类五', value: 8 },
  { type: '分类六', value: 10 },
  { type: '分类七', value: 9 },
  { type: '分类八', value: 11 },
]

const takeRateConfig = {
  data: takeRateData,
  autoFit: true,
  xField: 'day',
  yField: 'value',
  seriesField: 'type',
  smooth: true,
  color: ['#2f8ef3', '#49c368'],
  legend: {
    position: 'bottom' as const,
    itemLabelFill: 'rgba(0,0,0,0.45)',
    itemLabelFontSize: 10,
    itemMarkerSize: 6,
    itemSpacing: 12,
  },
  point: false,
  style: { lineWidth: 1.5 },
  tooltip: false,
  axis: {
    x: {
      title: false,
      labelFontSize: 10,
      labelFill: 'rgba(0,0,0,0.45)',
      tick: false,
      line: false,
      tickCount: 6,
    },
    y: {
      title: false,
      labelFontSize: 10,
      labelFill: 'rgba(0,0,0,0.45)',
      gridStroke: '#f0f0f0',
      tickCount: 6,
      labelFormatter: (value: string | number) => `${Math.round(Number(value) / 100) / 10}k`,
    },
  },
  padding: [10, 12, 42, 26] as [number, number, number, number],
  scale: {
    x: { range: [0, 1] as [number, number] },
    y: { nice: true },
  },
}

const merchantAcquisitionConfig = {
  data: merchantAcquisitionData,
  xField: 'value',
  yField: 'channel',
  color: '#4ea1f0',
  legend: {
    position: 'bottom' as const,
    itemLabelFill: 'rgba(0,0,0,0.45)',
    itemLabelFontSize: 10,
    itemMarkerSize: 6,
  },
  label: false,
  style: { radiusTopLeft: 0, radiusTopRight: 0, radiusBottomRight: 0, radiusBottomLeft: 0 },
  axis: {
    y: { title: false, labelFontSize: 10, labelFill: 'rgba(0,0,0,0.45)' },
    x: { title: false, labelFontSize: 10, labelFill: 'rgba(0,0,0,0.45)', gridStroke: '#f0f0f0' },
  },
  padding: [8, 8, 28, 24] as [number, number, number, number],
}

const merchantFundPromoConfig = {
  data: merchantFundPromoData,
  angleField: 'value',
  colorField: 'type',
  color: ['#4d65a6', '#5f87e6', '#8b55d9', '#f06f97', '#f1cf47', '#5ac27d', '#35c2ce', '#4ca8ff'],
  legend: {
    color: {
      position: 'right' as const,
      itemLabelFill: 'rgba(0,0,0,0.45)',
      itemLabelFontSize: 10,
      itemMarkerSize: 6,
    },
  },
  label: false,
  innerRadius: 0,
  radius: 0.72,
  padding: [0, 8, 0, 8] as [number, number, number, number],
}

function App() {
  const [messageApi, contextHolder] = message.useMessage()
  const [collapsed, setCollapsed] = useState(false)
  const [selectedKey, setSelectedKey] = useState('account-acquisition')
  const [openSubmenuKey, setOpenSubmenuKey] = useState<string | null>('account-acquisition')
  const [selectedSubKey, setSelectedSubKey] = useState('navigation')

  const [isMerchantModalOpen, setIsMerchantModalOpen] = useState(false)
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const [isManagerViewModalOpen, setIsManagerViewModalOpen] = useState(false)
  const [isCustomPageModalOpen, setIsCustomPageModalOpen] = useState(false)
  const [layoutMode, setLayoutMode] = useState<LayoutMode>(() => {
    if (typeof window === 'undefined') return 'single'
    const saved = window.localStorage.getItem(LAYOUT_MODE_STORAGE_KEY)
    return saved === 'split-16-8' ? 'split-16-8' : 'single'
  })
  const [layoutModeDraft, setLayoutModeDraft] = useState<LayoutMode>(layoutMode)

  const onMenuClick: MenuProps['onClick'] = ({ key }) => {
    setSelectedKey(key)
    const subs = submenuByKey[key]
    setOpenSubmenuKey(subs?.length ? key : null)
    if (subs?.length) setSelectedSubKey(subs[0]?.key ?? '')
  }

  const subItems = openSubmenuKey ? submenuByKey[openSubmenuKey] ?? [] : []

  const openCustomPageModal = () => {
    setLayoutModeDraft(layoutMode)
    setIsCustomPageModalOpen(true)
  }

  const saveLayoutMode = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(LAYOUT_MODE_STORAGE_KEY, layoutModeDraft)
    }
    setLayoutMode(layoutModeDraft)
    setIsCustomPageModalOpen(false)
    messageApi.success('布局样式已保存，请刷新页面查看效果')
  }

  const todoListCard = (
    <ModuleContainer
      title="Todo List"
      className="todo-module-card"
      action={
        <Button size="small" icon={<PlusOutlined />} className="todo-add-btn">
          Add New
        </Button>
      }
    >
      <Table<TodoRow>
        columns={todoColumns}
        dataSource={todoData}
        pagination={false}
        className="todo-table"
        rowClassName={() => 'todo-table-row'}
        scroll={{ x: 960 }}
      />
    </ModuleContainer>
  )

  const dashboardCard = (
    <ModuleContainer
      title="Dashboard"
      className="dashboard-module-card"
      bodyClassName="dashboard-module-body"
      action={
        <Button size="small" icon={<SettingOutlined />} className="dashboard-management-btn">
          Management
        </Button>
      }
    >
      <div className="dashboard-charts-row">
        <div className="dashboard-chart-card">
          <div className="chart-title chart-title--small-strong">Take rate</div>
          <div className="chart-content take-rate-chart-content">
            <Line {...takeRateConfig} style={{ width: '100%', height: '100%' }} />
          </div>
        </div>
        <div className="dashboard-chart-card">
          <div className="chart-title chart-title--small-strong">Merchant Acquisition</div>
          <div className="chart-content">
            <Bar {...merchantAcquisitionConfig} />
          </div>
        </div>
        <div className="dashboard-chart-card">
          <div className="chart-title chart-title--small-strong">Merchant Fund Promo</div>
          <div className="chart-content">
            <Pie {...merchantFundPromoConfig} />
          </div>
        </div>
      </div>
    </ModuleContainer>
  )

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {contextHolder}
      <Header className="workbench-header">
        <div className="workbench-header-left">
          <div className="workbench-logo">
            <img src="/images/logomark.svg" alt="logo" className="workbench-logo-mark" />
            <img src="/images/logotext.svg" alt="klook" className="workbench-logo-text" />
          </div>
          <div className="workbench-merchant-btn" onClick={() => setIsMerchantModalOpen(true)}>
            Merchant <span className="workbench-merchant-arrow" />
          </div>
        </div>
        <div className="workbench-header-center">
          <div className="workbench-search-bar" onClick={() => setIsSearchModalOpen(true)}>
            <span className="workbench-search-placeholder">Search</span>
            <div className="workbench-search-icon" />
          </div>
        </div>
        <div className="workbench-header-right">
          <Avatar src="/images/avatar.svg" size={32} />
          <Text className="workbench-username">Alex Kelly</Text>
        </div>
      </Header>
      <Layout>
        <div className="workbench-sidebar-wrapper">
          <Sider
            className="workbench-sider workbench-sider--no-bg"
            width={280}
            collapsedWidth={112}
            collapsed={collapsed}
            breakpoint="lg"
            onBreakpoint={setCollapsed}
          >
            <div className="workbench-sidebar-inner">
              <Menu
                mode="inline"
                selectedKeys={[selectedKey]}
                items={menuItems}
                className="workbench-sidebar-menu"
                onClick={onMenuClick}
              />
            </div>
          </Sider>
          {openSubmenuKey && subItems.length > 0 && (
            <aside className="workbench-submenu-panel">
              <Menu
                mode="inline"
                className="workbench-secondary-menu"
                selectedKeys={[selectedSubKey]}
                onClick={({ key }) => setSelectedSubKey(key)}
                items={subItems.map(({ label, key: subKey }) => ({
                  key: subKey,
                  label: (
                    <div className="workbench-submenu-item-content">
                      <span className="workbench-submenu-item-title">{label}</span>
                      <span className="workbench-submenu-item-arrow" />
                    </div>
                  ),
                }))}
              />
            </aside>
          )}
        </div>
        <Content className="workbench-content">
          <div className="dashboard-container">
            {/* Welcome */}
            <div className="dashboard-welcome">
              <Row className="dashboard-welcome-grid" align="middle" justify="space-between" gutter={[16, 16]}>
                <Col xs={24} lg={16}>
                  <div className="dashboard-welcome-left">
                    <div className="dashboard-title">Hi, Alex Kelly</div>
                    <div className="dashboard-subtitle">Today’s focus & key objectives</div>
                  </div>
                </Col>
                <Col xs={24} lg={8}>
                  <div className="dashboard-welcome-right">
                    <Button
                      type="primary"
                      icon={<UserSwitchOutlined />}
                      className="dashboard-action-btn dashboard-action-btn-primary"
                      onClick={() => setIsManagerViewModalOpen(true)}
                    >
                      Manager View
                    </Button>
                    <Button
                      type="text"
                      icon={<SettingTwoTone twoToneColor="#1677ff" />}
                      className="dashboard-action-btn dashboard-action-btn-text"
                      onClick={openCustomPageModal}
                    >
                      Custom Page
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>

            {/* Todo List */}
            <div className="dashboard-section">
              {layoutMode === 'split-16-8' ? (
                <Row gutter={[24, 24]} className="dashboard-layout-row">
                  <Col xs={24} lg={16}>
                    {todoListCard}
                  </Col>
                  <Col xs={24} lg={8}>
                    <div className="dashboard-side-card">
                      <div className="dashboard-side-card-title">Right Container</div>
                      <div className="dashboard-side-card-desc">
                        This placeholder follows the 16+8 grid layout.
                      </div>
                    </div>
                  </Col>
                </Row>
              ) : (
                todoListCard
              )}
            </div>

            {/* Dashboard */}
            <div className="dashboard-section">
              {dashboardCard}
            </div>
          </div>
        </Content>
      </Layout>

      <Modal
        title="Merchant Switcher"
        open={isMerchantModalOpen}
        onCancel={() => setIsMerchantModalOpen(false)}
        footer={null}
      >
        <p>Merchant selection list will go here.</p>
      </Modal>

      <Modal
        title="Search"
        open={isSearchModalOpen}
        onCancel={() => setIsSearchModalOpen(false)}
        footer={null}
      >
        <Input.Search placeholder="Search..." size="large" autoFocus />
        <div style={{ marginTop: 24, color: 'rgba(0,0,0,0.45)' }}>Recent searches will appear here.</div>
      </Modal>

      <Modal
        title="Manager View"
        open={isManagerViewModalOpen}
        onCancel={() => setIsManagerViewModalOpen(false)}
        onOk={() => setIsManagerViewModalOpen(false)}
        okText="Apply"
        cancelText="Cancel"
      >
        <p>Manager View modal scaffold is ready.</p>
        <p>Role switching options will be implemented here.</p>
      </Modal>

      <Modal
        title="Custom Page"
        open={isCustomPageModalOpen}
        onCancel={() => setIsCustomPageModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsCustomPageModalOpen(false)}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={saveLayoutMode}>
            Save
          </Button>,
        ]}
      >
        <div className="layout-style-picker">
          <div className="layout-style-title">布局样式</div>
          <div className="layout-style-options">
            <Button
              className="layout-style-option-btn"
              type={layoutModeDraft === 'single' ? 'primary' : 'default'}
              onClick={() => setLayoutModeDraft('single')}
            >
              1 Column
            </Button>
            <Button
              className="layout-style-option-btn"
              type={layoutModeDraft === 'split-16-8' ? 'primary' : 'default'}
              onClick={() => setLayoutModeDraft('split-16-8')}
            >
              16 + 8
            </Button>
          </div>
          <div className="layout-style-hint">
            Save 后刷新页面，即可查看所选布局。
          </div>
        </div>
      </Modal>
    </Layout>
  )
}

export default App
