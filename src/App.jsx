import { useEffect, useState } from 'react'
import { fetchRepos, fetchUser, fetchUsersInfo } from './api/fetchData'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Form from './components/Form'
import InfoCard from './components/InfoCard'
import Repos from './Sections/Repos'
import Followers from './Sections/Followers'
import Following from './Sections/Following'

function App() {
  const [user, setUser] = useState('github')
  const [userData, setUserData] = useState({})
  const [repos, setRepos] = useState([])
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])
  const [section, setSection] = useState('repos')
  const [loaders, setLoaders] = useState({
    repos: true,
    followers: true,
    following: true,
    user: true
  })

  useEffect(() => {
    AOS.init()
    return () => AOS.refresh()
  }, [])

  const getInitialUser = async (user) => {
    try {
      const responseData = await fetchUser(user)
      setUserData(responseData)
    } catch (error) {
      console.error(error)
    }
  }

  const getRepos = async (user) => {
    setLoaders((prevLoaders) => ({ ...prevLoaders, repos: true }))

    try {
      const reposData = await fetchRepos(user)
      setRepos(reposData)
    } catch (error) {
      console.error(error)
    } finally {
      setLoaders((prevLoaders) => ({ ...prevLoaders, repos: false }))
    }
  }

  const getFollowers = async (user) => {
    setLoaders((prevLoaders) => ({ ...prevLoaders, followers: true }))

    try {
      let url = `https://api.github.com/users/${user}/followers`
      const followersData = await fetchUsersInfo(url)
      setFollowers(followersData)
    } catch (error) {
      console.error(error)
    } finally {
      setLoaders((prevLoaders) => ({ ...prevLoaders, followers: false }))
    }
  }

  const getFollowing = async (user) => {
    setLoaders((prevLoaders) => ({ ...prevLoaders, following: true }))

    try {
      let url = `https://api.github.com/users/${user}/following`
      const followingData = await fetchUsersInfo(url)
      setFollowing(followingData)
    } catch (error) {
      console.error(error)
    } finally {
      setLoaders((prevLoaders) => ({ ...prevLoaders, following: false }))
    }
  }

  useEffect(() => {
    getInitialUser(user)
    setSection('repos')
    getRepos(user)
    getFollowers(user)
    getFollowing(user)
  }, [user])

  return (
    <div className='grid min-h-screen grid-rows-[300px,1fr]'>
      <div className='h-full w-full bg-hero-bg bg-cover bg-center bg-no-repeat'>
        <Form setUser={setUser} />
      </div>
      <div className='h-full w-full'>
        <div className='relative mx-auto flex w-[80%] max-w-screen-xl flex-col items-center gap-8'>
          <div className='absolute top-0 h-[125px] w-[125px] min-w-[125] -translate-y-[50%] overflow-hidden'>
            {userData && (
              <img
                src={userData?.avatar_url}
                alt=''
                className='h-full w-full min-w-[125] flex-1 rounded-xl border-8 border-customNavyBlue'
              />
            )}
          </div>
          <div className='mt-[80px] grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-[repeat(4,auto)]'>
            <InfoCard
              title='Repositorios'
              contain={userData?.public_repos}
              name='repos'
              setSection={setSection}
              section={section == 'repos'}
            />
            <InfoCard
              title='Seguidores'
              contain={userData?.followers}
              name='followers'
              setSection={setSection}
              section={section == 'followers'}
            />
            <InfoCard
              title='Siguiendo'
              contain={userData?.following}
              name='following'
              setSection={setSection}
              section={section == 'following'}
            />
            <InfoCard title='Ubicación' contain={userData?.location} />
          </div>
        </div>
        <div className='mx-auto mt-16 w-[90%] max-w-screen-lg'>
          {section === 'repos' && <Repos repos={repos} loaders={loaders} />}
          {section === 'followers' && (
            <Followers
              user={user}
              followers={followers}
              loaders={loaders}
              setUser={setUser}
            />
          )}
          {section === 'following' && (
            <Following
              following={following}
              loaders={loaders}
              setUser={setUser}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default App
