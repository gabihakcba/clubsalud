import { type ReactElement } from 'react'
import { type Setter } from 'utils/types'

interface params {
  setCurrentPage: Setter
  currentPage: number
  totalPages: number
}
export default function AccountsPaginationBar({
  setCurrentPage,
  currentPage,
  totalPages
}: params): ReactElement {
  return (
    <div className='h-full w-full flex items-center justify-center'>
      <button
        onClick={() => {
          setCurrentPage((prev: number) => (prev > 1 ? prev - 1 : prev))
        }}
        className='w-max bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px- m-2 rounded focus:outline-none focus:shadow-outline'
      >
        Anterior
      </button>
      <p className='w-10 text-center'>{currentPage}</p>
      <button
        onClick={() => {
          console.log('total:', totalPages)
          setCurrentPage((prev: number) =>
            prev < totalPages ? prev + 1 : prev
          )
        }}
        className='w-max bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px- m-2 rounded focus:outline-none focus:shadow-outline'
      >
        Siguiente
      </button>
    </div>
  )
}
