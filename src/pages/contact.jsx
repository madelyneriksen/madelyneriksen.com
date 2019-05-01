import React from 'react';
import Layout from '../common/layouts/main';
import Form from '../contact/form'


export default () => (
  <Layout
    title="Contact Me"
    description="Contact me for information on developing React.js or Python applications. I am currently looking for new opportinities or clients.">
      <div className="bg-white mv2" style={{gridArea: "content"}}>
        <Form />
      </div>
    </Layout>
  )
