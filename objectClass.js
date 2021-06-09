class Person {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.expensesList = [];
  }
  addExpense(expense) {
    this.expensesList.push(expense);
  }
}

class Expense {
  constructor(id, item, count, income, expense) {
    this.id = id;
    this.item = item;
    this.count=count;
    this.income = income;
    this.expense = expense;
  }
}

