import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import LandingPage from "./components/LandingPage/LandingPage";
import Detail from "./components/Detail/Detail";
import CreationForm from "./components/CreationForm/CreationForm";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/create" component={CreationForm} />
          <Route exact path="/dogs/:id" component={Detail} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
