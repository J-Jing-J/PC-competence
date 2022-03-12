import React from 'react';
import logo from './logo.svg';
import './App.css';
import { QuestionnaireListScreen } from './screens/questionnaire-list';
import { LoginScreen } from './screens/login';

function App() {
  return (
    <div className="App">
      {/* <QuestionnaireListScreen /> */}
      <LoginScreen />
    </div>
  );
}

export default App;
