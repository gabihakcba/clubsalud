import moment from 'moment'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Dropdown } from 'primereact/dropdown'
import { InputNumber } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { ToggleButton } from 'primereact/togglebutton'
import { useState, type ReactElement } from 'react'
import { registrationFormTranslation } from 'utils/const'
import { OncologicalDiseaseStatus } from 'utils/types'

export default function RegistrationForm(): ReactElement {
  const [evaluationDate, setEvaluationDate] = useState<Date>(moment().toDate())
  const [hasHypertension, setHasHypertension] = useState<boolean>(false)
  const [hasDiabetes, setHasDiabetes] = useState<boolean>(false)
  const [hasHypercholesterolemia, setHasHypercholesterolemia] =
    useState<boolean>(false)
  const [hasHypertriglyceridemia, setHasHypertriglyceridemia] =
    useState<boolean>(false)
  const [hasStableHeartFailure, setHasStableHeartFailure] =
    useState<boolean>(false)
  const [hasStableIschemicHeartDisease, setHasStableIschemicHeartDisease] =
    useState<boolean>(false)
  const [
    hasChronicObstructivePulmonaryDisease,
    setHasChronicObstructivePulmonaryDisease
  ] = useState<boolean>(false)
  const [hasAsthma, setHasAsthma] = useState<boolean>(false)
  const [hasOncologicalDisease, setHasOncologicalDisease] =
    useState<boolean>(false)
  const [oncologicalDiseaseStatus, setOncologicalDiseaseStatus] =
    useState<OncologicalDiseaseStatus | null>(null)
  const [hasChronicKidneyFailure, setHasChronicKidneyFailure] =
    useState<boolean>(false)
  const [hasObesity, setHasObesity] = useState<boolean>(false)
  const [hasRecentTrauma, setHasRecentTrauma] = useState<boolean>(false)
  const [traumaLocation, setTraumaLocation] = useState<string | null>(null)
  const [traumaDate, setTraumaDate] = useState<Date | null>(null)
  const [hasRecentSurgery, setHasRecentSurgery] = useState<boolean>(false)
  const [surgeryLocation, setSurgeryLocation] = useState<string | null>(null)
  const [surgeryDate, setSurgeryDate] = useState<Date | null>(null)
  const [hasSarcopenia, setHasSarcopenia] = useState<boolean>(false)
  const [isUnderweight, setIsUnderweight] = useState<boolean>(false)
  const [hasFallsLastSixMonths, setHasFallsLastSixMonths] =
    useState<boolean>(false)
  const [fallsPerMonth, setFallsPerMonth] = useState<number | null>(null)
  const [otherConditions, setOtherConditions] = useState<string | null>(null)

  return (
    <form
      action=''
      className='relative rounded h-max w-max flex flex-column p-3 gap-4 pt-4'
      onSubmit={(event) => {
        event.preventDefault()
        const data = {
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
        console.log(data)
      }}
    >
      <div className='flex flex-row justify-content-between align-items-center gap-4'>
        <label htmlFor=''>Fecha de evaluación</label>
        <Calendar
          dateFormat='dd-mm-yy'
          value={evaluationDate}
          onChange={(e) => {
            setEvaluationDate(moment(e.value).toDate())
          }}
          required
        />
      </div>

      <div className='flex flex-row justify-content-between align-items-center gap-4'>
        <label htmlFor=''>{registrationFormTranslation.hasHypertension}</label>
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
        />
      </div>

      <div className='flex flex-row justify-content-between align-items-center gap-4'>
        <label htmlFor=''>
          {registrationFormTranslation.hasChronicObstructivePulmonaryDisease}
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
        />
      </div>

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
              { value: OncologicalDiseaseStatus.RESOLVED, label: 'Resuelto' }
            ]}
            optionLabel='label'
            optionValue='value'
            onChange={(e) => {
              setOncologicalDiseaseStatus(e.value as OncologicalDiseaseStatus)
            }}
            invalid={hasOncologicalDisease && oncologicalDiseaseStatus === null}
            required={hasOncologicalDisease}
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
        />
      </div>

      <div className='flex flex-row justify-content-between align-items-center gap-4'>
        <label htmlFor=''>{registrationFormTranslation.hasRecentTrauma}</label>
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
            />
          </div>

          <div className='flex flex-row justify-content-between align-items-center gap-4'>
            <label htmlFor=''>{registrationFormTranslation.traumaDate}</label>
            <Calendar
              dateFormat='dd-mm-yy'
              value={traumaDate}
              onChange={(e) => {
                setTraumaDate(moment(e.value).toDate())
              }}
              invalid={hasRecentTrauma && traumaDate === null}
              required={hasRecentTrauma}
            />
          </div>
        </>
      )}

      <div className='flex flex-row justify-content-between align-items-center gap-4'>
        <label htmlFor=''>{registrationFormTranslation.hasRecentSurgery}</label>
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
            />
          </div>

          <div className='flex flex-row justify-content-between align-items-center gap-4'>
            <label htmlFor=''>{registrationFormTranslation.surgeryDate}</label>
            <Calendar
              dateFormat='dd-mm-yy'
              value={surgeryDate}
              onChange={(e) => {
                setSurgeryDate(moment(e.value).toDate())
              }}
              invalid={hasRecentSurgery && surgeryDate === null}
              required={hasRecentSurgery}
            />
          </div>
        </>
      )}

      <div className='flex flex-row justify-content-between align-items-center gap-4'>
        <label htmlFor=''>{registrationFormTranslation.hasSarcopenia}</label>
        <ToggleButton
          onLabel='Si'
          onIcon='pi pi-check'
          offLabel='No'
          offIcon='pi pi-times'
          iconPos='right'
          defaultChecked={false}
          checked={hasRecentSurgery}
          onChange={(e) => {
            setHasSarcopenia(e.value)
          }}
          required
        />
      </div>

      <div className='flex flex-row justify-content-between align-items-center gap-4'>
        <label htmlFor=''>{registrationFormTranslation.isUnderweight}</label>
        <ToggleButton
          onLabel='Si'
          onIcon='pi pi-check'
          offLabel='No'
          offIcon='pi pi-times'
          iconPos='right'
          defaultChecked={false}
          checked={hasRecentSurgery}
          onChange={(e) => {
            setIsUnderweight(e.value)
          }}
          required
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
        />
      </div>

      {hasFallsLastSixMonths && (
        <div className='flex flex-row justify-content-between align-items-center gap-4'>
          <label htmlFor=''>{registrationFormTranslation.fallsPerMonth}</label>
          <InputNumber
            value={fallsPerMonth}
            onChange={(e) => {
              setFallsPerMonth(e.value as number)
            }}
            invalid={hasFallsLastSixMonths && fallsPerMonth === null}
            required={hasFallsLastSixMonths}
          />
        </div>
      )}

      <div className='flex flex-row justify-content-between align-items-center gap-4'>
        <label htmlFor=''>{registrationFormTranslation.otherConditions}</label>
        <InputTextarea
          onChange={(e) => {
            setOtherConditions(e.target.value)
          }}
        />
      </div>

      <Button
        label='Enviar'
        type='submit'
        size='small'
        icon='pi pi-upload'
        iconPos='right'
      />
    </form>
  )
}
