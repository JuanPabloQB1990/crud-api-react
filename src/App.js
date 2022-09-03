import './App.css';
import Form from './components/Form';
import ListUsers from './components/ListUsers';

function App() {
  return (
    <div className="container">
      <div>
        <Form />
      </div>
      <div>
        <ListUsers />
      </div>
    </div>
  );
}

export default App;
