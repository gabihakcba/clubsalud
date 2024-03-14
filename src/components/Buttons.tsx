import { type ReactElement } from 'react'

export function Button({ onAction, hover, bg, text }: any): ReactElement {
  return (
    <button
      onClick={onAction}
      className={`flex flex-row ${hover} ${bg} rounded w-full p-2`}
    >
      <span className='w-full text-center'>{text}</span>
    </button>
  )
}
