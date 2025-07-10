import { apiClubSalud } from 'utils/axios.service'
import { DateUtils } from 'utils/ClubSalud/dates'
import { type Attendance } from 'utils/ClubSalud/types'

export const createAttendance = async ({
  memberId,
  classId = 10,
  date = DateUtils.getCurrentDate()
}: {
  memberId: number
  classId?: number
  date?: Date
}): Promise<Attendance> => {
  try {
    const response = await apiClubSalud.post('/member-attendance', {
      memberId,
      classId,
      date
    })
    return response.data
  } catch (error) {
    console.log(error)
    throw new Error(JSON.stringify(error))
  }
}

export const getDailyAttendance = async (date: Date): Promise<Attendance[]> => {
  try {
    const response = await apiClubSalud.get(
      `/member-attendance?date=${date.toISOString()}`
    )
    return response.data
  } catch (error) {
    console.log(error)
    throw new Error(JSON.stringify(error))
  }
}
