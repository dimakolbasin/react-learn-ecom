import './scss/app.scss';
import Header from "./components/Header";
import { Suspense, useState } from "react";
import {Routes, Route} from "react-router-dom";
import routes from './routes';


const App = () => {
  const [searchValue, setSearchValue] = useState('')
  return (
    <div className="wrapper">
      <Header
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <div className="content">
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
              <Suspense fallback={<div>Page is Loading...</div>}>
                <route.component searchValue={searchValue} />
              </Suspense>
             }
            />
          ))}
        </Routes>
        </div>
    </div>
  );
}

export default App;
