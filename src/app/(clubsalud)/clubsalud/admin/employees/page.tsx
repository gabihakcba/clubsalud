'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import CreateEmployeeForm from 'components/ClubSalud/employees/CreateEmployeeForm'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { deleteEmployee, getEmployees } from 'queries/ClubSalud/employees'
import { useState, type ReactElement } from 'react'
import { useModal } from 'utils/ClubSalud/useModal'
import { Dialog } from 'primereact/dialog'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import UpdateEmployeeForm from 'components/ClubSalud/employees/UpdateEmployeeForm'
import { FilterMatchMode } from 'primereact/api'

export default function Employees(): ReactElement {
  const [createEmployee, openCreateEmployee, closeCreateEmployee] =
    useModal(false)
  const [editEmployee, openEditEmployee, closeEditEmployee] = useModal(false)
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null)
  const filters = {
    dni: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
  }

  const query = useQueryClient()

  const { data: employees } = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      return await getEmployees()
    }
  })

  const { mutate: mutateD, isPending: isPendingD } = useMutation({
    mutationFn: async (id: number) => {
      return await deleteEmployee(Number(id))
    },
    onSuccess: async () => {
      await query.refetchQueries({ queryKey: ['employees'] })
    }
  })

  return (
    <Card className='h-full'>
      <Dialog
        visible={createEmployee}
        onHide={closeCreateEmployee}
        header='Crear Empleado'
      >
        <CreateEmployeeForm />
      </Dialog>
      <Dialog
        visible={editEmployee}
        onHide={closeEditEmployee}
        header='Editar Empleado'
      >
        <UpdateEmployeeForm employee={selectedEmployee} />
      </Dialog>
      <DataTable
        value={employees}
        scrollable
        scrollHeight='80dvh'
        header={() => (
          <nav className='flex gap-2 align-items-center'>
            <h2>Empleados</h2>
            <Button
              onClick={openCreateEmployee}
              label='Crear Empleado'
              size='small'
              icon='pi pi-plus'
              iconPos='right'
            />
          </nav>
        )}
        selectionMode='single'
        onSelectionChange={(e) => {
          setSelectedEmployee(e.value)
        }}
        filters={filters}
        filterDisplay='menu'
      >
        <Column
          field='id'
          header='ID'
          sortable
        />
        <Column
          field='name'
          header='Nombre'
          sortable
        />
        <Column
          field='dni'
          header='DNI'
          sortable
          filter
          filterPlaceholder='DNI'
        />
        <Column
          field='lastName'
          header='Apellido'
          sortable
        />
        <Column
          field='salary'
          header='Sueldo'
          sortable
        />
        <Column
          field='lastSalaryUpdate'
          header='Actualización de sueldo'
          sortable
        />
        <Column
          field='alias'
          header='Alias'
          sortable
        />
        <Column
          field='cbu'
          header='CBU'
          sortable
        />
        <Column
          body={(employee) => (
            <Button
              label='Editar'
              icon='pi pi-pen-to-square'
              size='small'
              outlined
              onClick={() => {
                setSelectedEmployee(employee)
                openEditEmployee()
              }}
            />
          )}
        />
        <Column
          body={(employee) => (
            <Button
              label='Elimnar'
              icon='pi pi-trash'
              size='small'
              outlined
              severity='danger'
              onClick={() => {
                setSelectedEmployee(employee)
                mutateD(employee?.id as number)
              }}
              loading={
                (selectedEmployee?.id as number) === (employee.id as number) &&
                isPendingD
              }
            />
          )}
        />
      </DataTable>
    </Card>
  )
}
