import React, { useEffect, useRef, useState } from "react";
import './timer.css';


export default () => { 
    let intervalID = useRef(null) ;
    let [time, setTime] = useState({
        hour: "",
        minute: "",
        second: "",
    });
    let [button , setButton] = useState("Start") ;

    const handleChangeForHours = (e, field) => {

        let value = e.target.value;
        if (isNaN(value)) {
            return;
        }
        let copyTime = { ...time };
        copyTime[field] = value;
        setTime(copyTime);

    }
    const handleChangeForMins = (e) => {
        console.log("mins") ;

        let mins = e.target.value;
        if (isNaN(mins)) {
            return;
        }

        let copytime = { ...time };

        if (mins > 59) {

            copytime["hour"] = Math.floor(mins / 60);
            console.log(copytime["hour"]);

            copytime["minute"] = mins % 60;
            copytime["second"] = 0;
        }
        else {
            copytime["minute"] = mins;
            copytime["second"] = 0;
            copytime["hour"] = 0;
        }

        setTime(copytime);
    }

    const handleChangeForSeconds = (e) => {
        console.log("seconds") ;

        let sec = e.target.value;
        console.log(sec);
        if (isNaN(sec)) {
            return
        }
        let copytime = { ...time }
        if (sec > 59) {
            copytime.minute = Math.floor(sec / 60);
            copytime.second = sec % 60;
            copytime.hour = 0;
        } else {
            copytime.second = sec;
            copytime.hour = 0;
            copytime.minute = 0;
        }
        setTime(copytime);

    }

    const startCountDown = ()=>{

        console.log("start") ;

        intervalID.current = setInterval(() => {
            setTime((prevtime1)=>{
                let prevtime = {...prevtime1} ; 
                prevtime.second-- ;
                if(prevtime.second < 0){
                    prevtime.minute-- ;
                    prevtime.second = 59 ;
                    if(prevtime.minute < 0){
                        prevtime.hour -- ;
                        prevtime.minute = 59 ;
                        if(prevtime.hour < 0){
                            prevtime.hour = "" ;
                            prevtime.minute = "" ;
                            prevtime.second = "" ;
                            setButton("Start") ;
                            clearInterval(intervalID.current) ;
                            return prevtime ;
                        }
                    }
                }
                return prevtime ;
            }) 
        }, 1000);

        
    }

  
    const changeFunctionality = ()=>{
        console.log("chnage") ;

        if(button == "Start"){
          setButton("Pause") ;
          startCountDown() ;
        }else{
            
            clearInterval(intervalID.current) ;
            console.log(intervalID) ;
            setButton("Start") ;
        }
  
        
    }
    const reset = () =>{
        console.log("reset") ;

        let copyTime = {...time} ;
        copyTime.hour = "" ;
        copyTime.minute = "" ;
        copyTime.second =  "" ;
        setTime(copyTime) ;
        setButton("Start") ;
        clearInterval(intervalID.current) ; 


    }
   
    return (
        <div className="parent1">
            <div className="inputs-div">
                <input type="text" value={time.hour} placeholder="HH" onChange={(e) => handleChangeForHours(e, "hour")} className="inp" />:
                <input type="text" value={time.minute} placeholder="MM" onChange={(e) => handleChangeForMins(e, "minute")} className="inp" />:
                <input type="text" value={time.second} placeholder="SS" onChange={(e) => handleChangeForSeconds(e, "second")} className="inp" />
            </div>
            <div className='btns-div'>
                <input type="button" value={button} className='button-name' onClick={() => changeFunctionality()} />
                <input type="button" value={"Reset"} className='button-name' onClick={()=> reset()} />

            </div>

        </div>
    )
}