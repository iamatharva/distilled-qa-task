FROM selenium/node-chrome:119.0

USER root

ENV NODE_MAJOR=18
RUN apt-get update && \
    apt-get install -qqy ca-certificates curl gnupg && \
    mkdir -p /etc/apt/keyrings && \
    curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg && \
    echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_${NODE_MAJOR}.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list && \
    apt-get update && \
    apt-get install -qqy nodejs && \
    npm install -g n && \
    n 18.16.0 && \
    node -v

# Make the 'app' folder the current working directory
WORKDIR /app/

# Copy 'package.json' (if available)
COPY package*.json ./

RUN npm ci

RUN mkdir screenshots

# Copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

ENTRYPOINT ["npm", "run", "test:headless"]
