import { OnApplicationShutdown } from '@nestjs/common';
import { KafkaProducer } from './kafka.producer';
import { IProducer } from './producer.interface';

export class ProducerService implements OnApplicationShutdown {
  private readonly producers = new Map<string, IProducer>();

  async produce(topic: string, message: any) {
    const producer = await this.getProducer(topic);
    await producer.produce(message);
  }

  private async getProducer(topic: string): Promise<IProducer> {
    if (this.producers.has(topic)) {
      return this.producers.get(topic);
    }

    const producer = new KafkaProducer(topic);
    await producer.connect();
    this.producers.set(topic, producer);
    return producer;
  }

  async onApplicationShutdown() {
    const producers = Array.from(this.producers.values());
    await Promise.all(producers.map((producer) => producer.disconnect()));
  }
}
