import React from 'react'
import Form from '../components/Form' ;
import Table from '../components/Table';
import styles from "./home.module.css"
function Home() {
  return (
    <div className={styles.homeContainer}>
      <Form />
      <Table />
    </div>
  );
}

export default Home