'use client'

import { useEffect, useState, type ReactElement } from 'react'

export default function Span({
  type,
  className,
  children
}: {
  type: string
  className?: string
  children: string | ReactElement
}): ReactElement {
  const [classNameSpan, setClassNameSpan] = useState<string>('')
  useEffect(() => {
    let classNamePre = ''
    switch (type) {
      case 'primary':
        classNamePre = 'text-primary'
        break
      case 'secondary':
        classNamePre = 'text-color-secondary'
        break
      default:
        classNamePre = 'text-color-black'
        break
    }
    setClassNameSpan(() => classNamePre.concat(' ', className ?? ''))
  }, [])
  return <span className={classNameSpan}>{children}</span>
}
