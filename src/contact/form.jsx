import React from 'react';


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
    this.url = 'https://www.briskforms.com/go/e1229760edb271ce7bf33a755f5ff529';
  }

  componentDidMount() {
    try {
      const url = new URL(window.location.href);
      this.setState({ alert: url.searchParams.get('alert') });
    } catch (err) {
      // empty
    }
  }

  onChange(fieldName) {
    return (event) => {
      this.setState({
        [fieldName]: event.target.value,
      });
    };
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
          action={this.url}
          method="POST"
        >
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
