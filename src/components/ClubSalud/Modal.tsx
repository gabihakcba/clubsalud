import { type ReactElement } from 'react'
import Image from 'next/image'
import close from '../../public/close.svg'

export default function Modal({
  children,
  isOpen,
  closeModal
}: any): ReactElement {
  return (
    <div
      className={`fixed top-0 right-0 left-0 bottom-0 w-dvw h-full bg-[#0000006e] ${isOpen ? 'flex' : 'hidden'} justify-center items-center`}
    >
      <div className='w-max h-max flex flex-col justify-center items-center'>
        <div className='w-full flex flex-row justify-end'>
          <button
            onClick={closeModal}
            className='w-max'
          >
            <Image
              src={close}
              width={25}
              height={25}
              alt='X'
            ></Image>
          </button>
        </div>
        {/* {children} */}
        <div className='max-h-[90vh] overflow-scroll scrollHidden'>
          {children}
        </div>
      </div>
    </div>
  )
}
