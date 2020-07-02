import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  private sumTransactions(type: 'income' | 'outcome'): number {
    return this.transactions
      .filter(transaction => transaction.type === type)
      .map(transaction => transaction.value)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  }

  public getBalance(): Balance {
    const balance: Balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    balance.income = this.sumTransactions('income');
    balance.outcome = this.sumTransactions('outcome');

    balance.total = balance.income - balance.outcome;

    return balance;
  }

  public create({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
