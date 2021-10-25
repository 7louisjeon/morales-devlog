import "./App.css";
import LeftBar from "./components/LeftBar";
import RightPage from "./components/RightPage";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import useChapters from "./hooks/useChapters";

function App() {
  const chapters = useChapters();
  return (
    <Router>
      <Switch>
        <div className="App">
          <LeftBar chapters={chapters} />
          <RightPage chapters={chapters} />
        </div>
      </Switch>
    </Router>
  );
}

export default App;
