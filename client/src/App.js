import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import AllRoutes from "./routes/AllRoutes";
import { useEffect } from "react";
import { loadUser } from "./redux/auth/action";


function App() {
  const { user,isAuthenticated }=useSelector((store)=>store.auth)
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(loadUser())
  },[dispatch])
  return (
    <div className="App">
      <AllRoutes/>
    </div>
  );
}

export default App;
