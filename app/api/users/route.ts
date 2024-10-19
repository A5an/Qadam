import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  const userData = await request.json()
  try {
    const user = await prisma.user.upsert({
      where: { chatId: userData.id.toString() },
      update: {
        firstName: userData.first_name,
        lastName: userData.last_name,
        username: userData.username,
        isNew: false,
        role: 'USER'  
      },
      create: {
        chatId: userData.id.toString(),
        firstName: userData.first_name,
        lastName: userData.last_name,
        username: userData.username,
        isNew: true,
        role: 'USER'
      }
    })
    return NextResponse.json(user)
  } catch (error) {
    console.error('Error saving user:', error)
    return NextResponse.json({ error: 'Failed to save user' }, { status: 500 })
  }
}