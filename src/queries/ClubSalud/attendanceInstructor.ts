import { apiClubSalud } from 'utils/axios.service'
import { DateUtils } from 'utils/ClubSalud/dates'
import { type AttendanceInstructor } from 'utils/ClubSalud/types'

export const getAttendancesInstructor = async (): Promise<
AttendanceInstructor[]
> => {
  const response = await apiClubSalud.get('/instructor-attendance')
  return response.data
}

export const createAttendanceInstructor = async ({
  instructorId,
  classId = 10,
  date = DateUtils.getCurrentDate(),
  hours
}: {
  instructorId: number
  classId?: number
  date?: Date
  hours: number
}): Promise<AttendanceInstructor> => {
  const response = await apiClubSalud.post('/instructor-attendance', {
    instructorId,
    classId,
    date,
    hours
  })

  return response.data
}

export const deleteAttendanceInstructor = async (
  attendanceInstructorId: number
): Promise<AttendanceInstructor> => {
  const response = await apiClubSalud.delete(
    `/instructor-attendance/${attendanceInstructorId}`
  )
  return response.data
}
