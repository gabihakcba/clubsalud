import { useQuery } from '@tanstack/react-query'
import { getMembers } from 'queries/ClubSalud/members'
import { useEffect, useState, type ReactElement } from 'react'
import { type Member } from 'utils/ClubSalud/types'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import moment from 'moment'
import { Calendar } from 'primereact/calendar'
import { DateUtils } from 'utils/ClubSalud/dates'

export default function MembersList(): ReactElement {
  const [date, setDate] = useState<Date | null>(null)
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([])

  const { data: members, isPending } = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      return await getMembers()
    }
  })

  useEffect(() => {
    date
      ? setFilteredMembers(
        members?.filter((member: Member) =>
          DateUtils.isBetween(
            member.inscriptionDate,
            moment(date).startOf('month').toDate(),
            moment(date).endOf('month').toDate()
          )
        ) ?? []
      )
      : setFilteredMembers(members ?? [])
  }, [date, members])

  return (
    <div className='flex flex-column gap-4'>
      <DataTable
        value={filteredMembers}
        scrollable
        scrollHeight='30rem'
        loading={isPending}
        header={() => (
          <Calendar
            value={date}
            placeholder='Filtrar por fecha de inscripción'
            view='month'
            dateFormat='mm-yy'
            onChange={(e) => {
              setDate(moment(e.value).startOf('month').toDate())
            }}
            showButtonBar
            onClearButtonClick={() => {
              setDate(null)
            }}
          />
        )}
      >
        <Column
          header='Apellido'
          field='lastName'
        />
        <Column
          header='Nombre'
          field='name'
        />
        <Column
          header='DNI'
          field='dni'
        />
        <Column
          header='Número'
          field='phoneNumber'
        />
      </DataTable>
    </div>
  )
}
