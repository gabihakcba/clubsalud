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
}): Promise<{ clases: number; vencimiento: string }> => {
  try {
    const response = await apiClubSalud.post('/member-attendance', {
      memberId,
      classId,
      date: DateUtils.newDate(date)
    })
    return {
      clases: response.data.subscription.remainingClasses,
      vencimiento: DateUtils.formatToDDMMYY(
        response.data.subscription.expirationDate as Date
      )
    }
  } catch (error) {
    const message = error?.response
      ? (error.response.data.message as string)
      : 'Problemas con el servidor'
    throw new Error(message)
  }
}

export const getDailyAttendance = async (date: Date): Promise<Attendance[]> => {
  try {
    const response = await apiClubSalud.get(
      `/member-attendance?date=${date.toISOString()}`
    )
    return response.data
  } catch (error) {
    const message = error?.response
      ? (error.response.data.message as string)
      : 'Problemas con el servidor'
    throw new Error(message)
  }
}
