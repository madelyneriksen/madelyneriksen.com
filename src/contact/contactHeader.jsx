import React from 'react';
import Header from '../common/components/header';


const ContactHeader = () => (
  <>
    <Header
      text="Contact Me"
      subtitle="Have some questions or comments for me? Get in touch here!"
    />
    <section className="text-block--preview typography">
      <p className="text-block__content">
        Contact me via email at
        {' '}
        <a href="mailto:hello@madelyneriksen.com">hello@madelyneriksen.com</a>
        , through my
        {' '}
        <a href="https://github.com/madelyneriksen">Github account</a>
        , or use the form below! I will get back to you as fast as I can.
      </p>
    </section>
  </>
);

export default ContactHeader;
