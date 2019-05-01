import React from 'react';
import Header from '../common/components/header';
import { Link } from 'gatsby';
import Layout from '../common/layouts/main';


export default () => (
  <Layout title="404 Not Found">
    <Header text="Woah There!" subtitle="404 Page Not Found" />
    <section className="text-block--preview">
      <p>That's definitely a 404 (Page Not Found)! Double check the url, or head back to the homepage?</p>
      <br />
      <Link to="/" className="button--rose">HOME</Link>
    </section>
  </Layout>
)
