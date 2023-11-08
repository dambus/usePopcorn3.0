function Button({ text, type, buttonIcon = '', clickAction }) {
  return (
    <button className={`btn btn-${type}`} onClick={clickAction}>
      <span className="button-text">{text}</span>
      <span className="button-icon">{buttonIcon}</span>
    </button>
  )
}

export default Button
