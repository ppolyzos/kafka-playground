import { throttle } from '@app/shared/utils';
import { Logger } from '@nestjs/common';
import { CompressionTypes, Kafka, Producer } from 'kafkajs';
import { config } from '../config';
import { IProducer } from './producer.interface';

export class KafkaProducer implements IProducer {
  private readonly kafka: Kafka;
  private readonly producer: Producer;
  private readonly logger: Logger;

  constructor(private readonly topic: string) {
    this.kafka = new Kafka(config);
    this.producer = this.kafka.producer({
      allowAutoTopicCreation: true,
    });
    this.logger = new Logger(KafkaProducer.name);
  }

  async connect() {
    try {
      await this.producer.connect();
      this.logger.log('Kafka Producer connected');
    } catch (error) {
      this.logger.error('Failed to connect to kafka cluster', error);
      await throttle(5000);
      await this.producer.connect();
    }
  }

  async disconnect() {
    await this.producer.disconnect();
  }

  async produce(message: any) {
    try {
      await this.producer.send({
        topic: this.topic,
        compression: CompressionTypes.GZIP,
        messages: [message],
      });
      this.logger.log('Message produced', message);
    } catch (err) {
      this.logger.error('Failed to produce message', err);
    }
  }

  getRandomNumber = () => Math.round(Math.random() * 1000);

  createMessage = (num) => ({
    key: `key-${num}`,
    value: `value-${num}-${new Date().toISOString()}`,
  });
}
