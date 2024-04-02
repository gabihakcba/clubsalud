'use client'

import { useQuery } from '@tanstack/react-query'
import { type ReactElement } from 'react'
import { getClasses } from 'queries/classes'
import ClassCard from './ClassCard'

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
        <div
          key={class_.id}
          className='bg-white border m-0 border-gray-200 rounded-lg shadow p-4 w-max'
        >
          <ClassCard class_={class_}></ClassCard>
        </div>
      ))}
    </>
  )
}
