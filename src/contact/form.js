import React from 'react';
import Header from '../common/components/header';


export default class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: '',
      alert: '',
    }
    this.onChange = this.onChange.bind(this);
    this.url = "https://www.briskforms.com/go/163e3ec754f10b5e604dac66ba7961bc";
  }

  onChange(fieldName) {
    return (event) => {
      this.setState({
        [fieldName]: event.target.value,
      })
    }
  }

  componentDidMount() {
    try {
      const url = new URL(window.location.href);
      this.setState({alert: url.searchParams.get("alert")});
    } catch(err) {}
  }

  render() {
    return (
      <>
      <Header
        text="Contact Me"
        subtitle="Have some questions or comments for me? Get in touch here!"
      />
      <section className="blog-post--preview typography">
        <p className="blog-post__text">Contact me via email at <a href="mailto:hello@madelyneriksen.com">hello@madelyneriksen.com</a>,
          through my <a href="https://github.com/madelyneriksen">Github account</a>, or use the form below! I'll get back to you as fast as I can.</p>
      </section>
      {this.state.alert &&
        <div className="alert alert--success" role="alert">{this.state.alert}</div>
      }
      <form
        className="form"
        action={this.url}
        method="POST">
        <label
          for="name"
          className="form__label">Your Name</label>
        <input
          className="form__input"
          type="text"
          name="name"
          placeholder="ex. Tony Stark"
          required
          onChange={this.onChange("name")} value={this.state.name} />
        <label
          for="email"
          className="form__label">Email Address</label>
        <input
          className="form__input"
          type="email"
          name="email"
          placeholder="ex. tony@stark.io"
          required
          onChange={this.onChange("email")}
          value={this.state.email} />
        <label
          for="message"
          className="form__label">Write Your Message</label>
        <textarea
          className="form__input"
          type="message"
          name="message"
          placeholder="ex. We're building a team..."
          rows="5"
          onChange={this.onChange("message")}
          value={this.state.message} />
        <button
          type="submit"
          className="button--red form__submit">SEND MESSAGE</button>
      </form>
      </>
    )
  }
}
