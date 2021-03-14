import type { AppProps } from "next/app";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Header></Header>
            <main>
                <Component {...pageProps} />
            </main>
            <Footer></Footer>
        </>
    );
}

export default MyApp;
