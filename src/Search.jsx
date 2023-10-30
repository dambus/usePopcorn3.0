function Search({ query, setQuery }) {
  return (
    <div>
      <input
        type="text"
        placeholder="search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  )
}

export default Search
