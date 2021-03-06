import React from 'react';
import { Link } from 'gatsby';
import Header from '../common/components/header';
import Layout from '../common/layouts/main';


export default () => (
  <Layout title="404 Not Found">
    <Header text="Woah There!" subtitle="404 Page Not Found" />
    <section className="text-block--preview">
      <p>
        That&#39;s definitely a 404 (Page Not Found)!
        Double check the url, or head back to the homepage?
      </p>
      <br />
      <Link to="/" className="button--rose">HOME</Link>
    </section>
  </Layout>
);
