'use client'

import { useQuery } from '@tanstack/react-query'
import { type ReactElement } from 'react'
import { getClasses } from 'queries/classes'
import ClassCard from './ClassCard'
import { Card } from 'primereact/card'

export default function ClassesCard(): ReactElement {
  const { data: classes } = useQuery({
    queryKey: ['class'],
    queryFn: async () => {
      const response = await getClasses()
      return response.data
    }
  })

  return (
    <>
      {classes?.map((class_) => (
        <Card key={class_.id}>
          <ClassCard class_={class_}></ClassCard>
        </Card>
      ))}
    </>
  )
}
