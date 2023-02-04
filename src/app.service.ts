import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ProducerService } from './core/kafka/producers/producer.service';

@Injectable()
export class AppService {
  constructor(private dataSource: DataSource, private producerService: ProducerService) {
    for (let i = 0; i < 1; i++) {
      this.producerService.produce('test', {
        key: 'key-1',
        value: `value-${i}`,
        partition: 0,
      });
    }
  }

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
