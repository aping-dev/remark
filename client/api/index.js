
async function API(command, params) {
  try {
    const res = await fetch(`/api/?command=${command}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    })
    const result = await res.json()
    return result
  } catch(err) {
    console.error(err)
  }
}

export default API
