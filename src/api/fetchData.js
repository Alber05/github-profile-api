export const searchUsers = async (query) => {
  try {
    const response = await fetch(
      `https://api.github.com/search/users?q=${query}`,
      {
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
          Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`
        }
      }
    )

    const data = await response.json()

    return data
  } catch (error) {
    console.log(error)
  }
}

export const fetchUser = async (userName) => {
  try {
    const response = await fetch(`https://api.github.com/users/${userName}`, {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
        Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`
      }
    })

    const data = await response.json()

    return data
  } catch (error) {
    console.log(error)
  }
}

export const fetchRepos = async (userName) => {
  try {
    const response = await fetch(
      `https://api.github.com/users/${userName}/repos`,
      {
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
          Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`
        }
      }
    )

    const data = await response.json()

    return data
  } catch (error) {
    console.log(error)
  }
}

export const fetchUsersInfo = async (url) => {
  try {
    const response = await fetch(url, {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
        Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`
      }
    })
    const data = await response.json()

    // Obtener detalles adicionales para cada usuario seguido
    const detailedFollowing = await Promise.all(
      data.map(async (user) => {
        const userDetailsResponse = await fetch(
          `https://api.github.com/users/${user.login}`,
          {
            headers: {
              'X-GitHub-Api-Version': '2022-11-28',
              Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`
            }
          }
        )
        const userDetails = await userDetailsResponse.json()
        return userDetails
      })
    )

    return detailedFollowing
  } catch (error) {
    console.log(error)
  }
}
