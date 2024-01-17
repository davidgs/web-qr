
# Free
- Regular QR Codes
  - WiFi codes
  - Simple Codes
  - UTM-encoded codes
  - Bit.ly integration

# Subscriptions
- Unlimited codes
- Customized QR Codes
- History of codes
- Bit.ly custom domain

# Enterprise
- Custom domain name


# TODO

- [ ] Media Queries for display and use on phones (move sidebar to top and collapse)
- [ ] Licensing for QR Codes
- [ ] Welcome page, with links to docs, etc.
- [ ] Docs
- [ ] Purchase page
- [ ] Clean up About Dialog


docker run --rm -it -e SECRET_KEY_BASE="$(openssl rand -hex 64)" \
   -e ENCRYPTION_DETERMINISTIC_KEY="$(openssl rand -base64 32)" \
   -e ENCRYPTION_PRIMARY_KEY="$(openssl rand -base64 32)" \
   -e ENCRYPTION_KEY_DERIVATION_SALT="$(openssl rand -base64 32)" \
   -e REDIS_URL="redis://host.docker.internal:6379" \
   -e DATABASE_URL="postgresql://keygen:KeyGen78.Mime@127.0.0.1:5432/postgres"  \
   -e KEYGEN_HOST="api.qr-builder.io" \
   -e KEYGEN_MODE="singleplayer"   \
   -e KEYGEN_EDITION="CE" \
keygen/api setup