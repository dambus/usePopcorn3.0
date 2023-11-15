function Button({ text, type, buttonIcon = '', clickAction }) {
  return (
    <button className={`btn btn-${type} mt-4 flex gap-2`} onClick={clickAction}>
      <span className="button-text">{text}</span>
      <span className="button-icon">{buttonIcon}</span>
    </button>
  )
}

export default Button
