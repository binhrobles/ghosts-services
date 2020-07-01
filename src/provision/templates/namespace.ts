const namespace = Object.freeze({
  index_patterns: ['n-*'],
  mappings: {
    properties: {
      Location: {
        type: 'geo_point',
      },
      CreateTime: {
        properties: {
          N: {
            type: 'date',
          },
        },
      },
    },
  },
});

export default namespace;
