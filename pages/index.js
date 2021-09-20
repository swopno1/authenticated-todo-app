import Head from 'next/head'
import Navbar from '../components/Navbar';
import Todo from '../components/Todo';
import { table, minifyRecords } from './api/utils/Airtable';
import { TodosContext } from '../contexts/TodosContext';
import { useEffect, useContext } from 'react';

export default function Home({ initialTodos }) {
  const {todos, setTodos} = useContext(TodosContext);
  useEffect(() => {
    setTodos(initialTodos);
  }, []);
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
        <ul>
          {todos && todos.map((todo) => <Todo key={todo.id} todo={todo} />)}
        </ul>
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