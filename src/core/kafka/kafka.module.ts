import { Module } from '@nestjs/common';
import { KafkaProducer } from './producers/kafka.producer';
import { ProducerService } from './producers/producer.service';

const services = [KafkaProducer, ProducerService];

@Module({
  imports: [],
  providers: [...services],
  exports: [...services],
})
export class KafkaModule {}
