import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { searchUsers } from '../api/fetchData'
import SearchIcon from '/public/assets/Search.svg'

function Form({ setUser }) {
  const [query, setQuery] = useState('')
  const [usersFound, setUsersFound] = useState(null)

  const fetchUsers = async (query) => {
    const data = await searchUsers(query)

    const { items } = data

    setUsersFound(items)
  }

  useEffect(() => {
    if (!query) {
      setUsersFound(null)
      return
    }

    const debounce = setTimeout(() => {
      fetchUsers(query)
    }, 300)

    return () => clearTimeout(debounce)
  }, [query])

  const handleChange = (e) => {
    setQuery(e.target.value)
  }

  return (
    <>
      <form
        className='relative mx-auto mt-16 flex h-14 w-[70%] max-w-screen-sm items-center gap-2 rounded-xl bg-customNavyBlue px-4 shadow-md shadow-[#5548A3]'
        onSubmit={(e) => e.preventDefault()}
      >
        <button className='' type='submit'>
          <img src={SearchIcon} />
        </button>
        <input
          type='text'
          name=''
          value={query}
          id=''
          className='h-full w-full bg-transparent text-slate-300 outline-none placeholder:text-slate-400'
          placeholder='Nombre de usuario '
          onChange={(e) => handleChange(e)}
        />
        <div className='absolute left-0 top-16 z-[200] mx-auto mt-4 flex h-max w-full max-w-screen-sm items-center gap-2 rounded-xl bg-customNavyBlue--dark pl-8'>
          <ul className={`${usersFound ? 'space-y-4 py-8' : 'py-0'}`}>
            {usersFound &&
              usersFound
                .map((user) => (
                  <li
                    key={user.login}
                    className='flex cursor-pointer items-center gap-4 text-slate-300'
                    onClick={() => {
                      setUser(user.login)
                      setUsersFound(null)
                      setQuery('')
                    }}
                  >
                    <img
                      src={user.avatar_url}
                      alt=''
                      className='h-10 w-10 rounded-lg'
                    />
                    {user.login}
                  </li>
                ))
                .slice(0, 10)}
          </ul>
        </div>
      </form>
    </>
  )
}

export default Form

Form.propTypes = {
  setUser: PropTypes.func.isRequired
}
