'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactElement } from 'react'
const client = new QueryClient()

export default function Layout({
  children
}: {
  children: ReactElement
}): ReactElement {
  return (
    <QueryClientProvider client={client}>
      <div>{children}</div>
    </QueryClientProvider>
  )
}
