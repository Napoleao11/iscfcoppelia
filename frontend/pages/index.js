import Head from 'next/head';
import Link from 'next/link';

import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { x } from '../lib/posts';


export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Francis Napoleon IV]</p>
        <p>
          (WOO BACK BABY)
        </p>
      </section>
      <h1>Coppelia Dashboard</h1>
      <Link href="/posts/first-post">Open page</Link>
      
      

    </Layout>
  );
}