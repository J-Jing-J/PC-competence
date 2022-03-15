
import React from 'react';
import './App.css';
import { AuthenticatedApp } from './authenticated-app';
import { ErrorBoundary } from './components/error-boundary';
import { FullPageErrorFallBack } from './components/lib';
import { useAuth } from './context/auth-context';
import { UnauthenticatedApp } from './unauthenticated-app';

function App() {
  const { user } = useAuth()
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallBack}>
        {/* <QuestionnaireListScreen /> */}
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
