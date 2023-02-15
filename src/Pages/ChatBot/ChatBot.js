import React, { useRef,useState } from 'react'
import './ChatBot.css';
import right from '../../assets/arrow-right-solid.svg'
import icon from '../../assets/headset-solid.svg'
import axios from 'axios';


function ChatBot() {
  
    const ipRef=useRef()
    const bot="from bot"
    const person= "from human"
    const [qna,setQna]= useState([]);
    const [loading,setLoading]= useState(false);

// const API = axios.create({ baseURL: 'http://localhost:5000'})
    
    const renderContent=(qna)=>{
        const value= qna.value;
        if(Array.isArray(value)){
            return value.map((val,i)=><p key={i} >{val}</p>)
        }
        return <p>{value}</p>
    }

    const updateQna=(from,value)=>{
        setQna((qna)=>[...qna, {from , value}])
    }


    const handleSend=()=>{
        const question = ipRef.current.value;
            updateQna(person, question)
            setLoading(true)
        // API.post('/chat',{   
          axios.post('http://localhost:5000/chat',{
            question,  
        }).then(res=>{
            updateQna(bot, res.data.answer)
            console.log(res.data.answer)
        })
        .catch(err=>console.log(err))
        .finally(()=>{
            setLoading(false)
        })
    }
  return (
    <div className='chatBot'>
    <div className="mobile">
      <div className="head">
        <div className="notch"></div>
        <div className="profilebox">
          <div className="left">
            <i className="fa fa-angle-left" aria-hidden="true"></i>
            <div className="profile">
              <img src={icon} alt="dp" />
              <div className="pdetail">
                <h3>Mr Clever</h3>
                <p>Online</p>
              </div>
            </div>
          </div>
          <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
        </div>
      </div>
      <div className="chatbox">
      {
        qna.map(qna=>{
            if(qna.from===person){
                return <div className="eachmessage sent animated">{renderContent(qna)}</div>
            }
        return <div className="eachmessage received animated">
          <p>{renderContent(qna)}</p>
        </div>
            
      
        })
    }

 {loading  && <div className="eachmessage received animated">
          <p>Loading...</p>
        </div> }
       
    </div>
    <div className="sendbox">
      <input type="text" ref={ipRef} placeholder="Type a message…" />
      <button disabled={loading} className="submit" onClick={handleSend} ><img src={right} /></button>
    </div>
   </div>

</div>

  )
}

export default ChatBot;

