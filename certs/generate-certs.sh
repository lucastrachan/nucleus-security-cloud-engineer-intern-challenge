#!/bin/bash
# Generates a self signed TLS certificate
# Don't worry this would NOT be used for public production

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

openssl req -x509 -nodes -newkey rsa:2048 \
  -keyout "$SCRIPT_DIR/key.pem" \
  -out "$SCRIPT_DIR/cert.pem" \
  -days 365 \
  -subj "/CN=localhost"

echo "Certificate generated: cert.pem and key.pem"
