import "./App.scss";
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '../../routing/routes';
import { Loader } from "../Loader";
import { useState } from "react";
import { useRequest } from "../../hooks/useRequest";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../slices/slice";
import { userSelector } from "../../selectors/selectors";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "../../store/store";

export const AuthContext = React.createContext(null);

const previouslyAuthenticatedUserId = localStorage.getItem('userId');

const App = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const user = useSelector(userSelector);

  const { getUser } = useRequest();

  useEffect(() => {
    if (previouslyAuthenticatedUserId) {
      getUser()
        .then((res) => {
          if (res.id) {
            dispatch(setUser(res));
            setIsLoading(false);
          }
        })
    } else {
      setIsLoading(false);
    }
  }, [dispatch, getUser]);

  useEffect(() => {
    setIsAuthenticated(!!user.id)
  }, [user.id]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <PersistGate persistor={persistor}>
      <Router>
        <div className="wrapper">
          <Sidebar isAuthenticated={isAuthenticated} />
          <main>
            <Header isAuthenticated={isAuthenticated}/>

            <div className='page-wrapper'>
              {isAuthenticated
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
    </PersistGate>
  )
}

export default App;
