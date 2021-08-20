import "./App.css";
import LeftBar from "./components/LeftBar";
import RightPage from "./components/RightPage";
import { BrowserRouter as Router, Switch } from "react-router-dom";

function App() {
  const chapters = {
    devlog: "Devlog",
    htmlcss: "HTML&CSS",
    javascript: "JavaScript",
    react: "React",
    nodejs: "Node JS",
    typescript: "TypeScript",
    ds: "Data Structures & Algorithms",
    codingquestions: "Coding Questions",
    cs: "Computer Science",
    system: "System Programming",
    database: "Database",
    network: "Network & Security",
    os: "Operating System",
    interview: "Interview",
  };
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
