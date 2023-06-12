import styles from '@/styles/Home.module.css'
import { useRouter } from 'next/router';

function ClientProjectPage() {
  const router = useRouter();
  
  console.log('inside specific project',router.pathname); // /portfolio/[projectId]
  console.log(router.query); // {projectId: "asdasdasd" }
  return (
    <>
      <main className={styles.main}>
        <h1>The project page for a specific Project for A SELECTED client</h1>
      </main>
    </>
  )
}

export default ClientProjectPage;