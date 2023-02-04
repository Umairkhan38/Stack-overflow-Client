import { BrowserRouter as Router } from 'react-router-dom' 
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import Navbar from './components/Navbar/Navbar'
import AllRoutes from './AllRoutes'
import { fetchAllQuestions } from './actions/question'
import { fetchAllUsers } from './actions/users'



function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllQuestions())
    dispatch(fetchAllUsers())
  }, [dispatch])

  const handleBar=()=>{
    var x = document.getElementById("left-sidebar");
    var y= document.getElementById("side-nav")
    if (x.className === "left-sidebar") {
      x.className += " responsive";
      y.className += " res-side";
    } else {
      x.className = " left-sidebar";
      y.className += " side-nav";

    }
    
}



  return (
    <div className="App">
      <Router >
        <Navbar handleBar={handleBar}/>
        <AllRoutes />
        </Router>
     
    </div>
  );
}

export default App;
