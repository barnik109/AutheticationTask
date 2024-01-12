
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateAccount from './CreateAccount/CreateAccount';
import ResetPassword from './ResetPassword/ResetPassword';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<CreateAccount />} />
          <Route path="/reset-password" element={<ResetPassword/> } />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
