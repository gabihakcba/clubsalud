import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { useEffect, useRef, type ReactElement } from 'react'
import { useModal } from 'utils/ClubSalud/useModal'
import AttendanceInstructorForm from './AttendanceInstructorForm'
import { getInstructors } from 'queries/ClubSalud/instructors'
import { useState } from 'react'
import { DateUtils } from '../../../utils/ClubSalud/dates'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { deleteAttendanceInstructor } from 'queries/ClubSalud/attendanceInstructor'
import { Toast } from 'primereact/toast'
import { type AxiosError } from 'axios'
import { type Instructor } from 'utils/ClubSalud/types'
import { FloatLabel } from 'primereact/floatlabel'
import { InputText } from 'primereact/inputtext'

export default function AttendanceAdmTable(): ReactElement {
  const toast = useRef<Toast>(null)
  const query = useQueryClient()

  const [showAttendance, openAttendance, closeAttendace] = useModal(false)
  const [expandedRows, setExpandedRows] = useState<any>(null)
  const [selectedAttendance, setSelectedAttendance] = useState<
  number | undefined
  >(undefined)

  const [instructorFiltered, setInstructorsFiltered] = useState<Instructor[]>(
    []
  )
  const [filter, setFilter] = useState<string>('')

  const { data: instructors, isPending: loadingInstructors } = useQuery({
    queryKey: ['instructors'],
    queryFn: async () => {
      return await getInstructors()
    },
    staleTime: 0
  })

  useEffect(() => {
    if (filter !== '') {
      const filtered = instructors?.filter(
        (member) =>
          member.name.toUpperCase().includes(filter.toUpperCase()) ||
          String(member.dni).includes(filter) ||
          member.lastName.toUpperCase().includes(filter.toUpperCase())
      )
      setInstructorsFiltered(filtered ?? instructors ?? [])
    } else {
      setInstructorsFiltered(instructors ?? [])
    }
  }, [filter, instructors])

  const allowExpansion = (rowData): boolean => {
    return rowData.AttendanceInstructor.length > 0
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
          value={data.AttendanceInstructor}
          scrollable
          scrollHeight='20dvh'
        >
          <Column
            field='date'
            header='Fecha'
            body={(data) => <div>{DateUtils.formatToDDMMYY(data.date as Date)}</div>}
            sortable
          />
          <Column
            field='Class.name'
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
      <Toast
        ref={toast}
        position='top-left'
      />
      <DataTable
        header={() => {
          return (
            <div className='w-full flex align-items-center justify-content-between'>
              <div className='flex flex-row gap-4 align-items-center'>
                <h2>Asistencias de profesores</h2>
                <FloatLabel>
                  <InputText
                    value={filter}
                    onChange={(e) => {
                      setFilter(e.target.value)
                    }}
                  />
                  <label htmlFor=''>Filtro (Nombre, Apellido, DNI)</label>
                </FloatLabel>
              </div>
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
        value={instructorFiltered}
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
