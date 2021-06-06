class Person {
  constructor(id, name, expensesList) {
    this.id = id;
    this.name = name;
    this.expensesList = [];
  }
  addExpense(expense) {
    this.expensesList.push(expense);
  }
}

class Expense {
  constructor(id, item, income, expense) {
    this.id = id;
    this.item = item;
    this.income = income;
    this.expense = expense;
  }
}

