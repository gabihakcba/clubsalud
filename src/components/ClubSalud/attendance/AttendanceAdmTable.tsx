import { useQuery } from '@tanstack/react-query'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { getMembers } from '../../../queries/ClubSalud/members'
import { useEffect, type ReactElement } from 'react'
import { useModal } from 'utils/ClubSalud/useModal'
import AttendanceForm from './AttendanceForm'
import { useState } from 'react'
import { argDate2Format } from '../../../utils/ClubSalud/dates'
import { FloatLabel } from 'primereact/floatlabel'
import { InputText } from 'primereact/inputtext'
import { type Member } from 'utils/ClubSalud/types'

export default function AttendanceAdmTable(): ReactElement {
  const [showAttendance, openAttendance, closeAttendace] = useModal(false)
  const [expandedRows, setExpandedRows] = useState<any>(null)
  const [membersFiltered, setMembersFiltered] = useState<Member[]>([])
  const [filter, setFilter] = useState<string>('')

  const { data: members, isPending: loadingMembers } = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      return await getMembers()
    }
  })

  useEffect(() => {
    if (filter !== '') {
      const filtered = members?.filter(
        (member) =>
          member.name.toUpperCase().includes(filter.toUpperCase()) ||
          String(member.dni).includes(filter) ||
          member.lastName.toUpperCase().includes(filter.toUpperCase())
      )
      setMembersFiltered(filtered ?? members ?? [])
    } else {
      setMembersFiltered(members ?? [])
    }
  }, [filter, members])

  const allowExpansion = (rowData): boolean => {
    return rowData.memberAttendance.length > 0
  }

  const rowExpansionTemplate = (data): ReactElement => {
    return (
      <DataTable
        value={data.memberAttendance}
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
        <Column />
      </DataTable>
    )
  }

  return (
    <>
      <DataTable
        header={() => {
          return (
            <div className='w-full flex align-items-center justify-content-between'>
              <div className='flex flex-row gap-4 align-items-center'>
                <h2>Asistencias de alumnos</h2>
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
        value={membersFiltered}
        loading={loadingMembers}
        scrollable
        scrollHeight='35dvh'
        expandedRows={expandedRows}
        onRowToggle={(e) => {
          setExpandedRows(e.data)
        }}
        rowExpansionTemplate={rowExpansionTemplate}
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
        <AttendanceForm />
      </Dialog>
    </>
  )
}
