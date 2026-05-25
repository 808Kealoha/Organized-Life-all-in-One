import { useEffect, useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const [healthLogs, setHealthLogs] = useState([]);
  const [pain, setPain] = useState("");
  const [energy, setEnergy] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("app") || "{}");
    setTasks(saved.tasks || []);
    setHealthLogs(saved.healthLogs || []);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "app",
      JSON.stringify({ tasks, healthLogs })
    );
  }, [tasks, healthLogs]);

  const addTask = () => {
    if (!input) return;
    setTasks([...tasks, { id: Date.now(), text: input, done: false }]);
    setInput("");
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const addHealth = () => {
    setHealthLogs([
      { id: Date.now(), pain, energy, date: new Date().toLocaleDateString() },
      ...healthLogs
    ]);
    setPain("");
    setEnergy("");
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial", maxWidth: 500, margin: "auto" }}>
      <h2>Life + Health App</h2>

      <h3>Tasks</h3>
      <input value={input} onChange={e => setInput(e.target.value)} placeholder="Task" />
      <button onClick={addTask}>Add</button>

      {tasks.map(t => (
        <div key={t.id} onClick={() => toggleTask(t.id)} style={{ textDecoration: t.done ? "line-through" : "none" }}>
          {t.text}
        </div>
      ))}

      <h3>Health</h3>
      <input placeholder="Pain 1-10" value={pain} onChange={e => setPain(e.target.value)} />
      <input placeholder="Energy 1-10" value={energy} onChange={e => setEnergy(e.target.value)} />
      <button onClick={addHealth}>Log</button>

      {healthLogs.map(h => (
        <div key={h.id}>
          {h.date} — Pain: {h.pain}, Energy: {h.energy}
        </div>
      ))}
    </div>
  );
}
