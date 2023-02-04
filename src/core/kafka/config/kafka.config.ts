import { KafkaConfig, logLevel } from 'kafkajs';

// # Required connection configs for Kafka producer, consumer, and admin
// bootstrap.servers=pkc-75m1o.europe-west3.gcp.confluent.cloud:9092
// security.protocol=SASL_SSL
// sasl.mechanisms=PLAIN
// sasl.username={{ CLUSTER_API_KEY }}
// sasl.password={{ CLUSTER_API_SECRET }}

// # Best practice for higher availability in librdkafka clients prior to 1.7
// session.timeout.ms=45000

// const host = process.env.HOST_IP || ip.address();

// export const config = {
//   // brokers: [`${host}:9092`],
//   brokers: ['pkc-75m1o.europe-west3.gcp.confluent.cloud:9092'],
//   clientId: 'my-app',
//   ssl: true,
//   connectionTimeout: 3000,
//   requestTimeout: 25000,
//   retry: {
//     initialRetryTime: 300,
//     retries: 5,
//   },
//   logLevel: logLevel.INFO,
//   sasl: {
//     mechanism: 'plain',
//     username: 'CHU5P5GEH6VWWP64', // UserId or RoleId
//     password: 'UwleFp0pBLlKnDwZw8i7q5RDfIjrBRhZOQpI2OKk/su57GcbWnKXuicqGzuCaXas',
//   },
// } as KafkaConfig;

export const config = {
  // brokers: [`${host}:9092`],
  brokers: ['localhost:9092'],
  clientId: 'my-dev-app',
  connectionTimeout: 3000,
  requestTimeout: 25000,
  retry: {
    initialRetryTime: 300,
    retries: 5,
  },
  logLevel: logLevel.INFO,
} as KafkaConfig;
