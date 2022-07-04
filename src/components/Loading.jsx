const Spinner = () => {
  return (
    <div className="spinner">
      <div className="bounce1"></div>
      <div className="bounce2"></div>
      <div className="bounce3"></div>
    </div>
  )
}

const Loading = () => {
  return (
    <div className="absolute w-full h-full top-0 left-0 right-0 bottom-0 z-20 flex justify-center items-center bg-black/50">
      <Spinner />
    </div>
  )
}

export default Loading
