import { ReactElement } from "react"
import { APP } from "utils/const"
import { Limits } from "utils/types"

const calculateLimits = (page: number, setLimits: Function): void => {
  const start: number = page*APP - APP
  const end: number = page*APP
  const limits: Limits = {start, end}
  setLimits(limits)
}

export default function AccountsPaginationBar({ pagesNumber, setLimits }) {
  const pages: Array<ReactElement> = []

  for (let i = 0; i < pagesNumber; i++) {
    pages.push(
      <button key={i} onClick={() => calculateLimits(i+1,setLimits)} className="w-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px- m-2 rounded focus:outline-none focus:shadow-outline">
        {i + 1}
      </button>
    );
  }

  return (
    <div className="h-full w-full flex items-center justify-center">
      {pages}
    </div>
  )
}