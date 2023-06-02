# README


## Setup
###### Ruby version
- ruby 3.2.2

###### System dependencies

- postgresql@15
- node 20.2.0 (.nvmrc file included, if using nvm)

###### Configuration

```
bin/rails setup
```

###### How to run the test suite

```
bundle exec rspec
```

###### Services (job queues, cache servers, search engines, etc.)

- Postgres service should be running. I used `brew services start postgresql@15`.

###### Deployment instructions

Auto-syncing on push via Render

#### Hosted

https://blueprint-screener.onrender.com

## Problems

Per instructions provided [here](https://github.com/blueprinthq/coding-exercise), there are two exercise problems resolved in this project.

#### Exercise 1

> Build a small API with a single endpoint which accepts a patient's answers to the screener as JSON. Then, score the answers and return the appropriate assessments.

##### Solution

Built a single API endpoint able to accept a payload (as given in the brief), and returning a response (as given in the brief).

###### Thoughts:

This API endpoint is tested in isolation in the one controller spec written.

I started with a more naive version of the data model with only this part of the exercise in mind. It was functional, but I wanted to be able to re-use this endpoint in the interface for part 2, so there was a big re-write of the data model between exercises 1 and 2.

#### Exercise 2

> You will build upon Part I and create a patient-facing user interface to complete the diagnostic screener. The interface can be built on a web or mobile (iOS or Android) platform.

##### Solution

A simple 3 "page" UI that can be extended fairly easily by adding more screeners to the database (and supporting logic for the follow-up recommendations).

###### Thoughts:

As part of the data model re-write that happened between exercises, I wrote a seed script to populate the data model with all the constituent pieces needed to serve this screener in the UI. This seed made the automated specs easier, and gave me everything I needed to populate the UI workflow.

This is the first time I've worked with Stimulus, and the JS if _very_ basic and unoptimized. It could be my lack of experience with it, but coming from React and other more robust JS frameworks, I appreciated the simplicity of Stimulus, but I also felt the limitation of not having 2-way data bindings and other conventions that come with the bigger frameworks. Stimulus seems good for "sprinkles of javascript", as advertised. It's a bit of a different mode of thought than I'm used to in frontend development, but I think I got there.

DaisyUI did a lot of the heavy lifting for building this UI, but I'm happy with the results. There's a few places I diverged from the brief, discussed more below.

### Technical Choices

A lot of these can be seen in options given the `rails new` command:
```
rails new blueprint-exercise --database=postgresql --skip-keeps --skip-bootsnap --asset-pipeline=propshaft --javascript=esbuild --css=tailwind --skip-action-cable --skip-active-job --skip-action-mailbox --skip-action-mailer --skip-active-storage --skip-action-text --skip-test --skip-system-test
```

- `--database=postgresql` - PG is familiar to me and easy to work with.
- `--skip-keeps` - Slimmer footprint, removes empty auto-generated rails directories.
- `--skip-bootsnap` - This is not likely to reach a size to need the optimization offered by this option.
- `--asset-pipeline=propshaft` - This is pretty new, and I haven't had a chance to work with it yet. I didn't end up interfacing with the asset pipeline much, so not much difference made.
- `--javascript=esbuild` - As above, this is a new js compiler option recently made available. A lot of the work it does is ✨automagical✨, but it was very fast!
- `--css=tailwind` - Another new option. Similar to bootstrap, but much lighter weight. Notably, comes without Bootstraps component library library.
- `--skip-action-cable --skip-active-job --skip-action-mailbox --skip-action-mailer --skip-active-storage --skip-action-text` - Covering these all at once. The brief didn't seem to require functionality given by any of these rails options.
- `--skip-test --skip-system-test` - Used rails-rspec for testing. I'm more familiar with Rspec syntax than the rails default of Minitest.
- DaisyUI - This is a lightweight component library built to work with Tailwind. The two of these made styling very simple, and I'm happy with the results.

NOTE: It turns out, Turbo needs something from ActiveJob. I had to go back and install this.

### Trade-offs and Choices

I think I got most of the features requested in the brief. A few places I diverged:
- Answers are radio selectors instead of buttons. This let me play with some functions I wanted to try in stimulus. Namely, swapping the `Next` button for `Submit` when reaching the end, rather than auto-advancing.
- I opted for a progress bar instead of a x/x numeric progress indicator. Another choice made so I could play with a component.

### Further development

- I would certainly prefer more testing in an app I intended to maintain long-term. I'm not _really_ one to think in TDD terms by default; I generally add them as I work to protect from regressions.
- The JS could certainly be refactored into more reasonable and efficient components.
- A lot of this is ready to accept additional data. It should require no new code to incorporate more screener questionnaires (excepting logic for where they fit in the follow-up logic; maybe this could be incorporated into the data model for a no-code extensibility option?).
- That said, I didn't really think too hard about how to manage a screener with multiple sections. I don't think the existing UI would make that a great experience, but I would need to think about what the "right" UX is for this eventuality.
