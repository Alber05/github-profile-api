import PropTypes from 'prop-types'
import StartIcon from '../../public/assets/Star.svg'
import NestingIcon from '../../public/assets/Nesting.svg'
import ChieldIcon from '../../public/assets/Chield_alt.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons'

function RepositorieCard({ repositorie }) {
  const getLastUpdated = (date) => {
    const updatedDate = new Date(date)
    const currentDate = new Date()

    const differenceInMilliseconds = currentDate - updatedDate

    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24)

    const pastDays = Math.floor(differenceInDays)

    return pastDays
  }

  return (
    <article
      className='grid grid-rows-[auto,auto,auto] gap-4 overflow-hidden rounded-lg bg-gradient-to-br from-[#111729] from-25% to-[#1D1C48] px-6 py-4 shadow-md shadow-[#282052]'
      data-aos='fade-up'
    >
      <header>
        <h2 className='font text-lg font-semibold text-slate-300'>
          <a
            href={repositorie.html_url}
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-slate-100 hover:underline'
          >
            <FontAwesomeIcon
              icon={faBook}
              className='mr-2 w-4 text-slate-400'
            />
            {repositorie.name}
          </a>
        </h2>
      </header>
      <section>
        <p className='text-sm font-semibold text-slate-400'>
          {repositorie?.description && repositorie?.description.trim()}
        </p>
      </section>
      <footer>
        <ul className='flex gap-2'>
          {repositorie.license && (
            <li className='0 flex items-center gap-1 text-slate-400'>
              <img src={ChieldIcon} alt='' />{' '}
              <span className='text-slate-400'>
                {repositorie.license.name.split(' ')[0]}
              </span>
            </li>
          )}

          <li className='flex items-center gap-1 text-slate-400'>
            <img src={NestingIcon} alt='' />
            <span className='text-slate-400'>{repositorie.forks}</span>
          </li>
          <li className='flex items-center gap-1 text-slate-400'>
            <img src={StartIcon} alt='' />
            <span className='text-slate-400'>
              {repositorie.stargazers_count}
            </span>
          </li>
          <li className='ml-4 flex items-center gap-1 text-xs text-slate-400'>
            Actualizado hace {getLastUpdated(repositorie.updated_at)} días
          </li>
        </ul>
      </footer>
    </article>
  )
}

export default RepositorieCard

RepositorieCard.propTypes = {
  repositorie: PropTypes.object.isRequired
}
