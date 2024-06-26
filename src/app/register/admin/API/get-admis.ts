'use server'
import { APIENDPOINST } from '@/utils/api/api-urls'
import { z } from 'zod'

const UserAdminSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  name: z.string(),
  domicilio: z.string(),
  telefono: z.string(),
  empresa: z.string(),
  horario: z.string().nullable(),
  email: z.string(),
  permission: z.string()
})

export default async function GetAdmins (id: number) {
  const response = await fetch(`${APIENDPOINST.getAllUserByPermIdPoint(id)}`)
  console.log('Response:', response)
  console.log('Response:', response.status)
  const data = await response.json()
  console.log(data)
  if (!response.ok) {
    throw new Error(data.message ?? 'Something went wrong!')
  } else {
    return UserAdminSchema.array().parse(data.users)
  }
}
