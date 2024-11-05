import PropTypes from 'prop-types'

function InfoCard({ title, contain, name, setSection = null, section }) {
  const handleClick = () => {
    if (!setSection || !contain) {
      return
    } else {
      setSection(name)
    }
  }

  return (
    <div
      className={`userInfo-card relative flex h-max w-full flex-wrap items-center overflow-hidden rounded-lg bg-customNavyBlue--dark p-4 text-xs shadow-md shadow-[#5548A3] ${section ? 'active' : null} ${!contain || title == 'Ubicación' ? null : 'cursor-pointer'}`}
      onClick={handleClick}
    >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <p className='border-r pr-4 font-semibold text-slate-500'>{title}</p>
      <p className='pl-4 font-semibold text-slate-300'>
        {!contain ? 'No disponible' : contain}
      </p>
    </div>
  )
}

export default InfoCard

InfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  contain: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  setSection: PropTypes.func,
  section: PropTypes.string
}
