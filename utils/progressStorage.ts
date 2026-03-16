export const loadProgress = () => {
  const saved = localStorage.getItem("kneeCompleted");
  return saved ? Number(saved) : 0;
};

export const saveProgress = (value: number) => {
  localStorage.setItem("kneeCompleted", value.toString());
};