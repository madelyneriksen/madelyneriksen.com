import React from 'react';
import 'tachyons';
import Layout from '../common/layouts/main.js';
import Form from '../contact/form.js'


export default () => (
    <Layout>
      <div className="bg-white mv2" style={{gridArea: "content"}}>
        <Form />
      </div>
    </Layout>
  )
