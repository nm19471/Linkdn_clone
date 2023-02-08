import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import {auth} from "./firebase";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getUserAuth } from "./store/user";


const App=({store})=> {
  const user = useSelector(getUserAuth());
  
  // useEffect(() => {
  //   const unsubscribe = store.subscribe(() => {});

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  return (
    <div>
      <Router>
        <Routes>
      {user ? 
        (<Route path="/" element={<><Home/><Header/></>}/>)
      : 
        (<Route path="/" element={<Login/>}/>)
      }
      </Routes>
      </Router>
    </div>
  );
}

export default App;
