import logo from './logo.svg';
import './App.css';
import { Login } from './components/loginButton';
import { TestDbButton } from './components/testing';

function App() {
  return (
    <div className="App">
      <h1> Fishing Finder</h1>
      <Login />
      <TestDbButton />
    </div>
  );
}

export default App;
