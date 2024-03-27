FROM python:3.9-slim

# Set working directory
WORKDIR /usr/src/app

# Copy requirements file
COPY requirements.txt .

# Install dependencies
RUN apt-get update && apt-get install -y \
    python3-venv \
 && python3 -m venv venv \
 && source ./venv/bin/activate \
 && pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000
CMD ["flask", "run"]
