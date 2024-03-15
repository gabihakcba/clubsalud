import { useState, type ReactElement } from 'react'
import Image from 'next/image'

export default function DropdownForm({
  children,
  position,
  top,
  left,
  image
}: any): ReactElement {
  const [i, setI] = useState(false)
  return (
    <div className={`w-max h-max ${position}`}>
      <button
        onClick={() => {
          setI((p) => !p)
        }}
        type='button'
      >
        {image && (
          <Image
            src={image}
            alt=''
            width={30}
            height={30}
          />
        )}
        {!image && 'Click'}
      </button>
      <div className={`absolute ${top} ${left} h-max w-max`}>
        {i && children(setI)}
      </div>
    </div>
  )
}
