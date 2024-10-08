## Description

This is a code exercise submitted for Blueprint, as detailed [here](https://github.com/blueprinthq/coding-exercise).

## Project setup

This does assume docker is installed and running. See this [installation guide](https://docs.docker.com/desktop/install/mac-install/) if you don't already have it.

These should be run separately. `build` must complete before the image can be brought `up`, and `up` needs to be running before we can `exec` on the image.
```bash
docker compose build
```
```bash
# -w if making changes. Enables watch mode, configured in docker.compose.yml
docker compose up -w
```
```bash
# You can detach from the above command, or run in a new terminal
docker exec -it backend npm run seed:run
```

## Compile and run the project

Handled by docker!

## Run tests

```bash
# This is the test case for Part I of the exercise; I have not implemented full unit testing.

cd packages/backend/
npm run test -w
```

### Description of Problem and Solution

Because implementation may evolve with complexity, I've split the logic for Part 1 and Part 2 described in the original brief linked above.

#### Part 1

This is the code in the ApplicationController; A very basic version of the logic that will eventually power the backend of Part 2.

This is relatively simple, accepting a data payload in the shape provided in the brief, matching those responses to values in the "grading" rubric, and then using those values to respond with recommended next steps.

This is the logic being tested with the automated test command above.

##### Part 2

##### Back End

The core of the logic is mostly the same here, but with a lot more meat built on around it. I started with the data model, matching table relations to the structure provided at the start of Part 2 in the brief.

A few assumptions are made based on this provided structure:

- Some parts of `screener` model and downstream relations should be interchangeable, such as a singular relation to `content`, multiple `sections` within that, so on for `answers` and `questions`.
- Though the given example `id` is alphanumeric, the brief only describes a need for "a unique id"; if the database's generated `id` column is insufficient for this purpose, a `UUID` could be implemented.
- Similar to the first point, `questions` and `answers` may be used in other chains-of-relation to be included in other screeners. If either of these are always uniqe to the screener in their combination and order, a json column could be used instead of the OneToMany relaiton.

I'll mention it again below in tradeoffs and other thoughts, but the "grading rubric" and referral scores could have lived in the database as well, rather than hardcoded. These seemed static enough that they could live as constants in the codebase, as well, but that's an assumption.

##### Front End

The data structure described above seems sensible enough for storage and reference, but wasn't as intuitive for presentation to an end user. I reshaped this data to a `frontEndData` object, including a question battery that could be iterated through, a set of answers, and the relevant display data for the screener.

This structure, together with a Context object made it much easier to track and iterate the current question, available answers, and store a constructed patient response.

This response is sent to the PatientResponse controller, which behaves much like the logic in Part 1 (with the addition of storing the response), and returns an array for "next steps", that could link out to additional screeners, as they are added to the database.

I tried to protect from missing or mis-shaped data in most cases; this is one of the areas where I'm not certain of the best practices for TS, and defaulted to simple returns (for expected, intermediate steps, loading states) or error throws (when data was missing in an unexpected way).

### Technologies

I've completed this evaluation in the past using more familiar technologies, so the specifics of the exercise were fairly familiar. Because of this, I chose to use tools more alighned with Blueprint's current stack, both as a challenge and as a learning exercise.

In this exercise, I used:

- Backend: NestJS (TS)
- Database: PostgreSQL (via TypeORM)
- Frontend: React (TS), with MaterialUI/Emotion
- Containerization: Docker, with Vite intializing frontend

### Deployment

This is not a deployment-ready container, though some of the resources I used to brush up on Docker do contain steps for adding layers that would bring it close. Namely: [this guide](https://montacerdk.medium.com/setup-dockerize-a-react-nest-monorepo-application-7a800060bd63).

As I had no intention of deploying this or testing a live instance (I instead chose to explore containerization, containerized networks, etc.), I didn't add these layers to my own images.

### Production Ready?

#### Code Functionality & Performance

For better or worse, I used this as a learning experience for some new technologies. For this reason, there are some issues that get in the way of production-readiness. Probably most apparently, I don't have any of the experience that teaches best practices around code organization, idiomatic patterns, anti-patterns in Nest, TypeScript, etc.

I tried to synthesize some of that knowledge by pulling from a wide variety of tutorials, official documentation, tech blogs, and other materials to counter this lack of personal experience.

Typescript does a lot of work to prevent production code errors, so I'm _mostly_ comfortable with the functional resilience here. I would feel much more comfortable automated testing in place, but this would add more development time (and was not required, but worth calling out).

On performance: there's not too many steps here I don't trust, but some discussions worth having:

- I made some assumptions about the data model that might be too much. I don't know the practical context here, but the object structure in the brief suggested that `sections` might be reused with multiple `screeners`. At the moment, that relationship is linear (`screener` > `content` > `sections`) and assumes those `sections` would be duplicated to other screeners, and content is just an intermediary holding some metadata. But this structure could be altered to make `contents` a one-to-many join table, allow a single instance of a `section` to be associated with multiple `screeners`.
- In hindsight, the `secondaryAssessments` array in `packages/backend/src/models/patient-responses/patient-responses.service.ts` really should have been put in the database, probably as a column on `mappings`. (If you go look and it's not there anymore, ignore this line; I'll make this change before submitting, if I have time.)
- I generated a few migrations, just to practice with the migration tool. I believe these are now outdated, as the dev-mode's `sync` function allowed for much more rapid iteration. These should be deleted and re-generated to reflect the current data structure, and long-term, the `sync` feature should probably be disabled to make database maintenance an intentional part of the production cycle.

#### Production Ready (UI/UX)

Basic, but serviceable. MaterialUI is doing a lot of the lifting here. I did diverge from the spec in a few minor ways that might be worth calling out:

- Radio instead of buttons - This seems like a more common design choice for this kind of questionaire. I'm certainly no UX expert, but this seemed like a more natural choice, and allows a change in selection (Pagination would be nice for this purpose, too... but not in scope).
- The spec asks for an assessment's `display_name`, which is not a field on the assessment itself, but on the section. I don't know if this was an intentional choice or oversight, but it's a nice point of discussion. It seemed more reasonable to display the `full_name` of the assessment, as the acronym used in the section name may not be userful to the end-user. I'm comfortable making this kind of inferrences to go off-spec, but would likely still check the change with a more product-adjacent person with a quick Slack.
- I added a very simple navbar to give this component a little visual context. The `Screeners` link in this nav bar would probably go to an index style page of assigned screeners in a production-ready version of this project, but for now, it simply starts the one available assessment.
- Pagination would be nice, as mentioned. As would editing. I mocked up the UI for this, but didn't build the functionality, as it wasn't in scope.
- There's copy on the review / results pages didn't get a lot of thought for clarity or their techincal "correctness" re: the purpose and context of this tool. Just some placeholder text, doing it's best to hold it's place.

### SRE, Security, Troubleshooting

To be clear up front, this is not a field of expertise, but it is an area of interest. In most of my professional experience, I've been in one of two situations: (1) there's a dedicated DevOps/SRE element on the team, or (2) we're hosted on an AIO infrastructure-as-a-service tool like Heroku.

In both scenarios, I've made it a point to learn "enough to be dangerous", and familiarize myself with service tooling and our team's infrastructure. I worked through an AWS certification course, have worked on securing IAM policies after a security incident, and have done some light work in terraform and infrastructure-as-code.

With all of that said, there's some basic conversations to be had:

On availability, SRE:

- Every deployment option has their own solution for this, and each are well-documented. Load balancers, automatic scaling, and availability zones seem like reasonable first steps. I'm not familiar with the specific steps to enable these tools as a matter of practice, I am familiar with the documentation, dashboards, and tooling in AWS, Heroku, and others. I would lean on those resources and docs in the event that I need to brush up on that that practical knowledge.
- I saw enough of the docs for the technologies I used here to know they have robust logging capabilities. Incorporating these into observability and monitoring tools like AWS Cloudwatch, DataDog, NewRelic, etc. would also go a long way here.
- A combination of automated responses and alerts from both of the above points would ensure quick, seamless recovery from any issues.

Security, on the code as-it-is:

- One of the upsides to a containerized dev environment is the ability to closely match prod-like conditions. With some tweaks to the configuration to match whatever production deployment is used, this should make troubleshooting and bug reproduction quick and reliable.
- Structurally, there are currently no endpoints exposing any user-submitted data, beyond the response returned on screener submission.

Security, on the framework and tooling:

- The "app context" in which this feature currently sits should get a pass for the standard security configurations. A good place to start is the [OWASP Top 10](https://owasp.org/www-project-top-ten/). I saw a number of these covered in the documentation and resources I worked through, and I'm comfortable enabling these features in other frameworks. The only one of these I directly interfaced with here was opening up CORS for the Dockerized network to talk across the apps. Production-ready code would enable this via a whitelist, rather than leaving it fully open.
- Typescript is already validating types, but some more data validation and sanitization should also be in place. Handling all of these errors and communicating them gracefully would be another requirement before production deployment.
- This is my first use of TypeORM, and I don't know what security features it includes, or how secure it is against SQL injection and other database vectors. As far as I know there's no raw SQL executed outside the migrations, but these vectors should be investigated.

## Stay in touch

- Author - [Chris Flack](https://www.linkedin.com/in/ccflack/)
- Resume - Included in this directory
