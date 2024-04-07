// import { useState, type ReactElement } from 'react'
// import { useForm } from 'react-hook-form'
// import Image from 'next/image'
// import edit from '../../../public/edit.svg'
// import { Days, type Class } from 'utils/types'

// export default function ClassCard({ class_ }: { class_: Class }): ReactElement {
//   const [editF, setEditF] = useState(false)
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//     watch
//   } = useForm()
//   return (
//     <>
//       <form
//         action=''
//         id={`classes${class_?.id}`}
//         // onSubmit={handleSubmit((data) => {
//         // mutateC({ id: instructor.id, data })
//         // })}
//       >
//         <div className='flex items-center justify-end pb-2'>
//           <button
//             onClick={() => {
//               setEditF((prev: boolean) => !prev)
//             }}
//             type='button'
//             className='text-sm font-medium text-blue-600 hover:underline dark:text-blue-500'
//           >
//             <Image
//               src={edit}
//               width={30}
//               height={30}
//               alt='E'
//             ></Image>
//           </button>
//         </div>
//         <div className='flex flex-row'>
//           <ul
//             role='list'
//             className='divide-y divide-gray-200 dark:divide-gray-700 w-full'
//           >
//             <li className='flex flex-row items-center justify-between w-full mb-1 mt-1'>
//               <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
//                 Nombre
//               </label>
//               {!editF && (
//                 <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
//                   {class_?.name}
//                 </label>
//               )}
//               {editF && (
//                 <div>
//                   <input
//                     type='text'
//                     id='name'
//                     form={`class${class_?.id}`}
//                     className='w-36 bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
//                     defaultValue={class_?.name}
//                     {...register('name', {
//                       required: {
//                         value: true,
//                         message: 'El nombre requerido'
//                       }
//                     })}
//                   />
//                   {errors?.name && (
//                     <span className='inputError'>
//                       {errors.name.message as string}
//                     </span>
//                   )}
//                 </div>
//               )}
//             </li>

//             <li className='flex flex-row items-center justify-between w-full mb-2'>
//               <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
//                 Dias
//               </label>
//               {!editF && (
//                 <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
//                   {class_?.days.map((day) => `${day} `)}
//                 </label>
//               )}
//               {editF && (
//                 <div className='flex flex-col max-h-14 overflow-scroll scrollHidden'>
//                   <div className='flex w-full justify-end gap-4 text-white'>
//                     <label htmlFor=''>Lunes</label>
//                     <input
//                       type='checkbox'
//                       id='monday'
//                       form={`class${class_?.id}`}
//                       className='w-max bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
//                       value={Days.MONDAY}
//                       {...register('days[]', {
//                         validate: () => {
//                           return (
//                             watch('days').length > 0 ||
//                             'Los dias son requeridos'
//                           )
//                         }
//                       })}
//                     />
//                   </div>
//                   <div className='flex w-full justify-end gap-4 text-white'>
//                     <label htmlFor=''>Martes</label>
//                     <input
//                       type='checkbox'
//                       id='tuesday'
//                       form={`class${class_?.id}`}
//                       className='w-max bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
//                       value={Days.TUESDAY}
//                       {...register('days[]')}
//                     />
//                   </div>
//                   <div className='flex w-full justify-end gap-4 text-white'>
//                     <label htmlFor=''>Miércoles</label>
//                     <input
//                       type='checkbox'
//                       id='wednesday'
//                       form={`class${class_?.id}`}
//                       className='w-max bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
//                       value={Days.WEDNESDAY}
//                       {...register('days[]')}
//                     />
//                   </div>
//                   <div className='flex w-full justify-end gap-4 text-white'>
//                     <label htmlFor=''>Jueves</label>
//                     <input
//                       type='checkbox'
//                       id='thursday'
//                       form={`class${class_?.id}`}
//                       className='w-max bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
//                       value={Days.THURSDAY}
//                       {...register('days[]')}
//                     />
//                   </div>
//                   <div className='flex w-full justify-end gap-4 text-white'>
//                     <label htmlFor=''>Viernes</label>
//                     <input
//                       type='checkbox'
//                       id='friday'
//                       form={`class${class_?.id}`}
//                       className='w-max bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
//                       value={Days.FRIDAY}
//                       {...register('days[]')}
//                     />
//                   </div>
//                   <div className='flex w-full justify-end gap-4 text-white'>
//                     <label htmlFor=''>Sábado</label>
//                     <input
//                       type='checkbox'
//                       id='saturday'
//                       form={`class${class_?.id}`}
//                       className='w-max bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
//                       value={Days.SATURDAY}
//                       {...register('days[]')}
//                     />
//                   </div>
//                   <div className='flex w-full justify-end gap-4 text-white'>
//                     <label htmlFor=''>Domingo</label>
//                     <input
//                       type='checkbox'
//                       id='sunday'
//                       form={`class${class_?.id}`}
//                       className='w-max bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
//                       value={Days.SUNDAY}
//                       {...register('days[]')}
//                     />
//                   </div>
//                   {errors?.days && (
//                     <span className='inputError'>
//                       {errors.days.message as string}
//                     </span>
//                   )}
//                 </div>
//               )}
//             </li>

//             <li className='flex flex-row items-center justify-between w-full mb-2'>
//               <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
//                 Estado
//               </label>
//               {!editF && (
//                 <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
//                   {class_?.state}
//                 </label>
//               )}
//               {editF && (
//                 <div>
//                   <input
//                     type='text'
//                     id='state'
//                     form={`class${class_?.id}`}
//                     className='w-36 bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
//                     defaultValue={class_?.state}
//                     {...register('state', {
//                       required: {
//                         value: true,
//                         message: 'El estado es requerido'
//                       }
//                     })}
//                   />
//                   {errors?.state && (
//                     <span className='inputError'>
//                       {errors.state.message as string}
//                     </span>
//                   )}
//                 </div>
//               )}
//             </li>

//             <li className='flex flex-row items-center justify-between w-full mb-2'>
//               <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
//                 Profesor a cargo
//               </label>
//               {!editF && (
//                 <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
//                   {class_?.instructorInCharge}
//                 </label>
//               )}
//               {editF && (
//                 <div>
//                   <input
//                     type='text'
//                     id='instructorInCharge'
//                     form={`class${class_?.id}`}
//                     className='w-36 bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
//                     defaultValue={class_?.instructorInCharge}
//                     {...register('instructorInCharge')}
//                   />
//                 </div>
//               )}
//             </li>

//             <li className='flex flex-row items-center justify-between w-full mb-2'>
//               <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
//                 Profesor suplente
//               </label>
//               {!editF && (
//                 <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
//                   {class_?.instructorSubstitute}
//                 </label>
//               )}
//               {editF && (
//                 <div>
//                   <input
//                     type='text'
//                     id='instructorSubstitute'
//                     form={`class${class_?.id}`}
//                     className='w-36 bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
//                     defaultValue={class_?.instructorSubstitute}
//                     {...register('instructorSubstitute')}
//                   />
//                 </div>
//               )}
//             </li>
//           </ul>
//         </div>
//       </form>
//     </>
//   )
// }
