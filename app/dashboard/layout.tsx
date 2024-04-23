import { ReactNode } from 'react'

// TODO: Add layout

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return <div className='full flex-c'>{children}</div>
}

export default DashboardLayout
