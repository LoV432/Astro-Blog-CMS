module.exports = ({ env }) => ({
    'sitemap': {
      enabled: true,
      config: {
        autoGenerate: true,
        allowedFields: ['slug'],
        excludedTypes: [],
      },
    },
    'local-image-sharp': {
      config: {
        cacheDir: '.image-cache',
      }
    }
  });