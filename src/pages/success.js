import React from 'react';
import Container from '../common/containers/text-container.js';
import { Link } from 'gatsby';
import Layout from '../common/layouts/main.js';


export default () => (
  <Layout>
    <div className="bg-white mv2 flex items-center justify-center" style={{gridArea: "content"}}>
      <div className="tc">
        <h1 className="sans-serif">Success!</h1>
        <Container>
          <p>Thanks for reaching out! I'll reply within three business days.</p>
        </Container>
        <Link to="/" className="button--red">HOME</Link>
      </div>
    </div>
  </Layout>
)
