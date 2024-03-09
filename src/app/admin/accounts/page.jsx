import { CreateDropdown } from "@/components/account/CreateDropdown"
import { DeleteDropdown } from "@/components/account/DeleteDropdown"

export default function Accounts() {
  return (
    <div className="h-full w-full flex items-start justify-start flex-col p-5">
      <div className="h-full w-full flex items-start justify-start flex-row">
        <CreateDropdown></CreateDropdown>
        <DeleteDropdown></DeleteDropdown>
        <div className="pl-5">
          <button onClick={null} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Ver Cuentas
          </button>
        </div>
      </div>
      <div>
        
      </div>
    </div>
  )
}