import './scss/app.scss';
import { Suspense, useState, createContext, lazy } from "react";

import {Routes, Route} from "react-router-dom";
import routes from './routes';
const Header = lazy(() => import(/* webpackChunkName: "header" */ /* webpackPrefetch: true */ './components/Header'))

export const SearchContext = createContext()


const App = () => {
  const [searchValue, setSearchValue] = useState('')

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{searchValue, setSearchValue}}>
        <Header />
        <div className="content">
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <Suspense fallback={<div>Page is Loading...</div>}>
                    <route.component />
                  </Suspense>
                }
              />
            ))}
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
