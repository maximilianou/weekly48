import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState } from 'react';

type Product {
  id: String!,
  name: String,
  description: String,
  image: String,
  price: Number,
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Next!</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/products.png" type="image/png" />
      </Head>

      <main className={styles.main}>

        <h1 className={styles.title}>
          Hi!, Next!
        </h1>

      </main>

      <footer className={styles.footer}>
          <span className={styles.logo}>
            <Image src="/products.svg" alt="simpledoers" width={102} height={80} />
          </span>
      </footer>
    </div>
  )
}
