const GenerateRandomTranjections = (startStatementDate, endStatementDate, transactions, transactionQuantity, initialBalance) => {

    function getDatesInRange(startDate, endDate) {
        const date = new Date(startDate.getTime());

        date.setDate(date.getDate() + 1);

        const dates = [];

        while (date < endDate) {
            dates.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }

        return dates;
    }

    const d1 = new Date(startStatementDate);
    const d2 = new Date(endStatementDate);

    let allDates = getDatesInRange(d1, d2)

    let randomTransictionsDates = [];

    for (let i = 0; i < transactionQuantity; i++) {
        randomTransictionsDates.push(allDates[Math.floor(Math.random() * allDates.length)]);
    }

    // sort randomTransictionsDate by date
    randomTransictionsDates.sort((a, b) => {
        let dateA = new Date(a);
        let dateB = new Date(b);
        return dateA - dateB;
    })

    // randomTransictions

    let randomTransictions = [];

    let interTotalWithdrawal = 0.00;
    let interTotalDeposit = 0.00;

    for (let i = 0; i < transactionQuantity; i++) {

        let chequeWithdrawalOrDepositTime = [11, 12, 13, 14, 15];

        let randomParticular = transactions[Math.floor(Math.random() * transactions.length)].transactionName;
        let randomBranchCode = transactions[transactions.findIndex((item) => item.transactionName === randomParticular)].branch;
        let randomTransictionsDate = randomTransictionsDates[i];

        let randomTransictionsTime = ""
        let findRandomParticular = transactions.findIndex((item) => item.transactionName === randomParticular);
        let randomTransictionsMunite = Math.floor(Math.random() * 60);
        let randomWithdrawal = "";
        let randomDeposit = "";

        // create object if has limit
        if (transactions[findRandomParticular].limit > 0) {

            let alradyExistedObjectsCount = 0

            randomTransictions.forEach((item, index) => {
                if (item.particular === transactions[findRandomParticular].transactionName) {
                    alradyExistedObjectsCount = alradyExistedObjectsCount + 1
                }
            })

            // if limit alrady exist
            if (transactions[findRandomParticular].limit > alradyExistedObjectsCount) {

                // set transection time
                if (transactions[findRandomParticular].transactionMethod === "cheque" || transactions[findRandomParticular].transactionMethod === "cash") {

                    randomTransictionsTime = chequeWithdrawalOrDepositTime[Math.floor(Math.random() * chequeWithdrawalOrDepositTime.length)];

                } else {

                    randomTransictionsTime = Math.floor(Math.random() * 24);
                }

                if (randomTransictionsTime.toString().length === 1) {
                    randomTransictionsTime = "0" + randomTransictionsTime;
                }

                if (randomTransictionsMunite.toString().length === 1) {
                    randomTransictionsMunite = "0" + randomTransictionsMunite;
                }

                // set withdrawal and deposit

                if (transactions[findRandomParticular].transactionType === "credit") {

                    randomWithdrawal = 0.00;
                    randomDeposit = parseFloat(transactions[findRandomParticular].amount).toFixed(2)

                } else {

                    randomWithdrawal = parseFloat(transactions[findRandomParticular].amount).toFixed(2);
                    randomDeposit = 0.00;
                }

                // create randomTransictions object
                let randomTransictionsObject = {
                    particular: randomParticular,
                    branchCode: randomBranchCode,
                    date: "",
                    time: randomTransictionsTime + ":" + randomTransictionsMunite,
                    withdrawal: randomWithdrawal,
                    deposit: randomDeposit,
                    type: transactions[findRandomParticular].transactionType,
                    method: transactions[findRandomParticular].transactionMethod,
                }

                if (transactions[findRandomParticular].ref) {
                    randomTransictionsObject.ref = transactions[findRandomParticular].ref
                }

                if (transactions[findRandomParticular].cheque) {
                    randomTransictionsObject.cheque = transactions[findRandomParticular].cheque
                }

                if (transactions[findRandomParticular].transactionDetails) {
                    randomTransictionsObject.transactionDetails = transactions[findRandomParticular].transactionDetails
                }

                // set randomTransictions date
                if (randomTransictionsDate.getDate().toString().length === 1) {
                    randomTransictionsObject.date = "0" + randomTransictionsDate.getDate();
                } else {
                    randomTransictionsObject.date = randomTransictionsDate.getDate();
                }

                if ((randomTransictionsDate.getMonth() + 1).toString().length === 1) {
                    randomTransictionsObject.date += "/0" + (randomTransictionsDate.getMonth() + 1);
                } else {
                    randomTransictionsObject.date += "/" + (randomTransictionsDate.getMonth() + 1);
                }
                randomTransictionsObject.date += "/" + randomTransictionsDate.getFullYear();


                //  set interTotalWithdrawal and interTotalDeposit
                if (transactions[findRandomParticular].transactionType === "credit") {

                    interTotalDeposit = (parseFloat(interTotalDeposit) + parseFloat(randomDeposit)).toFixed(2)

                    if (i === 0) {

                        randomTransictionsObject.balance = (parseFloat(initialBalance) + parseFloat(randomDeposit)).toFixed(2);

                    } else {

                        randomTransictionsObject.balance = (parseFloat(randomTransictions[randomTransictions.length - 1].balance) + parseFloat(randomDeposit)).toFixed(2);
                    }
                } else {
                    interTotalWithdrawal = (parseFloat(interTotalWithdrawal) + parseFloat(randomWithdrawal)).toFixed(2)

                    if (i === 0) {

                        randomTransictionsObject.balance = (parseFloat(initialBalance) - parseFloat(randomWithdrawal)).toFixed(2);

                    } else {

                        randomTransictionsObject.balance = (parseFloat(randomTransictions[randomTransictions.length - 1].balance) - parseFloat(randomWithdrawal)).toFixed(2);
                    }
                }

                randomTransictions.push(randomTransictionsObject);
            } else {
                i--
            }

        } else {

            // set transection time
            if (transactions[findRandomParticular].transactionMethod === "cheque" || transactions[findRandomParticular].transactionMethod === "cash") {

                randomTransictionsTime = chequeWithdrawalOrDepositTime[Math.floor(Math.random() * chequeWithdrawalOrDepositTime.length)];

            } else {

                randomTransictionsTime = Math.floor(Math.random() * 24);
            }

            if (randomTransictionsTime.toString().length === 1) {
                randomTransictionsTime = "0" + randomTransictionsTime;
            }

            if (randomTransictionsMunite.toString().length === 1) {
                randomTransictionsMunite = "0" + randomTransictionsMunite;
            }

            // set withdrawal and deposit

            if (transactions[findRandomParticular].transactionType === "credit") {

                randomWithdrawal = 0.00;
                randomDeposit = parseFloat(transactions[findRandomParticular].amount).toFixed(2)

            } else {

                randomWithdrawal = parseFloat(transactions[findRandomParticular].amount).toFixed(2);
                randomDeposit = 0.00;
            }


            // create randomTransictions object
            let randomTransictionsObject = {
                particular: randomParticular,
                branchCode: randomBranchCode,
                date: "",
                time: randomTransictionsTime + ":" + randomTransictionsMunite,
                withdrawal: randomWithdrawal,
                deposit: randomDeposit,
                type: transactions[findRandomParticular].transactionType,
                method: transactions[findRandomParticular].transactionMethod,

            }

            if (transactions[findRandomParticular].ref) {
                randomTransictionsObject.ref = transactions[findRandomParticular].ref
            }

            if (transactions[findRandomParticular].cheque) {
                randomTransictionsObject.cheque = transactions[findRandomParticular].cheque
            }

            if (transactions[findRandomParticular].transactionDetails) {
                randomTransictionsObject.transactionDetails = transactions[findRandomParticular].transactionDetails
            }

            // set randomTransictions date
            if (randomTransictionsDate.getDate().toString().length === 1) {
                randomTransictionsObject.date = "0" + randomTransictionsDate.getDate();
            } else {
                randomTransictionsObject.date = randomTransictionsDate.getDate();
            }

            if ((randomTransictionsDate.getMonth() + 1).toString().length === 1) {
                randomTransictionsObject.date += "/0" + (randomTransictionsDate.getMonth() + 1);
            } else {
                randomTransictionsObject.date += "/" + (randomTransictionsDate.getMonth() + 1);
            }
            randomTransictionsObject.date += "/" + randomTransictionsDate.getFullYear();


            //  set interTotalWithdrawal and interTotalDeposit
            if (transactions[findRandomParticular].transactionType === "credit") {

                interTotalDeposit = (parseFloat(interTotalDeposit) + parseFloat(randomDeposit)).toFixed(2)

                if (i === 0) {

                    randomTransictionsObject.balance = (parseFloat(initialBalance) + parseFloat(randomDeposit)).toFixed(2);

                } else {

                    randomTransictionsObject.balance = (parseFloat(randomTransictions[randomTransictions.length - 1].balance) + parseFloat(randomDeposit)).toFixed(2);
                }
            } else {


                interTotalWithdrawal = (parseFloat(interTotalWithdrawal) + parseFloat(randomWithdrawal)).toFixed(2)

                if (i === 0) {

                    randomTransictionsObject.balance = (parseFloat(initialBalance) - parseFloat(randomWithdrawal)).toFixed(2);

                } else {

                    randomTransictionsObject.balance = (parseFloat(randomTransictions[randomTransictions.length - 1].balance) - parseFloat(randomWithdrawal)).toFixed(2);
                }
            }

            randomTransictions.push(randomTransictionsObject);

        }
    }

    return {
        RandomTransictions: randomTransictions,
        TotalWithdrawal: interTotalWithdrawal,
        TotalDeposit: interTotalDeposit,
    }
}


export default GenerateRandomTranjections;