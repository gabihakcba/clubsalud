'use client'

import { useQuery } from '@tanstack/react-query'
import Modal from 'components/Modal'
import CreateEmployeeForm from 'components/employees/CreateEmployeeForm'
import EmployeeSection from 'components/employees/EmployeeSection'
import { getEmployees } from 'queries/employees'
import { type ReactElement } from 'react'
import { useModal } from 'utils/useModal'

export default function Employees(): ReactElement {
  const [createEmployee, openCreateEmployee, closeCreateEmployee] =
    useModal(false)

  const { data: employees } = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      return await getEmployees()
    }
  })

  return (
    <div className='w-full h-full m-2 flex flex-col'>
      <nav className='flex gap-2 items-center mt-1 mb-2'>
        <h2 className='text-2xl font-bold'>Empleados</h2>
        <button
          className='blueButtonForm p-1'
          onClick={openCreateEmployee}
        >
          Crear empleado
        </button>
        <Modal
          isOpen={createEmployee}
          closeModal={closeCreateEmployee}
        >
          <CreateEmployeeForm
            closeModal={closeCreateEmployee}
          ></CreateEmployeeForm>
        </Modal>
      </nav>
      <hr />
      <EmployeeSection employees={employees}></EmployeeSection>
    </div>
  )
}
