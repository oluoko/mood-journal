const EntryCard = ({ entry }) => {
  return (
    <div>
      <h1>{entry.title}</h1>
      <p>Entry Id: {entry.id}</p>
      <p>{entry.content}</p>
    </div>
  )
}

export default EntryCard
