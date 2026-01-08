import { Line, registerLine } from 'solid-chart';

function App() {
  registerLine();
  const chartData = {
    labels: ['A', 'B', 'C'],
    datasets: [{ data: [10, 20, 30], label: 'Test' }],
  };

  return (
    <div>
      <h1>Line Chart</h1>
      <div style={{ width: '400px' }}>
        <Line data={chartData} />
      </div>
    </div>
  );
}

export default App;
