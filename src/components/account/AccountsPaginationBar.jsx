import { setAccountsElems } from "@/app/admin/accounts/page";
import { APP } from "@/utils/const"

const calculateLimits = (page, setLimits) => {
  const start = page*APP - APP
  const end = page*APP
  setLimits({start, end})
}

export default function AccountsPaginationBar({ pagesNumber, setLimits }) {
  const pages = []
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