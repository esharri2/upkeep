const millisecondsInADay = 1000 * 60 * 60 * 24; //86400000

export default function getDueInDays(task) {
  if (task.instances.length === 0) {
    return null;
  }

  const lastCompleted = Math.max(
    ...task.instances.map((instance) => new Date(instance.date).getTime())
  );

  const idealCompletionDate =
    lastCompleted + task.frequency * millisecondsInADay;
  return Math.ceil(
    (idealCompletionDate - new Date().getTime()) / millisecondsInADay
  );
}
