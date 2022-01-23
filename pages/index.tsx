import Head from "next/head";
import Link from "next/link";
import Date from "../components/date";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import { GetStaticProps } from "next";

export default function Home({
  allPostsData,
}: {
  allPostsData: Array<{ id: string; date: string; title: string }>;
}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      {/* Add this <section> tag below the existing <section> tag */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

// NOTES: different ways of rendering an app
//
// - to use SSG you need to export 'getServerSideProps' func from a page
//
// - to use Static Generation you need to export 'getStaticProps' from a page
//
// - or, clientside rendering: you can make client do all the rendering by
// fetching data from within then client app.
// using something like swr, react-query etc.

// NOTES: about Server-Side Rendering (SSG)
//
// for pre-rendering a SSG page on every request,
// we need todo all data fetching/population work in the
// function 'getServerSideProps'.
//
// - this function can only be exported from a page
//
// - it is called with a 'context' parameter which contains
// request specific params

// runs at build time (in production)
//
// important points:
//
// - because it is meant to be run at build time, in 'getStaticProps',
// you *cannot* use data that is only avail during request time (things like
// query params, http headers)
//
// - getStaticProps can only be exported from a *page*. that is because
// react needs to have all required data before the page is rendered
export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();

  // by returning this stuff inside props object, the blog
  // posts will be passed to the Home component as a prop
  return {
    props: {
      allPostsData,
    },
  };
};
