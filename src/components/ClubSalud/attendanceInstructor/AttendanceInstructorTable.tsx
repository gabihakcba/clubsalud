import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { useRef, type ReactElement } from 'react'
import { useModal } from 'utils/ClubSalud/useModal'
import AttendanceInstructorForm from './AttendanceInstructorForm'
import { getInstructors } from 'queries/ClubSalud/instructors'
import { useState } from 'react'
import { argDate2Format } from '../../../utils/ClubSalud/dates'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { deleteAttendanceInstructor } from 'queries/ClubSalud/attendanceInstructor'
import { Toast } from 'primereact/toast'
import { type AxiosError } from 'axios'

export default function AttendanceAdmTable(): ReactElement {
  const toast = useRef<Toast>(null)
  const query = useQueryClient()

  const [showAttendance, openAttendance, closeAttendace] = useModal(false)
  const [expandedRows, setExpandedRows] = useState<any>(null)
  const [selectedAttendance, setSelectedAttendance] = useState<
  number | undefined
  >(undefined)

  const { data: instructors, isPending: loadingInstructors } = useQuery({
    queryKey: ['instructors'],
    queryFn: async () => {
      return await getInstructors()
    },
    staleTime: 0
  })

  const allowExpansion = (rowData): boolean => {
    return rowData.attendanceInstructor.length > 0
  }

  const confirm = (data): void => {
    confirmDialog({
      message: '¿Seguro que quieres eliminar la asistencia?',
      header: 'Confirmación de eliminación',
      icon: 'pi pi-info-circle',
      defaultFocus: 'reject',
      acceptClassName: 'p-button-danger',
      accept: () => {
        setSelectedAttendance(data.id as number)
        deleteAttendance(data.id as number)
      }
    })
  }

  const { mutate: deleteAttendance, isPending } = useMutation({
    mutationFn: async (id: number) => {
      await deleteAttendanceInstructor(id)
    },
    onSuccess: async (data) => {
      await query.invalidateQueries({ queryKey: ['instructors'] })
      await query.refetchQueries({ queryKey: ['instructors'] })
      if (toast.current) {
        toast.current.show({
          severity: 'success',
          summary: 'Asistencia eliminada correctamente',
          detail: JSON.stringify(data),
          life: 3000,
          sticky: true
        })
      }
    },
    onError: (data: AxiosError) => {
      if (toast.current) {
        toast.current.show({
          severity: 'error',
          summary: 'Error al elimnar asistencia',
          detail: String(data.response?.data),
          life: 3000,
          sticky: true
        })
      }
    }
  })

  const rowExpansionTemplate = (data): ReactElement => {
    return (
      <>
        <ConfirmDialog />

        <DataTable
          value={data.attendanceInstructor}
          scrollable
          scrollHeight='20dvh'
        >
          <Column
            field='date'
            header='Fecha'
            body={(data) => <div>{argDate2Format(data.date as Date)}</div>}
            sortable
          />
          <Column
            field='class.name'
            header='Clase'
            sortable
          />
          <Column
            field='hours'
            header='Horas'
            sortable
          />
          <Column
            body={(attendance) => {
              return (
                <Button
                  label='Eliminar'
                  icon='pi pi-trash'
                  iconPos='right'
                  size='small'
                  severity='danger'
                  outlined
                  loading={isPending && selectedAttendance === attendance.id}
                  onClick={() => {
                    confirm(attendance)
                  }}
                />
              )
            }}
          />
        </DataTable>
      </>
    )
  }

  return (
    <>
      <Toast ref={toast} position='top-left'/>
      <DataTable
        header={() => {
          return (
            <div className='w-full flex align-items-center justify-content-between'>
              <h2>Asistencias de profesor</h2>
              <Button
                label='Cargar asistencia'
                size='small'
                outlined
                icon='pi pi-plus'
                iconPos='right'
                onClick={openAttendance}
              />
            </div>
          )
        }}
        value={instructors}
        loading={loadingInstructors}
        scrollable
        scrollHeight='35dvh'
        expandedRows={expandedRows}
        onRowToggle={(e) => {
          setExpandedRows(e.data)
        }}
        rowExpansionTemplate={rowExpansionTemplate}
        // dataKey="id"
      >
        <Column
          expander={allowExpansion}
          style={{ width: '5rem' }}
        />
        <Column
          field='name'
          header='Nombre'
        />
        <Column
          field='dni'
          header='DNI'
        />
      </DataTable>
      <Dialog
        visible={showAttendance}
        onHide={closeAttendace}
        header='Asistencia'
      >
        <AttendanceInstructorForm />
      </Dialog>
    </>
  )
}
