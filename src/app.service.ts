import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService {
  constructor(private dataSource: DataSource) {}

  async getHello(): Promise<any> {
    const [query, parameters] = this.dataSource.manager.connection.driver.escapeQueryWithParameters(
      `select count(r.uid) as total_users
        from resident r`,
      {},
      [],
    );

    return this.dataSource.query(query, parameters);
  }
}
