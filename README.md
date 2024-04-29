# cron-test

> _tests and health checks by daily cron jobs_

## How to run

```bash
$ git clone https://github.com/RememVR-2024-SolutionChallenge/cron-test.git
$ cd cron-test
$ npm install
$ npm run test
```

`.env` is required to run this test.

## Health Check

### test target servers

- Gateway server [link](https://github.com/rememVR-2024-SolutionChallenge/gateway-server/)
- AI server [link](https://github.com/rememVR-2024-SolutionChallenge/ai-server)
- MySQL (dev) server
- Redis (dev) server

## Why we need to check by daily?

To find out the problem before the users do.

- The development team checks the status of the servers, especially the AI server (not the credit provided by Google), to monitor their status.

- This is to quickly identify any specific issues that arise, and is a minimum guarantees to ensure the robustness of the service.
