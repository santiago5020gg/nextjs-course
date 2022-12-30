import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import PlanProvider from "../contexts/plans";
import PeriodProvider from "../contexts/period";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <PlanProvider>
        <PeriodProvider>
          <Component {...pageProps} />
        </PeriodProvider>
      </PlanProvider>
    </Layout>
  );
}

export default MyApp;
