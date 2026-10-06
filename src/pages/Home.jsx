import Button from "../components/Button";
export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <small className="kicker">YOUR DAY, WITH MORE INTENTION</small>
            <h1>
              Make space for
              <br />
              <em>what matters.</em>
            </h1>
            <p>
              A calmer way to collect your thoughts, find your focus, and get
              the important things done.
            </p>
            <div className="actions">
              <Button to="/signup">Start your free day</Button>
              <Button to="/about" secondary>
                See how it works
              </Button>
            </div>
            <p className="proof">A little more focused, one day at a time</p>
          </div>
          <div className="mock">
            <small>TASKFLOW / TODAY</small>
            <h2>A fresh start.</h2>
            <p>You have got this, Anis.</p>
            <div className="progress">
              Today's progress: 2 of 4<i />
            </div>
            {[
              "Review project notes",
              "Plan the week ahead",
              "Take a lunch break",
            ].map((x) => (
              <p className="mock-task" key={x}>
                - {x}
              </p>
            ))}
            <span>+ Add a new task</span>
          </div>
        </div>
      </section>
      <section className="section container">
        <div className="center">
          <small className="kicker">A SOFTER WAY TO GET THINGS DONE</small>
          <h2>
            Less overwhelm.
            <br />
            <em>More of your good work.</em>
          </h2>
          <p>
            Everything you need to feel on top of your day, without adding more
            noise.
          </p>
        </div>
        <div className="features">
          {[
            [
              "+",
              "Simple task management",
              "Capture what matters in one calm, clear place.",
            ],
            [
              "~",
              "Make time for focus",
              "Give your day structure and your best work room.",
            ],
            ["=", "See your progress", "Watch consistency turn into momentum."],
          ].map((x) => (
            <article key={x[1]}>
              <i>{x[0]}</i>
              <h3>{x[1]}</h3>
              <p>{x[2]}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="quote">
        <div className="container">
          <h2>
            Progress is knowing
            <br />
            <em>what comes next.</em>
          </h2>
          <Button to="/signup">Find your flow</Button>
        </div>
      </section>
      <section className="cta">
        <h2>Ready for a clearer kind of day?</h2>
        <p>Your next good day starts with one small step.</p>
        <Button to="/signup">Make your free account</Button>
      </section>
    </>
  );
}
