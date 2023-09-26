const Filter = ({filterValue, handleSearch}) => {
    return (
        <p>filter shown with <input value={filterValue} onChange={handleSearch} /></p>
    )
}

export default Filter