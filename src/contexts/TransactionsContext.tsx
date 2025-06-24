import { useEffect, useState, useCallback, type ReactNode } from "react"
import { createContext } from "use-context-selector";
import { api } from "../lib/axios";

interface Transaction {
    id: number,
    description: string,
    type: 'income' | 'outcome',
    price: number,
    category: string,
    createdAt: string
}

interface CreateTransactionInput {
    description: string,
    price: number,
    category: string,
    type: 'income' | 'outcome'
}

interface TransactionsContextType {
    transactions: Transaction[],
    fetchTransactions: (query?: string) => Promise<void>,
    createTransaction: (data: CreateTransactionInput) => Promise<void>
}

interface TransactionsContextProviderProps {
    children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionsContextType);

export function TransactionsContextProvider({ children }: TransactionsContextProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([])

    const fetchTransactions = useCallback(async (query?: string) => {
        const response = await api.get('transactions', {
            params: {
                q: query,
                _sort: 'createdAt',
                _order: 'desc'
            }
        });

        setTransactions(response.data);
    }, [])

    const createTransaction = useCallback(async ({ description, price, category, type }: CreateTransactionInput) => {
        const response = await api.post('transactions', {
            description,
            price,
            category,
            type,
            createdAt: new Date(),
        })
        setTransactions(state => [response.data, ...state]);
    }, [])

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions])

    return (
        <TransactionsContext.Provider value={{ transactions, fetchTransactions, createTransaction }}>
            {children}
        </TransactionsContext.Provider>
    )
}
