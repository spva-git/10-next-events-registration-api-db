import Layout from "@/components/layout/layout";
import "@/styles/globals.css";
import { NotificationContextProvider } from '../store/notification-context';

export default function App({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
}
