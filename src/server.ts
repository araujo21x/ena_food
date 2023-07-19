/* eslint-disable no-console */
import mongoConnection from '@db/index';
import app from './app';

mongoConnection
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      let message = 'server on';
      if (process.env.NODE_ENV !== 'prod') {
        message = `server on: ${process.env.PORT || 3000}`;
      }

      console.log(message);
    });
  })
  .catch((err) => {
    console.log(err);
  });
