import axios from "axios";
import { createContext, useEffect, useState, type ReactNode } from "react"

interface Transaction {
    id: number,
    description: string,
    type: 'income' | 'outcome',
    price: number,
    category: string,
    createdAt: string
}

interface TransactionsContextType {
    transactions: Transaction[]
}

interface TransactionsContextProviderProps {
    children: ReactNode
}


export const TransactionsContext = createContext({} as TransactionsContextType);

export function TransactionsContextProvider({ children }: TransactionsContextProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([])

    async function loadTransactions() {
        const response = await axios.get('http://localhost:3000/transactions');
        const data = await response.data;

        setTransactions(data);
    }

    useEffect(() => {
        loadTransactions();
    }, [])

    return (
        <TransactionsContext.Provider value={{ transactions }}>
            {children}
        </TransactionsContext.Provider>
    )
}
