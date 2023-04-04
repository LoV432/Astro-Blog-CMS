module.exports = ({ env }) => ({
    'sitemap': {
      enabled: true,
      config: {
        autoGenerate: true,
        allowedFields: ['slug', 'tag'],
        excludedTypes: [],
      },
    },
    upload: {
      config: {
        provider: 'cloudinary',
        providerOptions: {
          cloud_name: env('CLOUDINARY_NAME'),
          api_key: env('CLOUDINARY_KEY'),
          api_secret: env('CLOUDINARY_SECRET'),
        },
        actionOptions: {
          upload: {},
          uploadStream: {},
          delete: {},
        },
      },
    },
  });