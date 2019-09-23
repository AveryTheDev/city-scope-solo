import teleport from '../../../teleport';

export const fetchExpenses = async urbanScores => {
    let expenses = [];

    const fetchData = async urbanScores => {
          const chosenCity = urbanScores;

          let cityDetails = await teleport.get(chosenCity);
          cityDetails = cityDetails.data["_links"]["ua:details"]["href"];

          let cityExpenses = await teleport.get(cityDetails);
          cityExpenses = cityExpenses.data.categories.find(
            category => category.id.toUpperCase() === "COST-OF-LIVING"
          );

          if(cityExpenses) {

            const expensesList = cityExpenses.data.filter(
              x => x.id !== "CONSUMER-PRICE-INDEX-TELESCORE"
            );

            return expensesList;
          }
          else return;
    }

    const setExpenseArray = async array => {
           const expensesList = array;
           let expensesArray = [];

           const cityItems = expensesList.map(x => x.label);
           const cityCost = expensesList.map(x => x.currency_dollar_value);

            let expenseFormat = {
                item: "",
                cost: 0
            };

           for (let i = 0; i < cityItems.length; i++) {
            let expenseData = Object.create(expenseFormat)
             expenseData.item = cityItems[i];
             expenseData.cost = cityCost[i];

             expensesArray.push(expenseData);
           }

           return expensesArray;
    }   

    expenses = await fetchData(urbanScores);
    expenses = await setExpenseArray(expenses);
    return expenses;
}