import PropTypes from 'prop-types'
import { useEffect } from 'react'

export default function Pagination({
  setCurrentPage,
  itemsPerPage,
  currentPage,
  data
}) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage])

  if (data.length == 0) {
    return null
  }

  return (
    <div
      className='mt-8 flex items-center justify-center gap-3 md:col-span-2'
      data-aos='fade-up'
    >
      <button
        className={`${currentPage <= 1 ? 'border-slate-500 text-slate-500' : 'border-slate-300 text-white'} flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border p-3 text-center text-sm`}
        disabled={currentPage <= 1}
        onClick={() => setCurrentPage((prevCurrentPage) => prevCurrentPage - 1)}
      >
        {'<'}
      </button>
      <button
        className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-slate-300 p-3 text-center text-sm ${currentPage >= Math.ceil(data.length / itemsPerPage) ? 'border-slate-500 text-slate-500' : 'border-slate-300 text-white'}`}
        disabled={currentPage >= Math.ceil(data.length / itemsPerPage)}
        onClick={() => setCurrentPage((prevCurrentPage) => prevCurrentPage + 1)}
      >
        {'>'}
      </button>
    </div>
  )
}

Pagination.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired
}
