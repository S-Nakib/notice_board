import type { AppProps } from "next/app";
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import "../styles/globals.scss";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
            retry: false
        }
    }
});

export const LoginContext = React.createContext({
    isLoggedIn: false,
    setIsLoggedIn: (() => {}) as React.Dispatch<React.SetStateAction<boolean>>
});

function MyApp({ Component, pageProps }: AppProps) {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    return (
        <QueryClientProvider client={queryClient}>
            <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
                <Header></Header>
                <main>
                    <Component {...pageProps} />
                </main>
                <Footer></Footer>
            </LoginContext.Provider>
        </QueryClientProvider>
    );
}

export default MyApp;
