const Form = ({nameValue, numberValue, handleName, handleNumber, handleSubmit}) => {
    return (
        <form>
            <div>name: <input value={nameValue} onChange={handleName} /></div>
            <div>number: <input value={numberValue} onChange={handleNumber} /></div>
            <div>
            <button type="submit" onClick={handleSubmit}>add</button>
            </div>
        </form>
    )
}

export default Form