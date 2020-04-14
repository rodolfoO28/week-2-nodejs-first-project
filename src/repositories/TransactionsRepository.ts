import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const totalIncome = this.transactions.reduce((total, transaction) => {
      const { value } = transaction;

      return transaction.type === 'income' ? total + value : total;
    }, 0);

    const totalOutcome = this.transactions.reduce((total, transaction) => {
      const { value } = transaction;

      return transaction.type === 'outcome' ? total + value : total;
    }, 0);

    const total = totalIncome - totalOutcome;

    const balance: Balance = {
      income: totalIncome,
      outcome: totalOutcome,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transacion = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(transacion);

    return transacion;
  }
}

export default TransactionsRepository;
