import React,{useContext} from "react";
import { Link } from "react-router-dom";
import ToysIcon from '@material-ui/icons/Toys';
import {UserContext} from '../App';

const Navbar = () => {
  const {state,dispatch}=useContext(UserContext);
  const renderNavs=()=>{
    if(state){
      return [
      <>
      <Link to="/allPosts">
      <span className="profile">AllPosts </span>
      </Link>
      <Link to="/profile">
      <span className="profile">Profile </span>
      </Link>
      <Link to="/createPost">
        <span className="create">CreatePost </span>
      </Link>
      <Link to="/login">
        <span className="logout" onClick={()=>{
          localStorage.clear();
          dispatch({type:"CLEAR"})
        }} >Logout </span>
      </Link>
      </>
      ]
    }
    else{
      return [
      <>
      <Link to="/login">
          <span className="login">Login </span>
      </Link>
       <Link to="/signup">
          <span className="signup">SignUp </span>
       </Link>
       </>
      ]
      } 
  }

  return (
    <>
      <div className="container">
        <div className="navbar">
          <div className="left item">
            <Link to={state?"/home":"/login"} className="brand">
              <span className="logo">
                <ToysIcon className="icon" />
              </span>
              <span className="brandName">Memesbook</span>
            </Link>
          </div>
          <div className="right item">
            {renderNavs()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
