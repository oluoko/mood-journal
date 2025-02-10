const EditResponseBar = ({ opacity, prompts }) => {
  return (
    <div className="border border-slate-400/30 md:mx-4 rounded-lg">
      <div
        className="m-1 md:m-2 px-1 md:px-2 py-2 md:py-4 rounded-lg"
        style={{ backgroundColor: opacity }}
      >
        <h2 className="text-[15px] md:text-xl">Prompts</h2>
      </div>
      <div className="m-1 md:m-2 px-1 md:px-2 py-2 md:py-4 rounded-lg">
        <ul>
          {prompts.map((prompt, index) => (
            <li key={prompt} className="py-2 border-t border-slate-400/30">
              <span className="text-sm w-full">
                {index + 1}. {prompt}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default EditResponseBar
