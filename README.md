# URL Shortener - Backend

Shorten your long URLs using http://tinylink-io.vercel.app/

# API Reference

## 1. Generate shorten URL

Make a POST request at http://tinylink-io.vercel.app/ with parameter `url` in the JSON.

### Request Body

```
{
    "url": "www.yourwebsite.com"
}
```

### Response Body

```
{
    "shortenURL": "https://tinylink-io.vercel.app/abc123"
}
```

## 2. Get URL from ID

Each shortened URL is generated with a unique ID. You can obtain the ID from the shortened URL - https://tinylink-io.vercel.app/thisIsYourId

You can use this ID to fetch the main URL from the backend.
Make a GET request at https://tinylink-io.vercel.app/get-url/yourID. Replace `yourID` with the ID generated above.

### Response Body

```
{
    "url": "https://www.yourwebsite.com"
}
```

## 3. Redirect to main URL.

Visit the main URL by clicking on the shortend URL - https://tinylink-io.vercel.app/:yourURLid

If the page does not exists, an error message is displayed.
