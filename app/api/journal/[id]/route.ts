import { analyze } from '@/utils/ai'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export const PATCH = async (request: Request, { params }) => {
  const { content, createdAt } = await request.json()

  const user = await getUserByClerkId()
  const updatedData = {
    ...(content && { content }),
    ...(createdAt && { createdAt }),
  }
  const updateEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
    data: updatedData,
  })

  if (createdAt) {
    await prisma.analysis.updateMany({
      where: {
        entryId: updateEntry.id,
      },
      data: {
        createdAt: updateEntry.createdAt,
      },
    })
  }

  const analysis = await analyze(updateEntry.content)

  const updated = await prisma.analysis.upsert({
    where: {
      entryId: updateEntry.id,
    },
    create: {
      entryId: updateEntry.id,
      userId: user.id,
      createdAt: updateEntry.createdAt,
      ...analysis,
    },
    update: { ...analysis },
  })

  return NextResponse.json({ data: { ...updateEntry, analysis: updated } })
}

export const DELETE = async (request: Request, { params }) => {
  const user = await getUserByClerkId()

  try {
    // Verify that the user owns the entry before deleting
    const entry = await prisma.journalEntry.findUnique({
      where: {
        userId_id: {
          userId: user.id,
          id: params.id,
        },
      },
    })

    if (!entry) {
      return NextResponse.json(
        { error: 'Entry not found or you do not have permission' },
        { status: 404 }
      )
    }

    await prisma.journalEntry.delete({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json({ message: 'Entry deleted successfully' })
  } catch (error) {
    console.error('Error deleting entry:', error)
    return NextResponse.json(
      { error: 'Failed to delete entry' },
      { status: 500 }
    )
  }
}
