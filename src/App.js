import { BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import AllRoutes from "./AllRoutes";
import { fetchAllQuestions } from "./actions/question";
import { fetchAllUsers } from "./actions/users";
import { Segment } from "semantic-ui-react";
import chat from "./assets/headset-solid.svg";
import close from "./assets/xmark-solid.svg";
import { useSelector } from "react-redux";
import ChatBot from "./Pages/ChatBot/ChatBot";
import { toast } from "react-toastify";


function App() {
  const dispatch = useDispatch();
  const User = useSelector((state) => state.currentUserReducer);

  const handleBar = () => {
    var x = document.getElementById("left-sidebar");
    if (x.className === "left-sidebar") {
      x.className += " responsive";
    } else {
      x.className = "left-sidebar";
    }
  };

  useEffect(() => {
    dispatch(fetchAllQuestions());
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const [bot, setBot] = useState(false);

  const toggleBot = () => {
    if (User) {
      bot === true ? setBot(false) : setBot(true);
    } else {
      toast.error("please! Login to access a chatbot");
    }
  };

  // const steps = [
  //   {
  //     id: "Greet",

  //     message: "Hello, Welcome to the Customer Support",

  //     trigger: "Done",
  //   },

  //   {
  //     id: "Done",

  //     message: "Please enter your Name!",

  //     trigger: "waiting1",
  //   },

  //   {
  //     id: "waiting1",

  //     user: true,

  //     trigger: "Name",
  //   },

  //   {
  //     id: "Name",

  //     message: "Hi {previousValue}, Please select your issue",

  //     trigger: "issues",
  //   },

  //   {
  //     id: "issues",

  //     options: [
  //       { value: "React", label: "React", trigger: "React" },
  //       { value: "Nodejs", label: "Nodejs", trigger: "Nodejs" },
  //       { value: "MongoDB", label: "MongoDB", trigger: "MongoDB" },
  //       { value: "Express", label: "Express", trigger: "expressjs" },
  //       {
  //         value: "Programming Language",
  //         label: "Programming Language",
  //         trigger: "prog",
  //       },
  //       {
  //         value: "How to Ask a Question ?",
  //         label: "How to Ask a Question ?",
  //         trigger: "ask",
  //       },
  //       {
  //         value: "How to post an answer ?",
  //         label: "How to post an answer ?",
  //         trigger: "post",
  //       },
  //       {
  //         value: "Popular Languages",
  //         label: "Popular Languages",
  //         trigger: "popular",
  //       },
  //     ],
  //   },

  //   {
  //     id: "React",
  //     message:
  //       "Thanks for telling your React.js issue, Visit tags section to resolve your issues.",
  //     end: true,
  //   },
  //   {
  //     id: "Nodejs",
  //     message:
  //       "Thanks for telling your Node.js issue,  Visit tags section to resolve your issues.",
  //     end: true,
  //   },
  //   {
  //     id: "MongoDB",
  //     message:
  //       "Thanks for telling your MongoDB issue,  Visit tags section to resolve your issues.",
  //     end: true,
  //   },
  //   {
  //     id: "expressjs",
  //     message:
  //       "Thanks for telling your Express.js issue,  Visit tags section to resolve your issues.",
  //     end: true,
  //   },
  //   {
  //     id: "prog",
  //     message:
  //       "Thanks for telling your issue,  Visit tags section to resolve your issues.",
  //     end: true,
  //   },
  //   {
  //     id: "ask",
  //     message:
  //       "Thanks for telling your issue, Login or signup to website and click on ask question button. Write your questions there.",
  //     end: true,
  //   },
  //   {
  //     id: "post",
  //     message:
  //       "Thanks for telling your issue, Login or signup to website. Click on the question you wish to answer. Click on post answer. Post your answer there.",
  //     end: true,
  //   },
  //   {
  //     id: "popular",
  //     message:
  //       "Thanks for telling your issue,  Visit tags section to resolve your issues.",
  //     end: true,
  //   },
  // ];

  return (
    <div className="App">
      <Router>
        <Navbar handleBar={handleBar} />
        <AllRoutes />
        
        {!bot ? (
          <img
            src={chat}
            style={{
              position: "fixed",
              right: "45px",
              bottom: "25px",
              color: "white",
              backgroundColor: "rgb(157, 216, 241)",
              cursor: "pointer",
              padding: "10px",
              borderRadius: "18px",
            }}
            alt="chatbot"
            width="70"
            onClick={toggleBot}
          />
        ) : (

         <div className="flex-bot" style={{position:"fixed", bottom:"3px", right:"5px" }}>
            <ChatBot />
            <img src={close} onClick={toggleBot} width='15' style={{position:"absolute",padding:"3px 5px", top:"18px", right:"25px",borderRadius:"3px",  backgroundColor:"white",zIndex:"200",cursor: "pointer"
 }} />
          </div>        
      )}
      </Router>
    </div>
  );
}

export default App;
