# Cloudinary image storage

The admin image fields upload through an authenticated site endpoint to a
Cloudinary unsigned upload preset. Add these production runtime values:

```dotenv
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_UPLOAD_PRESET=
```

Create the preset as **unsigned** in Cloudinary. For safety, configure the
preset to:

- allow only JPG, PNG, WebP, and AVIF;
- limit uploaded file size to 10 MB;
- disallow custom public IDs;
- normalize overly large image dimensions and strip metadata when appropriate.

No Cloudinary API secret is exposed to the browser. Existing image URLs remain
valid and can be replaced gradually through the admin dashboard.

