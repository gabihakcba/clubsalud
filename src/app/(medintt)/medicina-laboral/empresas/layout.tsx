import { type ReactElement } from 'react'

export default function LayoutCompanies({
  children
}: {
  children: ReactElement
}): ReactElement {
  return (
    <div className='flex flex-column h-full w-full gap-4 text-primary p-4'>
      {/* <span className='text-2xl'>Para Empresas</span> */}
      {children}
    </div>
  )
}
