'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import EmployeeForm from 'components/Medintt/EmployeeForm'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import {
  deleteBorrowerEmployee,
  getPatientsByBorrower,
  updateBorrowerEmployee
} from 'queries/Medintt/users'
import { useEffect, useState, type ReactElement } from 'react'
import { type FieldValues } from 'react-hook-form'
import { argDate2Format } from 'utils/ClubSalud/dates'
import { useModal } from 'utils/ClubSalud/useModal'
import { getUserSession } from 'utils/Medintt/session'
import { type UpdateBorrowerEmployee } from 'utils/Medintt/types'

export default function Empleados(): ReactElement {
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

  const textEditor = (options): ReactElement => {
    return (
      <InputText
        type='text'
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    )
  }

  const calendarEditor = (options): ReactElement => {
    return (
      <Calendar
        value={new Date(options.rowData.FechaNacimiento as string)}
        onChange={(e) => {
          options.editorCallback(e.target.value)
        }}
        dateFormat='dd-mm-yy'
      />
    )
  }

  const allowEdit = (rowData): boolean => {
    return rowData.name !== 'Blue Band'
  }

  const onRowEditComplete = (e): void => {
    update(e.newData as FieldValues)
  }

  return (
    <>
      <Dialog
        onHide={closeNewEmployee}
        visible={newEmployee}
        header='Nuevo Empleado'
      >
        <EmployeeForm />
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
            onClick={openNewEmployee}
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
          editor={(options) => textEditor(options)}
        />
        <Column
          header='Apellido'
          field='Apellido'
          editor={(options) => textEditor(options)}
        />
        <Column
          header='DNI'
          field='DNI'
        />
        <Column
          field='FechaNacimiento'
          header='Fecha Nacimiento'
          body={(rowData) => {
            const date = argDate2Format(rowData.FechaNacimiento as Date)
            return <>{date}</>
          }}
          editor={(options) => calendarEditor(options)}
        />
        <Column
          header='Cargo'
          field='Cargo'
          editor={(options) => textEditor(options)}
        />
        <Column
          header='Funcion'
          field='Funcion'
          editor={(options) => textEditor(options)}
        />
        <Column
          header='Celular'
          field='Celular1'
          editor={(options) => textEditor(options)}
        />
        <Column
          header='Email'
          field='Email'
          editor={(options) => textEditor(options)}
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
          rowEditor={allowEdit}
          headerStyle={{ width: '2rem', minWidth: '2rem' }}
          bodyStyle={{ textAlign: 'center' }}
        />
      </DataTable>
    </>
  )
}
