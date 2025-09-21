# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Analytics (Databuddy)

This project integrates [Databuddy](https://www.databuddy.cc/) for privacy-first analytics. The client ID is intentionally hardcoded in `src/analytics/databuddy.jsx` as per project requirements.

### Quick Start

```bash
npm install
npm run dev
```

Analytics script mounts automatically (disabled in dev mode for sending events, but still injected). To re-enable sending during development remove the `disabled={import.meta.env.DEV}` prop.

### (Optional) Environment Variable Approach

If you later prefer not to commit the client ID, replace the constant with `import.meta.env.VITE_DATABUDDY_CLIENT_ID` and create an `.env.local` file (see removed `.env.example` for format):

```
VITE_DATABUDDY_CLIENT_ID=your-client-id-here
```

### Event Instrumentation

Custom events fired:

| Event Name     | When                               | Properties                                       |
| -------------- | ---------------------------------- | ------------------------------------------------ |
| `todo_added`   | After a new task is added          | `task_id`, `length` (text length)                |
| `todo_deleted` | After a task deletion animation    | `task_id`                                        |
| `todo_moved`   | When a task is reordered (up/down) | `task_id`, `direction` (`up`/`down`), `position` |

Add additional events by importing `trackEvent` from `src/analytics/track.js`.

### Files

- `src/analytics/databuddy.jsx` – Provider component and hardcoded ID.
- `src/analytics/track.js` – Helper for safe event tracking.

### Production Build

```bash
npm run build
```

If you switch to env variables, ensure `VITE_DATABUDDY_CLIENT_ID` is set in production.
