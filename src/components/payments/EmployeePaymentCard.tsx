import { type ReactElement } from 'react'
import { formatDate } from 'utils/const'
import { type EmployeePayment } from 'utils/types'
import Image from 'next/image'
import delete_ from '../../../public/delete_.svg'
import loading from '../../../public/loading.svg'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteEmployeePayment } from 'queries/employeePayments'

interface params {
  employeePayment: EmployeePayment
}
export default function EmployeePaymentCard({
  employeePayment
}: params): ReactElement {
  const query = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: deleteEmployeePayment,
    onSuccess: async (data) => {
      query.setQueryData(['employeePayments'], (oldData: EmployeePayment[]) => {
        const index = oldData.findIndex(
          (employeePayment: EmployeePayment) =>
            Number(employeePayment.id) === Number(data.id)
        )
        const newData = [...oldData]
        newData.splice(index, 1)
        return newData
      })
    }
  })

  return (
    <div className='flex flex-col gap-2 rounded bg-white border justify-center items-center p-2'>
      <div className='relative flex flex-row w-full px-2'>
        <h5 className='font-bold grow text-center'>
          {employeePayment.employee?.name}
        </h5>
        {!isPending && (
          <button
            className='absolute w-max right-0 top-auto bottom-auto z-10'
            onClick={() => {
              mutate(Number(employeePayment.id))
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
      <p>${employeePayment.amount}</p>
      <p>T: {formatDate(employeePayment.monthPayment.toString() ?? '')}</p>
      <p>P: {formatDate(employeePayment.date.toString() ?? '')}</p>
      {employeePayment.hoursWorked && <p>{employeePayment.hoursWorked}</p>}
    </div>
  )
}
