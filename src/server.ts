/* eslint-disable no-console */
import mongoose from 'mongoose';
import { app } from './app';
import config from './config';

async function main() {
  try {
    await mongoose.connect(config.db_url as string);

    const port = config.port;
    app.listen(port, () => {
      console.log(`Bike rental app is listening on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
