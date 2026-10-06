import Button from "../components/Button";
export default function Contact() {
  return (
    <main className="inner">
      <section className="container inner-hero">
        <small className="kicker">WE'D LOVE TO HEAR FROM YOU</small>
        <h1>
          Let's start a<br />
          <em>conversation.</em>
        </h1>
        <p>
          A question, an idea, or just want to say hi? Drop us a note. We're all
          ears.
        </p>
      </section>
      <section className="container contact">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-row">
            <label>
              Your name
              <input placeholder="How should we call you?" />
            </label>
            <label>
              Email address
              <input type="email" placeholder="you@example.com" />
            </label>
          </div>
          <label>
            Subject
            <input placeholder="What's on your mind?" />
          </label>
          <label>
            Your message
            <textarea rows="5" placeholder="Tell us a little more..." />
          </label>
          <Button type="submit">Send your message</Button>
          <small>We will get back to you soon.</small>
        </form>
        <aside>
          <small className="kicker">A FEW WAYS TO REACH US</small>
          <p>
            Email<b>hello@taskflow.app</b>
          </p>
          <p>
            Response time<b>Usually within a day</b>
          </p>
          <p>
            Location<b>Somewhere sunny</b>
          </p>
          <i>We believe the best things start with a conversation.</i>
        </aside>
      </section>
    </main>
  );
}
