import React from 'react';
import Container from '../common/containers/text-container.js';
import buttonClasses from '../common/buttons/button-classes.js';
import { Link } from 'gatsby';
import Layout from '../common/layouts/main.js';


export default () => (
  <Layout>
    <div style={{gridArea: "content"}}>
      <div>
        <h1>Woah There!</h1>
        <Container>
          <p>That's definitely a 404 (Page Not Found)! Double check the url, or maybe head back to the homepage?</p>
        </Container>
        <Link to="/" className={buttonClasses+" dib"}>HOME</Link>
      </div>
    </div>
  </Layout>
)
