import './App.css';
import TodayWeather from './components/TodayWeather'

function App() {
  return (
    <div className="App">
      <TodayWeather />
      <section className="other_days">
      </section>
    </div>
  );
}

export default App;
