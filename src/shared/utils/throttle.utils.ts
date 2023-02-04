const LATENCY_BETWEEN_CALLS = 200;
export const throttle = async (wait = LATENCY_BETWEEN_CALLS) => {
  await new Promise((resolve) => setTimeout(resolve, wait));
};
