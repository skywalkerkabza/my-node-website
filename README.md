Here's a draft `README.md` for your project:

```markdown
# My Node.js Website with Docker and Kubernetes

This project demonstrates how to build and deploy a simple Node.js website using Docker and Kubernetes. Additionally, it includes a K6 load testing setup to simulate user traffic.

## Project Structure

- **app.js**: The main application file for the Node.js website.
- **Dockerfile**: Dockerfile to containerize the Node.js application.
- **Dockerfile.k6**: Dockerfile to containerize the K6 load testing script.
- **deployment.yaml**: Kubernetes deployment file for the Node.js application.
- **service.yaml**: Kubernetes service file to expose the Node.js application.
- **k6_deployments.yaml**: Kubernetes deployment file for running the K6 load tests.
- **public/**: Directory containing static files such as `index.html`.

## Prerequisites

- Docker
- Kubernetes cluster (Minikube, GKE, EKS, etc.)
- kubectl configured to interact with your cluster
- Node.js installed (for local development)

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Build the Docker Image

Build the Docker image for the Node.js application:

```bash
docker build -t my-node-website:latest .
```

### 3. Deploy to Kubernetes

Deploy the Node.js application to your Kubernetes cluster:

```bash
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
```

This will create a deployment and a service that exposes your Node.js application.

### 4. Access the Application

Once the service is up, access the application using the external IP provided by the LoadBalancer. You can check the IP using:

```bash
kubectl get services my-node-website
```

### 5. Load Testing with K6

Build the Docker image for K6 load testing:

```bash
docker build -t k6-load-test:enhanced -f Dockerfile.k6 .
```

Deploy the K6 load test to your Kubernetes cluster:

```bash
kubectl apply -f k6_deployments.yaml
```

This will run 20 instances of the K6 load test in parallel, simulating real-world traffic to your Node.js website.

### 6. Clean Up

To clean up the resources created in your Kubernetes cluster, run:

```bash
kubectl delete -f k6_deployments.yaml
kubectl delete -f service.yaml
kubectl delete -f deployment.yaml
```

## Configuration

- **Port Configuration**: The Node.js application is set to run on port `3000`. The Dockerfile exposes port `4000`. The Kubernetes service maps port `80` of the LoadBalancer to port `3000` of the container.

- **K6 Load Test Configuration**: The K6 deployment runs 20 pods, each executing the `load-test.js` script. Resources are limited to `1 CPU` and `1Gi` of memory per pod.

## Troubleshooting

- **Node.js App Not Accessible**: Ensure that the Kubernetes service has assigned an external IP and that it is reachable.
- **K6 Load Test Fails**: Verify that the K6 Docker image is correctly built and that the deployment is running the expected number of replicas.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
```

This `README.md` provides clear instructions for building, deploying, and testing your Node.js application using Docker and Kubernetes. Adjust any details as necessary for your specific setup!