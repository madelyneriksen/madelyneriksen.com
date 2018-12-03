import React from 'react';
import Container from '../common/containers/text-container.js';
import buttonClasses from '../common/buttons/button-classes.js';
import { Link } from 'gatsby';
import 'tachyons';
import Layout from '../common/layouts/main.js';


export default () => (
  <Layout>
    <div className="bg-white mv2 flex items-center justify-center" style={{gridArea: "content"}}>
      <div className="tc">
        <h1 className="sans-serif">Woah There!</h1>
        <Container>
          <p>That's definitely a 404 (Page Not Found)! Double check the url, or maybe head back to the homepage?</p>
        </Container>
        <Link to="/" className={buttonClasses+" dib"}>HOME</Link>
      </div>
    </div>
  </Layout>
)
