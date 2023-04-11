import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

config();

export const dataSourceOption: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};

const dataSource = new DataSource(dataSourceOption);
export default dataSource;
