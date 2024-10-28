import PropTypes from 'prop-types'
import usePagination from '../hooks/usePagination'
import Pagination from '../components/Pagination'
import RepositorieCard from '../components/RepositoriesCards'
import Loader from '../components/Loader'

function Repos({ repos, loaders }) {
  const { page, setCurrentPage, itemsPerPage, currentPage } =
    usePagination(repos)

  if (loaders.repos) {
    return <Loader />
  }

  return (
    <>
      <div className='mx-auto grid w-[100%] grid-cols-1 gap-3 md:grid-cols-2'>
        {page.map((repo) => (
          <RepositorieCard repositorie={repo} key={repo.id} />
        ))}
        <Pagination
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          data={repos}
        />
      </div>
    </>
  )
}

export default Repos

Repos.propTypes = {
  repos: PropTypes.array.isRequired,
  loaders: PropTypes.object.isRequired
}
