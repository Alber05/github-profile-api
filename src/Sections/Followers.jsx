import PropTypes from 'prop-types'
import usePagination from '../hooks/usePagination'
import UsersCards from '../components/UsersCards'
import Pagination from '../components/Pagination'
import Loader from '../components/Loader'

function Followers({ followers, loaders, setUser }) {
  const { page, setCurrentPage, itemsPerPage, currentPage } =
    usePagination(followers)

  if (loaders.following) {
    return <Loader />
  }
  return (
    <>
      <div className='mx-auto grid w-full grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3'>
        {page.map((follower) => (
          <UsersCards
            key={follower.login}
            userInfo={follower}
            setUser={setUser}
          />
        ))}
      </div>
      <Pagination
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        data={followers}
      />
    </>
  )
}

export default Followers

Followers.propTypes = {
  followers: PropTypes.string.isRequired,
  loaders: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
  setSection: PropTypes.func
}
