import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUserGroup,
  faLocationDot,
  faBook
} from '@fortawesome/free-solid-svg-icons'

function UsersCards({ userInfo, setUser }) {
  return (
    <div
      key={userInfo.id}
      className='mx-auto grid w-[90%] grid-rows-[auto,auto,auto,auto] gap-4 rounded-lg bg-gradient-to-br from-[#111729] from-25% to-[#1D1C48] py-4 shadow-md shadow-[#282052] sm:w-full'
      onClick={() => setUser(userInfo.login)}
      data-aos='fade-up'
    >
      <div>
        <h2 className='text-center text-slate-200'>{userInfo.name}</h2>
        <h2 className='text-center font-semibold text-slate-400'>
          @{userInfo.login}
        </h2>
      </div>

      <img
        src={userInfo.avatar_url}
        alt=''
        className='mx-auto h-[100px] w-[100px] rounded-full'
      />

      <p className='mx-auto w-[90%] overflow-hidden text-wrap text-center italic text-slate-400'>
        {userInfo.bio}
      </p>

      <ul className='mx-auto w-[80%] text-sm text-slate-300'>
        <li>
          <FontAwesomeIcon
            icon={faUserGroup}
            className='mr-2 w-4 text-slate-400'
          />
          Following: <span className='font-bold'>{userInfo.following}</span>{' '}
          Followers: <span className='font-bold'>{userInfo.followers}</span>
        </li>
        {userInfo.location && (
          <li>
            <FontAwesomeIcon
              icon={faLocationDot}
              className='mr-2 w-4 text-slate-400'
            />
            {userInfo.location}
          </li>
        )}
        <li>
          <FontAwesomeIcon icon={faBook} className='mr-2 w-4 text-slate-400' />
          Public repositories{' '}
          <span className='font-bold'>{userInfo.public_repos}</span>
        </li>
      </ul>
    </div>
  )
}

export default UsersCards

UsersCards.propTypes = {
  userInfo: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
  setSection: PropTypes.func
}
