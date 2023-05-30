import WeeklyCalendar from "./component/WeeklyCalendar";

import { CalendarProvider } from './component/CalendarContext';
import Header from "./component/Header";

function App() {
  return (
    <div className="App">
      <Header/>
      <CalendarProvider>
      <WeeklyCalendar/>
      </CalendarProvider>
    </div>
  );
}

export default App;