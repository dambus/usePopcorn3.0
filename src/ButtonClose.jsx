import { IoMdCloseCircleOutline } from 'react-icons/io'

function ButtonClose({ clickAction }) {
  return (
    <button
      onClick={clickAction}
      className=" z-20 fixed top-1 right-1 rounded-full p-1 bg-white/20 text-white"
    >
      <IoMdCloseCircleOutline fontSize={28} />
    </button>
  )
}

export default ButtonClose
