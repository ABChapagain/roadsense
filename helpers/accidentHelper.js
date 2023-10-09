// get all accident data from api
async function getAllAccidents() {
  const response = await fetch(`${process.env.APP_URL}/api/accidents`, {
    cache: 'no-cache',
  })

  const data = await response.json()

  return data
}

export { getAllAccidents }
