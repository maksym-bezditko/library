import "./App.scss";
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import { auth } from '../../index';
import { Navigate } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '../../routing/routes';
import { useAuthState } from "react-firebase-hooks/auth";
import { Loader } from "../Loader";

export const AuthContext = React.createContext(null);

const App = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading || error) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider value={user}>
      <Router>
        <div className="wrapper">
          <Sidebar/>
          <main>
            <Header authed={user}/>
            <div className='page-wrapper'>
              {user
                ?
                <Routes>
                  {privateRoutes.map(item => {
                    return <Route key={item.path} path={item.path} element={item.component}/>
                  })}
                  <Route path="*" element={<Navigate to="/books"/>}/>
                </Routes>
                :
                <Routes>
                  {publicRoutes.map(item => {
                    return <Route key={item.path} path={item.path} element={item.component}/>
                  })}
                  <Route path="*" element={<Navigate to="/about"/>}/>
                </Routes>
              }
            </div>
          </main>
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App;
