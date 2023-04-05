import Link from 'next/link';
//import Image from 'next/image';
import Head from 'next/head';
//import Script from 'next/script';
import Layout from '../../components/layout';
import { useEffect, useRef, useState, useContext, createContext } from 'react';
//import { getDatabase } from "firebase/database";
import { getDatabase, ref, onValue} from "firebase/database";
import LineChart from '../../components/line-chart';
import app from '../../components/firebase';
import { ariaHidden } from '@mui/material';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import ReactDOM from 'react-dom/client';
import { Component } from 'react';


//////////////////////////////////////////////////////////////////////////////////////////
const SliderContext = createContext();
//////////////////////////////////////////////////////////////////////////////////////////
var slidernum = 10;
var firsttime = 0;
var timeRound = 0;
var timeRoundDecimal = 0
var timestampArray_string = [];
//const timeout = 10000

const database = getDatabase();
//const timer = useRef()
const dataRef = ref(database, '/accel');

/////////////////////
// function MyForm() {
//     return (
//       <form>
//         <label>Enter your name:
//           <input type="text" />
//         </label>
//       </form>
//     )
//   }
function handleSubmit(e) {
    //e.preventDefault();


    var numValues = e.target
    var formData = new FormData(form)

    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
    console.log("lololololol")

}

//////////////////////
// function DiscreteSlider() {

//     const [sliderValue, setSliderValue] = useState(30);

//     const XixiCoco = (event, newValue) => {
//         setSliderValue(newValue);
//         console.log("Slider " + sliderValue);
//     };

//     return (
//         <SliderContext.Provider value={sliderValue}>
//             <Box sx={{ width: 300 }}>
//                 <Slider
//                     onChange={XixiCoco}
//                     aria-label="Temperature"
//                     defaultValue={30}
//                     valueLabelDisplay="auto"
//                     step={10}
//                     marks
//                     min={5}
//                     max={70}
//                 />
//                 <Slider defaultValue={30} step={5} marks min={10} max={110} disabled />
//             </Box>
//         </SliderContext.Provider>
//     );
// }

export default function FirstPost() {

   
    const [data, setData] = useState(null);
    const [xCoord, setX] = useState(null);
    const [yCoord, setY] = useState(null);
    const [zCoord, setZ] = useState(null);
    const [times, setTime] = useState(null);
    const [inputValue, setInputValue] = useState(null);



    

    useEffect(() => {
        //timer.current = setInterval(() => {
            //limpamos as vars
            const xCoordArray = [];
            const yCoordArray = [];
            const zCoordArray = [];
            const timestampArray = [];
            
            onValue(dataRef, (snapshot) => {
                setData(snapshot.val())
            });

            //push data if data valid
            for (var key in data) {
                if(!data[key].timestamp || !data[key].x || !data[key].y || !data[key].z)    { continue; }

                if(firsttime==0){
                    firsttime=data[key].timestamp
                }
                
                timeRound=data[key].timestamp-firsttime
                timeRoundDecimal = timeRound.toFixed(2)
                timestampArray.push(timeRoundDecimal)
                xCoordArray.push(data[key].x)
                yCoordArray.push(data[key].y)
                zCoordArray.push(data[key].z)

                
                //console.log({num})
                //console.log(firsttime)
            }

            //set variable
            setTime(timestampArray)
            setX(xCoordArray)
            setY(yCoordArray)
            setZ(zCoordArray)   
       // }, timeout*1000)
        //return () => clearInterval(timer.current)


    }
    );    
    // <form onSubmit={handleSubmit}>
    //     <label>
    //         Text input: <input name="numValues" id="numAmostras" defaultValue="30" />
    //     </label>
    //     <button type="submit">Submit form</button>
    // </form>

    /*for (var value in timestampArray) [
        timestampArray_string = timestampArray_string + String(timestampArray[value])
    ]*/
    //data={{labels:props.labels, datasets:[{label:'Dataset1',data: props.data,borderColor: 'rgb(255, 99, 132)',backgroundColor: 'rgba(255, 99, 132, 0.5)'}] }}
    
    //const sliderVal = useContext(SliderContext)
    
    return (

        <Layout>
            <div>Inserir número de amostras pretendido:</div>
            <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <div>(mostra todos por default)</div>
            {data ? (
                <>
                    <LineChart labels={times.slice(-inputValue)} data={xCoord.slice(-inputValue)} 
                                label='Graph Accel X'
                                borderColor='rgb(75, 192, 192)' 
                                pointBorderColor = 'rgb(75, 192, 192)' 
                                pointBackgroundColor = 'rgb(75, 192, 192)'
                                backgroundColor = 'rgba(75, 192, 192, 0.5)'/>
                    <LineChart labels={times.slice(-inputValue)} data={yCoord.slice(-inputValue)} 
                                label='Graph Accel Y'
                                borderColor= 'rgb(150, 25, 192)' 
                                pointBorderColor = 'rgb(150, 25, 192)' 
                                pointBackgroundColor = 'rgb(150, 25, 192)'
                                backgroundColor = 'rgba(150, 25, 192, 0.5)'/>
                    <LineChart labels={times.slice(-inputValue)} data={zCoord.slice(-inputValue)} 
                                label='Graph Accel Z'
                                borderColor= 'rgb(250, 100, 25)' 
                                pointBorderColor = 'rgb(250, 100, 25)' 
                                pointBackgroundColor = 'rgb(250, 100, 25)'
                                backgroundColor = 'rgba(250, 100, 25, 0.5)'/>

                    
                    {/*<p>{xCoord.slice(-5)}</p>
                    <p></p>
                    <p>{yCoord.slice(-5)}</p>
                    <p></p>
                    <p>{zCoord.slice(-5)}</p>
                    <p></p>
                    <p>{times.slice(-5)}</p>
            <p>{timestampArray_string}</p>*/}
                </>
            ) : (
                <p>Loading...</p>
            )}
            <Head>
                <title>First Post</title>
                <link rel="icon" href="/images/ricfazeres.jpg" />
            </Head>
            <h1>
                Go back to <Link href="/">home page</Link>
            </h1>
        </Layout>
    );
    

}


