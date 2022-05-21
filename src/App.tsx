import React from 'react';
import './App.css';
import { ErrorBoundary } from './components/error-boundary';
import { FullPageErrorFallBack, FullPageLoading } from './components/lib';
import { useAuth } from './context/auth-context';

// React.lazy动态引入
const AuthenticatedApp = React.lazy(() => import('./authenticated-app'))
const UnauthenticatedApp = React.lazy(() => import('./unauthenticated-app'))

function App() {
  // const { user } = useAuth();
  const admin = window.localStorage.getItem('admin') ? window.localStorage.getItem('admin') : ''
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallBack}>
        {/* <QuestionnaireListScreen /> */}
        {/* 懒加载先后渲染时，中间等待时渲染的内容 */}
        <React.Suspense fallback={<FullPageLoading />}>
          {admin ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
