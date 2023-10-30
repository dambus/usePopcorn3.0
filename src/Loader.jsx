import logo from './assets/img/popcornlogo.svg'
function Loader() {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <div className="spinner-logo">
        <img src={logo} alt="usePop logo" />
      </div>
    </div>
  )
}

export default Loader
