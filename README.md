# cron-test

tests and health checks by daily cron jobs

## Health Check

### test target servers

- Gateway server [link](https://github.com/rememVR-2024-SolutionChallenge/gateway-server/)
- AI server [link](https://github.com/rememVR-2024-SolutionChallenge/ai-server)
- MySQL (dev) server
- Redis (dev) server

### Why we need health check by daily?

To find out the problem before the users do.

- The development team checks the status of the servers, especially the AI server (not the credit provided by Google), to monitor their status.

- This is to quickly identify any specific issues that arise, and is a minimum guarantees to ensure the robustness of the service.
