# API Project: URL Shortener Microservice

### Demo
- https://k0o97-shorturl-fcc.glitch.me

### User Stories
1. I can POST a URL to `[project_url]/api/shorturl/new` and I will receive a shortened URL in the JSON response. Example : `{"original_url":"www.google.com","short_url":1}`
2. If I pass an invalid URL that doesn't follow the valid `http(s)://www.example.com(/more/routes)` format, the JSON response will contain an error like `{"error":"invalid URL"}`. Or hostname doesn't exist, the JSON response will contain an error like `{"error":"Invalid Hostname"}`.
3. When I visit the shortened URL, it will redirect me to my original link.

#### Creation Example:
- POST `[project_url]/api/shorturl/new` - body (urlencoded) : `url=https://google.com`

#### Usage:
- `[project_url]/api/shorturl/1`

#### Will redirect to:
- `https://google.com`
