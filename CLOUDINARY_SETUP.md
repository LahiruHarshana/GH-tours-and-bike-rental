# Cloudinary image storage

The admin image fields upload through an authenticated site endpoint to a
Cloudinary unsigned upload preset. Set these runtime values (already added to
`.env.example` and the gitignored `.env.local` for development):

```dotenv
CLOUDINARY_CLOUD_NAME=u3g08wu1
CLOUDINARY_UPLOAD_PRESET=gh_tours_unsigned
```

The `gh_tours_unsigned` preset was created as **unsigned** with:

- only JPG, PNG, WebP, and AVIF allowed;
- max file size 10 MB;
- unique filenames (no custom public IDs);
- uploads stored under the `gh-tours/` folder.

No Cloudinary API secret is exposed to the browser and none is required at
runtime. Existing image URLs remain valid and can be replaced gradually through
the admin dashboard.

