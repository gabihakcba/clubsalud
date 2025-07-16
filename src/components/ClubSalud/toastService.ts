import { type ToastMessage } from 'primereact/toast'

let toastRef: {
  current: { show: (msg: ToastMessage | ToastMessage[]) => void }
} | null = null

export const setToastRef = (ref: any): void => {
  toastRef = ref
}

export const showToast = (
  severity: 'success' | 'info' | 'warn' | 'error',
  summary: string,
  detail: string,
  life = 3000
): void => {
  toastRef?.current?.show({
    severity,
    summary,
    detail,
    life
  })
}
