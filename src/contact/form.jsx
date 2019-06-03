import React from 'react';


const encode = (data) => {
  // Url encodes an object.
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};


export default class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: '',
      alert: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(fieldName) {
    return (event) => {
      this.setState({
        [fieldName]: event.target.value,
      });
    };
  }

  onSubmit(event) {
    event.preventDefault();
    fetch("/contact/", {
      method: "POST",
      headers: {"Content-Type": "application/x-www-form-urlencoded"},
      body: encode({ "form-name": "contact",  ...this.state}),
    }).then(() => {
      this.setState({alert: "Success! Your message was sent successfully."});
    }).catch((error) => {
      this.setState({alert: "We hit a snag processing your request!"})
    });
  }

  render() {
    const {
      alert,
      name,
      email,
      message,
    } = this.state;
    return (
      <>
        {alert
            && (
              <div
                className="alert alert--success"
                role="alert"
              >
                Awesome! Your message was sent successfully!
                {' '}
                <span role="img" aria-label="celebrate!">🙌</span>
              </div>
            )
        }
        <form
          className="form"
          method="POST"
          name="contact"
          data-netlify="true"
          netlify-honeypot="url"
          onSubmit={this.handleSubmit}
        >
          <label
            htmlFor="url"
            hidden={true}
          >
            Don't fill this out if you are human!
            <input
              type="text"
              name="url"
            />
          </label>
          <label
            htmlFor="name"
            className="form__label"
          >
            Your Name
            <input
              className="form__input"
              type="text"
              name="name"
              placeholder="ex. Tony Stark"
              required
              onChange={this.onChange('name')}
              value={name}
            />
          </label>
          <label
            htmlFor="email"
            className="form__label"
          >
            Email Address
            <input
              className="form__input"
              type="email"
              name="email"
              placeholder="ex. tony@stark.io"
              required
              onChange={this.onChange('email')}
              value={email}
            />
          </label>
          <label
            htmlFor="message"
            className="form__label"
          >
            Write Your Message
            <textarea
              className="form__input"
              type="message"
              name="message"
              placeholder="ex. We're building a team..."
              rows="5"
              onChange={this.onChange('message')}
              value={message}
            />
          </label>
          <button
            type="submit"
            className="button--rose form__submit"
          >
            SEND MESSAGE
          </button>
        </form>
      </>
    );
  }
}
