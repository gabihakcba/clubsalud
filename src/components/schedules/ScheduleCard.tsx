import change from '../../../public/change.svg'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import Modal from 'components/Modal'
import { getClassById } from 'queries/classes'
import { useState, type ReactElement } from 'react'
import { Class_, Instructor, Permissions, type Schedule } from 'utils/types'
import { useModal } from 'utils/useModal'
import { getInstructorById } from 'queries/instructors'
import InstructorAssign from './InstructorAssign'
import ClassAssign from './ClassAssign'
import HasRole from 'components/HasRole'

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
  const [class_, setClass_] = useState<Class_>({
    id: 0,
    name: '',
    duration: 0
  })

  const [instructor, setInstructor] = useState<Instructor>({
    id: 0,
    name: '',
    lastName: '',
    dni: BigInt(0),
    phoneNumber: BigInt(0),
    address: '',
    email: '',
    degree: '',
    accountId: 0
  })

  const { data } = useQuery({
    queryKey: ['class', schedule.id],
    queryFn: async () => {
      const dataResponse = await getClassById(schedule.classId)
      const scheduleResponse = await getInstructorById(
        schedule.instructorInCharge
      )
      setInstructor(scheduleResponse.data)
      setClass_(dataResponse.data)
      return dataResponse
    },
    staleTime: 1000 * 60 * 60 * 8
  })

  const [assign, openAssing, closeAssign] = useModal(false)

  return (
    <div
      key={schedule.id}
      className={`flex justify-between text-center px-2 ${border(schedule.start)}`}
    >
      <span>{class_.name !== '' ? class_.name : '----'}</span>
      {instructor.id !== 0 && (
        <span className='ml-2 text-xs inline-flex items-center font-bold leading-sm uppercase px-1 py-0 rounded-full bg-white text-gray-700 border border-gray-500'>
          {instructor.name}
        </span>
        // <span className='inline-flex items-center justify-center px-1 text-sm font-medium text-gray-800 bg-gray-300 rounded-full'>
        //   {instructor.name}
        // </span>
      )}
      <HasRole required={Permissions.ADM}>
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
            <ClassAssign
              closeAssign={closeAssign}
              setClass_={setClass_}
              schedule={schedule}
            ></ClassAssign>
            <InstructorAssign
              closeAssign={closeAssign}
              setInstructor={setInstructor}
              schedule={schedule}
            ></InstructorAssign>
          </div>
        </Modal>
      </HasRole>
    </div>
  )
}
