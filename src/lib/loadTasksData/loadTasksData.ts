export const loadTasksData = async (subject:string) => {
  const res = await fetch(`assets/resources/${subject}/tasks.json`);
  const data = await res.json();
  const progress = [];

  for (let i = 1; i <= Object.keys(data).length; i++) {
    data[i].tasks.forEach(_task => progress.push({status: false, done: false, currentAnswer: [], score: 0}));
  }

  return [data, progress];
};