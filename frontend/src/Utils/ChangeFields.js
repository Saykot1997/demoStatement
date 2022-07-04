const changeFields = (value, index, field, randomTransictions, setRandomTransictions) => {
    let newRandomTransactions = [...randomTransictions]
    newRandomTransactions[index][field] = value
    setRandomTransictions(newRandomTransactions)
}

export default changeFields