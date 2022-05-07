export default function (context, inject) {
  const apiId = 'V5LCEFEP6V'
  const apiKey = '56a97f6b9a10e6342310e128547418da'
  const headers = {
    'X-Algolia-API-Key': apiKey,
    'X-Algolia-Application-Id': apiId
  }

  inject('dataApi', {
    getHome,
    getReviewsByHomeId,
    getUsersByHomeId
  })

  async function getHome(homeId) {
    try {
      return await unWrap(
        await fetch(`https://${apiId}-dsn.algolia.net/1/indexes/homes/${homeId}`, { headers })
      )
    } catch (error) {
      return getErrorResponse(error)
    }
  }

  async function getReviewsByHomeId(homeId) {
    try {
      return await unWrap(
        await fetch(`https://${apiId}-dsn.algolia.net/1/indexes/reviews/query`, {
          headers,
          method: 'POST',
          body: JSON.stringify({
            filters: `homeId: ${homeId}`,
            hitsPerPage: 6,
            attributesToHighlight: []
          })
        })
      )
    } catch (error) {
      return getErrorResponse(error)
    }
  }

  async function getUsersByHomeId(homeId) {
    try {
      return await unWrap(
        await fetch(`https://${apiId}-dsn.algolia.net/1/indexes/users/query`, {
          headers,
          method: 'POST',
          body: JSON.stringify({
            filters: `homeId: ${homeId}`,
            attributesToHighlight: []
          })
        })
      )
    } catch (error) {
      return getErrorResponse(error)
    }
  }

  async function unWrap(response) {
    const json = await response.json()
    const { ok, status, statusText } = response

    return {
      json,
      ok,
      status,
      statusText,
    }
  }

  function getErrorResponse(error) {
    return {
      ok: false,
      status: 500,
      statusText: error.message,
      json: {}
    }
  }
}
