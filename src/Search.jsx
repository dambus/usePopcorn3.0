function Search({ query, setQuery }) {
  return (
    <div className="search-module">
      <input
        className="search-input"
        type="text"
        placeholder="Type to search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  )
}

export default Search
