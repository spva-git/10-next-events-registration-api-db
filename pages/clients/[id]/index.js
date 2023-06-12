import styles from '@/styles/Home.module.css'
import { useRouter } from 'next/router';

function ClientProjectPage() {
    const router = useRouter();

    console.log('here',router.pathname); 
    console.log('there',router.query); 

    function loadProjectHandler() {
      //load data
      router.push('client/max')

    }
  return (
    <>
      <main className={styles.main}>
        <h1>Hello The Project list page of given Clients Page</h1>
        <button onClick={loadProjectHandler}>Load project A</button>
      </main>
    </>
  )
}

export default ClientProjectPage;