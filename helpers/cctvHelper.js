// get all cctv data from api
async function getAllCctv() {
  const response = await fetch(`${process.env.APP_URL}/api/cctvs`, {
    cache: 'no-cache',
  })

  const data = await response.json()

  return data
}

// create new cctv data
async function createCctv({ ipAddress, latitude, longitude, status, city }) {
  const response = await fetch(`${process.env.APP_URL}/api/cctvs`, {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ipAddress,
      location: {
        latitude,
        longitude,
      },
      status,
      city,
    }),
  })

  const data = await response.json()
  return data
}

export { getAllCctv, createCctv }
