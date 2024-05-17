import { type ReactElement } from 'react'
import { formatDate } from 'utils/const'
import { type InstructorPayment } from 'utils/types'
import Image from 'next/image'
import delete_ from '../../../public/delete_.svg'
import loading from '../../../public/loading.svg'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteInstructorPayment } from 'queries/instructorPayments'

interface params {
  instructorPayment: InstructorPayment
}
export default function InstructorPaymentCard({
  instructorPayment
}: params): ReactElement {
  const query = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: deleteInstructorPayment,
    onSuccess: async (data) => {
      query.setQueryData(
        ['instructorPayments'],
        (oldData: InstructorPayment[]) => {
          const index = oldData.findIndex(
            (instructorPayment: InstructorPayment) =>
              Number(instructorPayment.id) === Number(data.id)
          )
          const newData = [...oldData]
          newData.splice(index, 1)
          return newData
        }
      )
    }
  })

  return (
    <div className='flex flex-col gap-2 rounded bg-white border justify-center items-center p-2'>
      <div className='relative flex flex-row w-full px-2'>
        <h5 className='font-bold grow text-center'>
          {instructorPayment.instructor?.name}
        </h5>
        {!isPending && (
          <button
            className='absolute w-max right-0 top-auto bottom-auto z-10'
            onClick={() => {
              mutate(Number(instructorPayment.id))
            }}
          >
            <Image
              src={delete_}
              width={20}
              height={20}
              alt='Del'
              className='hover:bg-red-500'
            ></Image>
          </button>
        )}
        {isPending && (
          <Image
            src={loading}
            width={20}
            height={20}
            alt='loading'
            className='absolute right-0 top-auto bottom-auto z-10 animate-spin'
          ></Image>
        )}
      </div>

      <hr className='m-1 w-full' />
      <p>${instructorPayment.amount}</p>
      <p>T: {formatDate(instructorPayment.workedMonth.toString() ?? '')}</p>
      <p>P: {formatDate(instructorPayment.paymentDate.toString() ?? '')}</p>
      <p>{instructorPayment.workedHours} hs</p>
    </div>
  )
}
