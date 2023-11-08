function Button({ text, type, buttonIcon = '' }) {
  return (
    <button className={`btn btn-${type}`}>
      <span className="button-text">{text}</span>
      <span className="button-icon">{buttonIcon}</span>
    </button>
  )
}

export default Button
