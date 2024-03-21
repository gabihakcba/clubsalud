'use client'

import { useQuery } from '@tanstack/react-query'
import { type ReactElement } from 'react'
import { getClasses } from 'queries/classes'
import ClassCard from './ClassCard'

export default function ClassesCard(): ReactElement {
  const { data: classes } = useQuery({
    queryKey: ['class'],
    queryFn: async () => {
      return await getClasses()
    }
  })

  return (
    <>
      {classes?.map((class_) => (
        <div
          key={class_.id}
          className='bg-white border border-gray-200 rounded-lg shadow p-4 dark:bg-gray-800 dark:border-gray-700'
        >
          <ClassCard class_={class_}></ClassCard>
        </div>
      ))}
    </>
  )
}
