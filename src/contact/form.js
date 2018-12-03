import React from 'react';
import Container from '../common/containers/text-container.js';
import buttonClasses from '../common/buttons/button-classes.js';
import 'tachyons';


export default () => (
  <div className="pa2">
    <h1 className="sans-serif tc">Contact Me</h1>
    <Container>
      <p className="mw6 center">Have some questions or want to work with me? Or maybe you'd just like to say hello? Send me a message here! I'm interested in hearing what you have to say.</p>
    </Container>
    <form className="w-100 center mw6">
      <label for="name" className="sans-serif f4">Your Name</label>
      <input className="bg-white ba b--mid-gray br0 pa2 w-100 sans-serif mid-gray mt2 mb4" type="text" name="name" placeholder="Your Name" required />
      <label for="email" className="sans-serif f4">Email Address</label>
      <input className="bg-white ba b--mid-gray br0 pa2 w-100 sans-serif mid-gray mt2 mb4" type="email" name="email" placeholder="Your Email" required />
      <label for="message" className="sans-serif f4">Write Your Message</label>
      <textarea className="bg-white ba b--mid-gray br0 pa2 w-100 sans-serif mid-gray mt2 mb4"
        type="message" name="message" placeholder="Questions, comments, concerns..." rows="5" />
      <input type="submit" name="submit" value="SUBMIT" className={buttonClasses+" db bg-white sans-serif center mb3"}/>
    </form>
  </div>
)
