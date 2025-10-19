export default {
  api: {
    input: '../api/docs/swagger.yaml',
    output: {
      mode: 'tags-split',
      target: './src/api',
      schemas: './src/types/api',
      client: 'axios',
      clean: true,
      baseURL: 'http://localhost:8080',
    },
  },
};
