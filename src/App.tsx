import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { Transactions } from "./pages/Transactions";
import { TransactionsContextProvider } from "./contexts/TransactionsContext";

export function App() {
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <TransactionsContextProvider>
          <Transactions />
        </TransactionsContextProvider>
        <GlobalStyle />
      </ThemeProvider>
    </>
  )
}