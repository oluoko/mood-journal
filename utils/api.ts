const createURL = (path) => {
  return window.location.origin + path
}

export const updateEntry = async (id, data) => {
  const res = await fetch(
    new Request(createURL(`/api/journal/${id}`), {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  )

  if (res.ok) {
    const responseData = await res.json()
    return responseData.data
  } else {
    throw new Error('Failed to update the entry')
  }
}

export const createNewEntry = async () => {
  try {
    const res = await fetch(
      new Request(createURL('/api/journal'), {
        method: 'POST',
      })
    )

    console.log('createNewEntry -> res', res)

    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData.error || 'Failed to create entry.')
    }

    const data = await res.json()
    return data.data
  } catch (error) {
    console.error('Error in createNewEntry:', error)
    throw error
  }
}

export const deleteEntry = async (id) => {
  const res = await fetch(
    new Request(createURL(`/api/journal/${id}`), {
      method: 'DELETE',
    })
  )

  if (!res.ok) {
    throw new Error('Failed to delete the entry')
  }
}

export const askQuestion = async (question) => {
  const res = await fetch(
    new Request(createURL('/api/question'), {
      method: 'POST',
      body: JSON.stringify({ question }),
    })
  )

  if (res.ok) {
    const data = await res.json()
    return data.data
  }
}
