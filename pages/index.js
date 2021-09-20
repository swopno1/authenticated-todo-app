import Head from 'next/head'
import Navbar from '../components/Navbar';
import { table, minifyRecords } from './api/utils/Airtable';

export default function Home({ initialTodos }) {
  console.log(initialTodos);
  return (
    <div>
      <Head>
        <title>Todo App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        <h1>Todo App</h1>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const todos = await table.select({}).firstPage();

    return {
      props: {
        initialTodos: minifyRecords(todos)
      }
    }
  } catch (err) {
    console.log(err);
    return {
      props: {
        err: "Something went wrong"
      }
    }
  }
}