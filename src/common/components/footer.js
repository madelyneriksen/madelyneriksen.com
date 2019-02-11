import React from 'react';
import { Link } from 'gatsby';


export default (props) => (
  <footer className="footer">
    <section className="footer__links">
      <a
        className="footer__link"
        href="https://github.com/madelyneriksen">Github</a>
      <a
        className="footer__link"
        href="/rss.xml">RSS Feed</a>
    </section>
    <section className="footer__links">
      <p className="footer__link">Created with <span role="img" aria-label="magic">✨🌈</span> and React.</p>
      <p className="footer__link">Copyright 2018-2019 Madelyn Eriksen</p>
    </section>
    <section className="footer__links">
      <Link
        to="contact"
        className="footer__link">Contact Me</Link>
      <Link
        to="about"
        className="footer__link">About Me</Link>
    </section>
  </footer>
)
