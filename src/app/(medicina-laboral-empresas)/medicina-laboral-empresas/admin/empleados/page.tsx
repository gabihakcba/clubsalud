'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import EmployeeForm from 'components/Medintt/EmployeeForm'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import {
  deleteBorrowerEmployee,
  getPatientsByBorrower,
  updateBorrowerEmployee
} from 'queries/Medintt/users'
import { useEffect, useState, type ReactElement } from 'react'
import { type FieldValues } from 'react-hook-form'
import { DateUtils } from 'utils/ClubSalud/dates'
import { useModal } from 'utils/ClubSalud/useModal'
import { getUserSession } from 'utils/Medintt/session'
import { type UpdateBorrowerEmployee } from 'utils/Medintt/types'

export default function Empleados(): ReactElement {
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null)
  const [newEmployee, openNewEmployee, closeNewEmployee] = useModal(false)
  const [idDeleting, setIdDeleting] = useState<number | null>(null)
  const [user, setUser] = useState<any>(undefined)

  useEffect(() => {
    const userData = getUserSession()
    setUser(userData)
  }, [])

  const { data: patients, refetch } = useQuery({
    queryKey: ['patients'],
    queryFn: async () => {
      const response = await getPatientsByBorrower(
        user?.Id_Prestataria as number
      )
      if (response.ok) {
        return response.data
      }
      return []
    },
    enabled: !!user?.Id_Prestataria
  })

  const { mutate: update } = useMutation({
    mutationFn: async (data: FieldValues) => {
      return await updateBorrowerEmployee(data as UpdateBorrowerEmployee)
    },
    onSuccess: async () => {
      await refetch()
    }
  })

  const { mutate: delete_, isPending } = useMutation({
    mutationFn: async (id: number) => {
      return await deleteBorrowerEmployee(id)
    },
    onSuccess: async () => {
      await refetch()
    }
  })

  const onRowEditComplete = (e): void => {
    update(e.newData as FieldValues)
  }

  return (
    <>
      <Dialog
        onHide={closeNewEmployee}
        className='w-full m-6'
        visible={newEmployee}
        header='Nuevo Empleado'
      >
        <EmployeeForm employee={selectedEmployee} />
      </Dialog>
      <DataTable
        header={() => (
          <Button
            label='Agregar Empleado'
            size='small'
            outlined
            severity='warning'
            icon='pi pi-plus'
            iconPos='right'
            onClick={() => {
              setSelectedEmployee(null)
              openNewEmployee()
            }}
          />
        )}
        value={patients}
        scrollable
        scrollHeight='100vh'
        editMode='row'
        onRowEditComplete={onRowEditComplete}
        dataKey='Id'
      >
        <Column
          header='Nombre'
          field='Nombre'
        />
        <Column
          header='Apellido'
          field='Apellido'
        />
        <Column
          header='DNI'
          field='NroDocumento'
        />
        <Column
          field='FechaNacimiento'
          header='Fecha Nacimiento'
          body={(rowData) => {
            const date = DateUtils.formatToDDMMYY(rowData.FechaNacimiento as Date)
            return <>{date}</>
          }}
        />
        <Column
          header='Cargo'
          field='Cargo'
        />
        <Column
          header='Funcion'
          field='Funcion'
        />
        <Column
          header='Celular'
          field='Celular1'
        />
        <Column
          header='Email'
          field='Email'
        />
        <Column
          body={(rowData) => {
            return (
              <Button
                size='small'
                outlined
                severity='danger'
                icon='pi pi-trash'
                loading={isPending && idDeleting === rowData.Id}
                onClick={() => {
                  setIdDeleting(rowData.Id as number)
                  delete_(rowData.Id as number)
                }}
              />
            )
          }}
        />
        <Column
          body={(rowData) => {
            return (
              <Button
                icon='pi pi-pencil'
                outlined
                size='small'
                onClick={() => {
                  setSelectedEmployee(rowData)
                  openNewEmployee()
                }}
              />
            )
          }}
        />
      </DataTable>
    </>
  )
}
