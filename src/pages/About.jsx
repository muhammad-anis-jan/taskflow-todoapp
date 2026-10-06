import Button from "../components/Button";
export default function About() {
  return (
    <main className="inner">
      <section className="container inner-hero">
        <small className="kicker">A LITTLE ABOUT US</small>
        <h1>
          Productivity should
          <br />
          <em>feel like a breath out.</em>
        </h1>
        <p>
          TaskFlow is a simple place to gather your thoughts, choose what
          matters, and make steady progress without pressure.
        </p>
      </section>
      <section className="container story">
        <div className="story-art">
          <div>
            <small>YOUR REMINDER</small>
            <b>
              You do not have to
              <br />
              do it all today.
            </b>
            <i>Just the next thing.</i>
          </div>
        </div>
        <div>
          <small className="kicker">WHY TASKFLOW EXISTS</small>
          <h2>
            Less keeping track.
            <br />
            <em>More being present.</em>
          </h2>
          <p>
            We made TaskFlow for people with full minds and meaningful things to
            do. A good task list should help you feel lighter, not add another
            thing to manage.
          </p>
          <p>
            Our mission is to make everyday planning feel clear, kind, and
            achievable, one small win at a time.
          </p>
          <Button to="/signup">Try TaskFlow</Button>
        </div>
      </section>
      <section className="values">
        <div className="container center">
          <small className="kicker">THE WAY WE SEE IT</small>
          <h2>
            Good days are built
            <br />
            <em>one task at a time.</em>
          </h2>
          <div className="features">
            <article>
              <i>01</i>
              <h3>Clarity over clutter</h3>
              <p>A thoughtful space for today's important tasks.</p>
            </article>
            <article>
              <i>02</i>
              <h3>Progress over pressure</h3>
              <p>Celebrate getting somewhere, even one step.</p>
            </article>
            <article>
              <i>03</i>
              <h3>Simple by design</h3>
              <p>Useful tools should make your day easier.</p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
