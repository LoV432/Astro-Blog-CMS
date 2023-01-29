module.exports = ({ env }) => ({
    'sitemap': {
      enabled: true,
      config: {
        autoGenerate: true,
        allowedFields: ['slug'],
        excludedTypes: [],
      },
    },
  });