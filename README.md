# Super SentAPI Client
This frontend client is build in React and interfaces with the accompanying Super SentAPI express resource.

## About

This template is derived from `create-react-app` and has minimal additional dependencies. The main additions are:
```json
"axios": "^0.24.0",
"react-bootstrap": "^2.0.3",
"react-router-dom": "^6.0.2",
"sass": "^1.44.0",
```

## Structure

The top-level `App` function component stores the currently authenticated
user in state, as well as data related to the flash messages, via hooks. `App` renders the
`Header` component, and a list of routes, each of which render a component from
`src/components`. The `src/api` directory has a component file, `auth.js`, which
contains all the needed `axios` calls pertaining to authentication.

It is recommended that you follow this pattern in your app as well. For instance, if you are making
an app that keeps track of books, you might want a `src/api/books.js`, which
contains its own `axios` call pertaining to your books resource CRUD actions.
Using a separate directory within `components` for each individual component you
add makes it easy to locate and update components and has the added benefit of
making it easy to create custom styles that apply to that specific component.
To apply component specific styles, add a file to the component's directory such
as `ComponentName.scss` and then import it directly into the component with
`import './ComponentName.scss'`.  This will keep your styles modularized and
make it easier to make changes at the component level.

### Included Routes

This template comes with a handful of front-end routes that display
different components for user actions.

#### User Routes

| Endpoint         | Component | `AuthenticatedRoute`? |
|------------------|-------------------|-------|
| `/sign-up`       | `SignUp`    | No |
| `/sign-in`       | `SignIn`    | No |
| `/change-password` | `ChangePassword`  | Yes |
| `/sign-out`        | `SignOut`   | Yes |

#### Team Routes

| Endpoint         | HTTP Verb | `AuthenticatedRoute`? | REST Description
|------------------|-------------------|-------|----|
| `/teams`       | `GET`    | No | Index |
| `/teams/:id`       | `GET`    | No | Show |
| `/teams/new` | `GET` | Yes | New
| `/teams` | `POST` | Yes | Create |
| `/teams/:id/edit` | `GET`  | Yes | Edit |
| `/teams/:id` | `PATCH` | Yes | Update
| `/teams/:id`        | `DELETE`   | Yes | Delete |