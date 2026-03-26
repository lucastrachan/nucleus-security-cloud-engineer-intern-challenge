Running locally in terminal (Git Bash and Docker Desktop)
  bash certs/generate-certs.sh
  docker-compose up --build
  https://localhost in browser

  *docker-compose down (to stop the program)*

API Endpoints
  GET /          — service info and status
  GET /health    — health check (returns {"status":"ok"})
  GET /analyze?service=api     — returns cloud-ready result
  GET /analyze?service=legacy  — returns not-ready result

  Design Choices
  - Nginx — It handles the HTTPS padlock so the app doesn't have to. This is the standard real-world pattern.
  - Docker Compose — One file, one command, both services running and connected. Mirrors how AWS does it.

  What Could Be Improved With More Time
  - Make /analyze actually check real live services instead of using hardcoded answers
  - Use a proper JSON logger instead of console.log
  - Add a healthcheck so Nginx waits for the app to be ready before routing traffic
  - Run the Node app as a non-admin user inside Docker (safer)
  - Add a GitHub Actions pipeline to auto-deploy to AWS on every code change. Could deploy with Amplify

AI Tools and Prompts
  - Scaffolded the project with Claude, then reviewed and adjusted all content to fit the challenge requirements.

AWS Deployment Path
  - ECR — stores your Docker image (like a private Docker hub on AWS)
  - ECS or Fargate — runs your container without you needing to manage any servers
  - ALB — replaces Nginx, handles HTTPS through AWS
  - ACM — gives you a free, auto-renewing cert
  - Route 53 — connects your domain name to the load balancer

  Why Storing a Private Key in a Repo is Bad
  1. Anyone with access to the repo can use the key to decrypt your traffic
  2. Git history is forever — even if you delete the file, the key is still in the history
  3. Bots and attackers often scan GitHub for exposed keys
