import * as React from 'react'
import ValidatedLogin from './pages/login/loginForm';

const App:React.FC = () => {
  return (
      <div className='App'>
        <h2>Sign in</h2>
        <ValidatedLogin/>
      </div>
  );
}

export default App;
