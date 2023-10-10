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
  const response = await fetch(`/api/cctvs`, {
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

// edit cctv data
async function editCctv({ id, ipAddress, latitude, longitude, status, city }) {
  const response = await fetch(`/api/cctvs/${id}`, {
    method: 'PUT',
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

// delete cctv data
async function deleteCctv(id) {
  const response = await fetch(`/api/cctvs/${id}`, {
    method: 'DELETE',
  })

  const data = await response.json()
  return data
}

export { getAllCctv, createCctv, editCctv, deleteCctv }
