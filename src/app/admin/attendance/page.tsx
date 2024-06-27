'use client'

import HasRole from 'components/HasRole'
import { Card } from 'primereact/card'
import { type ReactElement } from 'react'
import { Permissions } from 'utils/types'
import AttendanceAdmTable from 'components/attendance/AttendanceAdmTable'

export default function Attendace(): ReactElement {
  // const [user, setUser] = useState<Account | null>(null)

  // const { data: classes } = useQuery({
  //   queryKey: ['class'],
  //   queryFn: async () => {
  //     return await getClasses()
  //   }
  // })

  // useEffect(() => {
  //   const storage = localStorage.getItem('user')
  //   if (storage) {
  //     const user: Account = JSON.parse(storage)
  //     setUser(user)
  //   }
  // }, [])

  return (
    <Card className='h-full w-full'>
      <HasRole required={[Permissions.ADM, Permissions.OWN]}>
        <AttendanceAdmTable />
      </HasRole>
    </Card>
  )
}
