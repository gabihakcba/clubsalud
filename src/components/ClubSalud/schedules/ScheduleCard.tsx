import change from '../../../public/change.svg'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import Modal from 'components/ClubSalud/Modal'
import { getClassById } from 'queries/ClubSalud/classes'
import { type ReactElement } from 'react'
import { Permissions, type Schedule } from 'utils/ClubSalud/types'
import { useModal } from 'utils/ClubSalud/useModal'
import { getInstructorById } from 'queries/ClubSalud/instructors'
import InstructorAssign from './InstructorAssign'
import ClassAssign from './ClassAssign'
import HasRole from 'components/ClubSalud/HasRole'

const border = (start: number): string => {
  const border = 'border-r-[1px] border-l-[1px] border-black'
  return start % 100 !== 0
    ? `${border} mb-2 border-b-[1px]`
    : `${border} border-t-[1px]`
}

interface params {
  schedule: Schedule
}

export default function ScheduleCard({ schedule }: params): ReactElement {
  const { data: class_ } = useQuery({
    queryKey: ['classSche', schedule.id],
    queryFn: async () => {
      const dataResponse = await getClassById(schedule.classId)
      return dataResponse.data
    }
  })

  const { data: instructor } = useQuery({
    queryKey: ['insSChe', schedule.id],
    queryFn: async () => {
      return await getInstructorById(schedule.instructorInCharge)
    },
    refetchOnMount: 'always'
  })

  const [assign, openAssing, closeAssign] = useModal(false)

  return (
    <div
      key={schedule.id}
      className={`flex justify-between text-center px-2 ${border(schedule.start)}`}
    >
      <span>{class_?.name ?? '----'}</span>
      <span className='ml-2 text-xs inline-flex items-center font-bold leading-sm uppercase px-1 py-0 rounded-full bg-white text-gray-700 border border-gray-500'>
        {instructor?.name ?? '-'}
      </span>
      {/* <span className='inline-flex items-center justify-center px-1 text-sm font-medium text-gray-800 bg-gray-300 rounded-full'>
           {instructor.name}
         </span> */}
      <HasRole required={[Permissions.ADM, Permissions.OWN]}>
        <button onClick={openAssing}>
          <Image
            src={change}
            alt='c'
            width={10}
            height={10}
          />
        </button>
        <Modal
          isOpen={assign}
          closeModal={closeAssign}
        >
          <div className='flex flex-col gap-3 bg-gray-200 rounded m-2 p-2 items-center'>
            <ClassAssign schedule={schedule} />
            <InstructorAssign schedule={schedule} />
          </div>
        </Modal>
      </HasRole>
    </div>
  )
}
