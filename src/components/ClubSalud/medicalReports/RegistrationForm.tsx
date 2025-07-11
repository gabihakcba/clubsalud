import { useMutation, useQuery } from '@tanstack/react-query'
import moment from 'moment'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Dropdown } from 'primereact/dropdown'
import { InputNumber } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { ToggleButton } from 'primereact/togglebutton'
import { getInstructors } from 'queries/ClubSalud/instructors'
import {
  createRegistrationForm,
  updateRegistrationForm
} from 'queries/ClubSalud/registrationForm'
import { useEffect, useState, type ReactElement } from 'react'
import { registrationFormTranslation } from 'utils/ClubSalud/const'
import {
  type CreateRegistrationForm,
  type Member,
  type RegistrationForm,
  OncologicalDiseaseStatus
} from 'utils/ClubSalud/types'
import { Toast } from 'primereact/toast'
import { useRef } from 'react'
import { useMountEffect } from 'primereact/hooks'
import { Messages } from 'primereact/messages'

export default function RegistrationMemberForm({
  member
}: {
  member: Member | null
}): ReactElement {
  const [editForm, setEditForm] = useState<boolean>(true)
  // Form fields
  const [memberId, setMemberId] = useState<number | null>(
    member?.RegistrationForm?.memberId ?? null
  )
  const [instructorId, setInstructorId] = useState<number | null>(
    member?.RegistrationForm?.instructorId ?? null
  )
  const [evaluationDate, setEvaluationDate] = useState<Date>(
    moment(member?.RegistrationForm?.evaluationDate).toDate() ??
      moment().toDate()
  )
  const [hasHypertension, setHasHypertension] = useState<boolean>(
    member?.RegistrationForm?.hasHypertension ?? false
  )
  const [hasDiabetes, setHasDiabetes] = useState<boolean>(
    member?.RegistrationForm?.hasDiabetes ?? false
  )
  const [hasHypercholesterolemia, setHasHypercholesterolemia] =
    useState<boolean>(
      member?.RegistrationForm?.hasHypercholesterolemia ?? false
    )
  const [hasHypertriglyceridemia, setHasHypertriglyceridemia] =
    useState<boolean>(
      member?.RegistrationForm?.hasHypertriglyceridemia ?? false
    )
  const [hasStableHeartFailure, setHasStableHeartFailure] = useState<boolean>(
    member?.RegistrationForm?.hasStableHeartFailure ?? false
  )
  const [hasStableIschemicHeartDisease, setHasStableIschemicHeartDisease] =
    useState<boolean>(
      member?.RegistrationForm?.hasStableIschemicHeartDisease ?? false
    )
  const [
    hasChronicObstructivePulmonaryDisease,
    setHasChronicObstructivePulmonaryDisease
  ] = useState<boolean>(
    member?.RegistrationForm?.hasChronicObstructivePulmonaryDisease ?? false
  )
  const [hasAsthma, setHasAsthma] = useState<boolean>(
    member?.RegistrationForm?.hasAsthma ?? false
  )
  const [hasOncologicalDisease, setHasOncologicalDisease] = useState<boolean>(
    member?.RegistrationForm?.hasOncologicalDisease ?? false
  )
  const [oncologicalDiseaseStatus, setOncologicalDiseaseStatus] = useState<
  OncologicalDiseaseStatus | undefined
  >(member?.RegistrationForm?.oncologicalDiseaseStatus ?? undefined)
  const [hasChronicKidneyFailure, setHasChronicKidneyFailure] =
    useState<boolean>(
      member?.RegistrationForm?.hasChronicKidneyFailure ?? false
    )
  const [hasObesity, setHasObesity] = useState<boolean>(
    member?.RegistrationForm?.hasObesity ?? false
  )
  const [hasRecentTrauma, setHasRecentTrauma] = useState<boolean>(
    member?.RegistrationForm?.hasRecentTrauma ?? false
  )
  const [traumaLocation, setTraumaLocation] = useState<string | undefined>(
    member?.RegistrationForm?.traumaLocation ?? undefined
  )
  const [traumaDate, setTraumaDate] = useState<Date | undefined>(
    moment(member?.RegistrationForm?.traumaDate).toDate() ?? undefined
  )
  const [hasRecentSurgery, setHasRecentSurgery] = useState<boolean>(
    member?.RegistrationForm?.hasRecentSurgery ?? false
  )
  const [surgeryLocation, setSurgeryLocation] = useState<string | undefined>(
    member?.RegistrationForm?.surgeryLocation ?? undefined
  )
  const [surgeryDate, setSurgeryDate] = useState<Date | undefined>(
    moment(member?.RegistrationForm?.surgeryDate).toDate() ?? undefined
  )
  const [hasSarcopenia, setHasSarcopenia] = useState<boolean>(
    member?.RegistrationForm?.hasSarcopenia ?? false
  )
  const [isUnderweight, setIsUnderweight] = useState<boolean>(
    member?.RegistrationForm?.isUnderweight ?? false
  )
  const [hasFallsLastSixMonths, setHasFallsLastSixMonths] = useState<boolean>(
    member?.RegistrationForm?.hasFallsLastSixMonths ?? false
  )
  const [fallsPerMonth, setFallsPerMonth] = useState<number | undefined>(
    member?.RegistrationForm?.fallsPerMonth ?? undefined
  )
  const [otherConditions, setOtherConditions] = useState<string | undefined>(
    member?.RegistrationForm?.otherConditions ?? undefined
  )

  const { data: instructors, isLoading: isLoadingInstructors } = useQuery({
    queryKey: ['instructors'],
    queryFn: async () => {
      return await getInstructors()
    }
  })

  const { mutate: newForm, isPending: pendingCreate } = useMutation({
    mutationFn: async (form: CreateRegistrationForm) => {
      return await createRegistrationForm(form)
    },
    onSuccess: () => {
      showSuccess('Formulario creado correctamente')
    },
    onError(error) {
      showError(error.message)
    }
  })

  const { mutate: updateForm, isPending: pedingUpdate } = useMutation({
    mutationFn: async (form: RegistrationForm) => {
      return await updateRegistrationForm(form)
    },
    onSuccess: () => {
      showSuccess('Formulario actualizado correctamente')
    },
    onError(error) {
      showError(error.message)
    }
  })

  const toast = useRef<Toast>(null)

  const showSuccess = (message: string): void => {
    toast.current?.show({
      severity: 'success',
      summary: 'Éxito',
      detail: message,
      life: 3000
    })
  }

  const showError = (message: string): void => {
    toast.current?.show({
      severity: 'error',
      summary: 'Error',
      detail: message,
      life: 3000
    })
  }

  const msgs = useRef<Messages>(null)

  useMountEffect(() => {
    msgs.current?.clear()
    if (member?.RegistrationForm) {
      msgs.current?.show({
        id: '1',
        sticky: true,
        severity: 'success',
        summary: 'Estado',
        detail: 'Formulario de inscripción hecho',
        closable: false
      })
    } else {
      msgs.current?.show({
        id: '1',
        sticky: true,
        severity: 'error',
        summary: 'Estado',
        detail: 'Formulario de inscripción faltante',
        closable: false
      })
    }
  })

  useEffect(() => {
    setMemberId(member?.id ?? null)
    setEditForm(member?.RegistrationForm === null)
  }, [member])

  return (
    <>
      <Toast ref={toast} />
      <Messages ref={msgs} />
      <form
        action=''
        className='relative rounded h-max w-max flex flex-row p-3 gap-4 pt-4'
        onSubmit={(event) => {
          event.preventDefault()
          if (memberId && instructorId) {
            const data: CreateRegistrationForm = {
              memberId,
              instructorId,
              evaluationDate,
              hasHypertension,
              hasDiabetes,
              hasHypercholesterolemia,
              hasHypertriglyceridemia,
              hasStableHeartFailure,
              hasStableIschemicHeartDisease,
              hasChronicObstructivePulmonaryDisease,
              hasAsthma,
              hasOncologicalDisease,
              oncologicalDiseaseStatus,
              hasChronicKidneyFailure,
              hasObesity,
              hasRecentTrauma,
              traumaLocation,
              traumaDate,
              hasRecentSurgery,
              surgeryLocation,
              surgeryDate,
              hasSarcopenia,
              isUnderweight,
              hasFallsLastSixMonths,
              fallsPerMonth,
              otherConditions
            }
            if (member?.RegistrationForm) {
              updateForm({
                id: member.RegistrationForm.id,
                evaluationNumber: member.RegistrationForm.evaluationNumber,
                ...data
              })
            } else {
              newForm(data)
            }
          }
        }}
      >
        <div className='flex flex-column p-3 gap-4 pt-4'>
          <div className='flex flex-row justify-content-between align-items-center gap-4'>
            <label htmlFor=''>Profesor</label>
            <Dropdown
              value={instructorId}
              options={instructors}
              loading={isLoadingInstructors}
              optionLabel='name'
              optionValue='id'
              className='w-full'
              onChange={(e) => {
                setInstructorId(e.value as number)
              }}
              required
              disabled={!editForm}
            />
          </div>

          <div className='flex flex-row justify-content-between align-items-center gap-4'>
            <label htmlFor=''>Fecha de evaluación</label>
            <Calendar
              dateFormat='dd-mm-yy'
              value={evaluationDate}
              onChange={(e) => {
                setEvaluationDate(moment(e.value).toDate())
              }}
              required
              disabled={!editForm}
            />
          </div>

          <div className='flex flex-row justify-content-between align-items-center gap-4'>
            <label htmlFor=''>
              {registrationFormTranslation.hasHypertension}
            </label>
            <ToggleButton
              onLabel='Si'
              onIcon='pi pi-check'
              offLabel='No'
              offIcon='pi pi-times'
              iconPos='right'
              defaultChecked={false}
              checked={hasHypertension}
              onChange={(e) => {
                setHasHypertension(e.value)
              }}
              required
              disabled={!editForm}
            />
          </div>

          <div className='flex flex-row justify-content-between align-items-center gap-4'>
            <label htmlFor=''>{registrationFormTranslation.hasDiabetes}</label>
            <ToggleButton
              onLabel='Si'
              onIcon='pi pi-check'
              offLabel='No'
              offIcon='pi pi-times'
              iconPos='right'
              defaultChecked={false}
              checked={hasDiabetes}
              onChange={(e) => {
                setHasDiabetes(e.value)
              }}
              required
              disabled={!editForm}
            />
          </div>

          <div className='flex flex-row justify-content-between align-items-center gap-4'>
            <label htmlFor=''>
              {registrationFormTranslation.hasHypercholesterolemia}
            </label>
            <ToggleButton
              onLabel='Si'
              onIcon='pi pi-check'
              offLabel='No'
              offIcon='pi pi-times'
              iconPos='right'
              defaultChecked={false}
              checked={hasHypercholesterolemia}
              onChange={(e) => {
                setHasHypercholesterolemia(e.value)
              }}
              required
              disabled={!editForm}
            />
          </div>

          <div className='flex flex-row justify-content-between align-items-center gap-4'>
            <label htmlFor=''>
              {registrationFormTranslation.hasHypertriglyceridemia}
            </label>
            <ToggleButton
              onLabel='Si'
              onIcon='pi pi-check'
              offLabel='No'
              offIcon='pi pi-times'
              iconPos='right'
              defaultChecked={false}
              checked={hasHypertriglyceridemia}
              onChange={(e) => {
                setHasHypertriglyceridemia(e.value)
              }}
              required
              disabled={!editForm}
            />
          </div>

          <div className='flex flex-row justify-content-between align-items-center gap-4'>
            <label htmlFor=''>
              {registrationFormTranslation.hasStableHeartFailure}
            </label>
            <ToggleButton
              onLabel='Si'
              onIcon='pi pi-check'
              offLabel='No'
              offIcon='pi pi-times'
              iconPos='right'
              defaultChecked={false}
              checked={hasStableHeartFailure}
              onChange={(e) => {
                setHasStableHeartFailure(e.value)
              }}
              required
              disabled={!editForm}
            />
          </div>

          <div className='flex flex-row justify-content-between align-items-center gap-4'>
            <label htmlFor=''>
              {registrationFormTranslation.hasStableIschemicHeartDisease}
            </label>
            <ToggleButton
              onLabel='Si'
              onIcon='pi pi-check'
              offLabel='No'
              offIcon='pi pi-times'
              iconPos='right'
              defaultChecked={false}
              checked={hasStableIschemicHeartDisease}
              onChange={(e) => {
                setHasStableIschemicHeartDisease(e.value)
              }}
              required
              disabled={!editForm}
            />
          </div>

          <div className='flex flex-row justify-content-between align-items-center gap-4'>
            <label htmlFor=''>
              {
                registrationFormTranslation.hasChronicObstructivePulmonaryDisease
              }
            </label>
            <ToggleButton
              onLabel='Si'
              onIcon='pi pi-check'
              offLabel='No'
              offIcon='pi pi-times'
              iconPos='right'
              defaultChecked={false}
              checked={hasChronicObstructivePulmonaryDisease}
              onChange={(e) => {
                setHasChronicObstructivePulmonaryDisease(e.value)
              }}
              required
              disabled={!editForm}
            />
          </div>

          <div className='flex flex-row justify-content-between align-items-center gap-4'>
            <label htmlFor=''>{registrationFormTranslation.hasAsthma}</label>
            <ToggleButton
              onLabel='Si'
              onIcon='pi pi-check'
              offLabel='No'
              offIcon='pi pi-times'
              iconPos='right'
              defaultChecked={false}
              checked={hasAsthma}
              onChange={(e) => {
                setHasAsthma(e.value)
              }}
              required
              disabled={!editForm}
            />
          </div>
        </div>
        <div className='flex flex-column p-3 gap-4 pt-4'>
          <div className='flex flex-row justify-content-between align-items-center gap-4'>
            <label htmlFor=''>
              {registrationFormTranslation.hasOncologicalDisease}
            </label>
            <ToggleButton
              onLabel='Si'
              onIcon='pi pi-check'
              offLabel='No'
              offIcon='pi pi-times'
              iconPos='right'
              defaultChecked={false}
              checked={hasOncologicalDisease}
              onChange={(e) => {
                setHasOncologicalDisease(e.value)
              }}
              required
              disabled={!editForm}
            />
          </div>

          {hasOncologicalDisease && (
            <div className='flex flex-row justify-content-between align-items-center gap-4'>
              <label htmlFor=''>
                {registrationFormTranslation.oncologicalDiseaseStatus}
              </label>
              <Dropdown
                value={oncologicalDiseaseStatus}
                options={[
                  { value: OncologicalDiseaseStatus.ACTIVE, label: 'Activo' },
                  {
                    value: OncologicalDiseaseStatus.RESOLVED,
                    label: 'Resuelto'
                  }
                ]}
                optionLabel='label'
                optionValue='value'
                onChange={(e) => {
                  setOncologicalDiseaseStatus(
                    e.value as OncologicalDiseaseStatus
                  )
                }}
                invalid={
                  hasOncologicalDisease && oncologicalDiseaseStatus === null
                }
                required={hasOncologicalDisease}
                disabled={!editForm}
              />
            </div>
          )}

          <div className='flex flex-row justify-content-between align-items-center gap-4'>
            <label htmlFor=''>
              {registrationFormTranslation.hasChronicKidneyFailure}
            </label>
            <ToggleButton
              onLabel='Si'
              onIcon='pi pi-check'
              offLabel='No'
              offIcon='pi pi-times'
              iconPos='right'
              defaultChecked={false}
              checked={hasChronicKidneyFailure}
              onChange={(e) => {
                setHasChronicKidneyFailure(e.value)
              }}
              required
              disabled={!editForm}
            />
          </div>

          <div className='flex flex-row justify-content-between align-items-center gap-4'>
            <label htmlFor=''>{registrationFormTranslation.hasObesity}</label>
            <ToggleButton
              onLabel='Si'
              onIcon='pi pi-check'
              offLabel='No'
              offIcon='pi pi-times'
              iconPos='right'
              defaultChecked={false}
              checked={hasObesity}
              onChange={(e) => {
                setHasObesity(e.value)
              }}
              required
              disabled={!editForm}
            />
          </div>

          <div className='flex flex-row justify-content-between align-items-center gap-4'>
            <label htmlFor=''>
              {registrationFormTranslation.hasRecentTrauma}
            </label>
            <ToggleButton
              onLabel='Si'
              onIcon='pi pi-check'
              offLabel='No'
              offIcon='pi pi-times'
              iconPos='right'
              defaultChecked={false}
              checked={hasRecentTrauma}
              onChange={(e) => {
                setHasRecentTrauma(e.value)
              }}
              required
              disabled={!editForm}
            />
          </div>

          {hasRecentTrauma && (
            <>
              <div className='flex flex-row justify-content-between align-items-center gap-4'>
                <label htmlFor=''>
                  {registrationFormTranslation.traumaLocation}
                </label>
                <InputText
                  onChange={(e) => {
                    setTraumaLocation(e.target.value)
                  }}
                  invalid={hasRecentTrauma && traumaLocation === null}
                  required={hasRecentTrauma}
                  disabled={!editForm}
                />
              </div>

              <div className='flex flex-row justify-content-between align-items-center gap-4'>
                <label htmlFor=''>
                  {registrationFormTranslation.traumaDate}
                </label>
                <Calendar
                  dateFormat='dd-mm-yy'
                  value={traumaDate}
                  onChange={(e) => {
                    setTraumaDate(moment(e.value).toDate())
                  }}
                  invalid={hasRecentTrauma && traumaDate === null}
                  required={hasRecentTrauma}
                  disabled={!editForm}
                />
              </div>
            </>
          )}

          <div className='flex flex-row justify-content-between align-items-center gap-4'>
            <label htmlFor=''>
              {registrationFormTranslation.hasRecentSurgery}
            </label>
            <ToggleButton
              onLabel='Si'
              onIcon='pi pi-check'
              offLabel='No'
              offIcon='pi pi-times'
              iconPos='right'
              defaultChecked={false}
              checked={hasRecentSurgery}
              onChange={(e) => {
                setHasRecentSurgery(e.value)
              }}
              required
              disabled={!editForm}
            />
          </div>

          {hasRecentSurgery && (
            <>
              <div className='flex flex-row justify-content-between align-items-center gap-4'>
                <label htmlFor=''>
                  {registrationFormTranslation.surgeryLocation}
                </label>
                <InputText
                  onChange={(e) => {
                    setSurgeryLocation(e.target.value)
                  }}
                  invalid={hasRecentSurgery && surgeryLocation === null}
                  required={hasRecentSurgery}
                  disabled={!editForm}
                />
              </div>

              <div className='flex flex-row justify-content-between align-items-center gap-4'>
                <label htmlFor=''>
                  {registrationFormTranslation.surgeryDate}
                </label>
                <Calendar
                  dateFormat='dd-mm-yy'
                  value={surgeryDate}
                  onChange={(e) => {
                    setSurgeryDate(moment(e.value).toDate())
                  }}
                  invalid={hasRecentSurgery && surgeryDate === null}
                  required={hasRecentSurgery}
                  disabled={!editForm}
                />
              </div>
            </>
          )}

          <div className='flex flex-row justify-content-between align-items-center gap-4'>
            <label htmlFor=''>
              {registrationFormTranslation.hasSarcopenia}
            </label>
            <ToggleButton
              onLabel='Si'
              onIcon='pi pi-check'
              offLabel='No'
              offIcon='pi pi-times'
              iconPos='right'
              defaultChecked={false}
              checked={hasSarcopenia}
              onChange={(e) => {
                setHasSarcopenia(e.value)
              }}
              required
              disabled={!editForm}
            />
          </div>

          <div className='flex flex-row justify-content-between align-items-center gap-4'>
            <label htmlFor=''>
              {registrationFormTranslation.isUnderweight}
            </label>
            <ToggleButton
              onLabel='Si'
              onIcon='pi pi-check'
              offLabel='No'
              offIcon='pi pi-times'
              iconPos='right'
              defaultChecked={false}
              checked={isUnderweight}
              onChange={(e) => {
                setIsUnderweight(e.value)
              }}
              required
              disabled={!editForm}
            />
          </div>

          <div className='flex flex-row justify-content-between align-items-center gap-4'>
            <label htmlFor=''>
              {registrationFormTranslation.hasFallsLastSixMonths}
            </label>
            <ToggleButton
              onLabel='Si'
              onIcon='pi pi-check'
              offLabel='No'
              offIcon='pi pi-times'
              iconPos='right'
              defaultChecked={false}
              checked={hasFallsLastSixMonths}
              onChange={(e) => {
                setHasFallsLastSixMonths(e.value)
              }}
              required
              disabled={!editForm}
            />
          </div>

          {hasFallsLastSixMonths && (
            <div className='flex flex-row justify-content-between align-items-center gap-4'>
              <label htmlFor=''>
                {registrationFormTranslation.fallsPerMonth}
              </label>
              <InputNumber
                value={fallsPerMonth}
                onChange={(e) => {
                  setFallsPerMonth(e.value ?? undefined)
                }}
                invalid={hasFallsLastSixMonths && fallsPerMonth === null}
                required={hasFallsLastSixMonths}
                disabled={!editForm}
              />
            </div>
          )}

          <div className='flex flex-row justify-content-between align-items-center gap-4'>
            <label htmlFor=''>
              {registrationFormTranslation.otherConditions}
            </label>
            <InputTextarea
              onChange={(e) => {
                setOtherConditions(e.target.value)
              }}
              disabled={!editForm}
            />
          </div>

          <div className='w-full flex flex-row justify-content-between align-items-center'>
            <Button
              label={member?.RegistrationForm ? 'Actualizar' : 'Guardar'}
              type='submit'
              size='small'
              icon={
                pedingUpdate || pendingCreate
                  ? 'pi pi-spin pi-sync'
                  : 'pi pi-upload'
              }
              iconPos='right'
              disabled={!editForm}
            />
            <Button
              onClick={() => {
                setEditForm((prev: boolean) => !prev)
              }}
              type='button'
              size='small'
              icon='pi pi-pen-to-square'
            />
          </div>
        </div>
      </form>
    </>
  )
}
