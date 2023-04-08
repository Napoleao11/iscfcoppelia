import Link from 'next/link';
import Head from 'next/head';
import Layout from '../../components/layout';
import { useEffect, useRef, useState, useContext, createContext } from 'react';
import { getDatabase, ref, onValue} from "firebase/database";
import LineChart from '../../components/line-chart';
import app from '../../components/firebase';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router'

var firstTime = 0;
var timeRound = 0;
var timeRoundDecimal = 0
var pointRad = 0;

const database = getDatabase();
const dataRef = ref(database, '/accel');

export default function Charts() {
    const router = useRouter();
    const [data, setData] = useState(null);
    const [xCoord, setX] = useState(null);
    const [yCoord, setY] = useState(null);
    const [zCoord, setZ] = useState(null);
    const [times, setTime] = useState(null);
    const [inputValue, setInputValue] = useState(null);

    if (inputValue < 50 && inputValue > 0) {
        pointRad = 3 - 1.5 * inputValue / 50
    } else {
        pointRad = 0
    }
    
    useEffect(() => {
        if (!sessionStorage.getItem("isLoggedIn")){
            router.push('/');
            return;
        }

        const xCoordArray = [];
        const yCoordArray = [];
        const zCoordArray = [];
        const timestampArray = [];
        
        onValue(dataRef, (snapshot) => {
            setData(snapshot.val())
        });

        //push data if data valid
        for (var key in data) {
            if(!data[key].timestamp || !data[key].x || !data[key].y || !data[key].z) { continue; }

            if(firstTime == 0){
                firstTime = data[key].timestamp
            }
            
            timeRound=data[key].timestamp-firstTime
            timeRoundDecimal = timeRound.toFixed(2)
            timestampArray.push(timeRoundDecimal)
            xCoordArray.push(data[key].x)
            yCoordArray.push(data[key].y)
            zCoordArray.push(data[key].z)
        }

        //set variable
        setTime(timestampArray)
        setX(xCoordArray)
        setY(yCoordArray)
        setZ(zCoordArray)   
    });    
    
    return (
        <Layout>
            <div align="center">
                <a href="/posts/charts">
                    <Button variant="contained">Charts</Button>
                </a>
                <a href="/posts/table">
                    <Button variant="outlined">Table</Button>
                </a>
            </div>

            
            <div>Inserir número de amostras pretendido:</div>
            <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <div>(mostra todos por default)</div>

            <p align="center" style={{fontSize: 40}}>Monitorização acelerómetros</p>

            {data ? (
                <>
                    <LineChart labels={times.slice(-inputValue)} data={xCoord.slice(-inputValue)} 
                                label='Graph Accel X'
                                borderColor='rgb(75, 192, 192)' 
                                pointBorderColor = 'rgb(75, 192, 192)' 
                                pointBackgroundColor = 'rgb(75, 192, 192)'
                                backgroundColor = 'rgba(75, 192, 192, 0.5)'
                                pointRadius = {pointRad}
                                />
                    <LineChart labels={times.slice(-inputValue)} data={yCoord.slice(-inputValue)} 
                                label='Graph Accel Y'
                                borderColor= 'rgb(150, 25, 192)' 
                                pointBorderColor = 'rgb(150, 25, 192)' 
                                pointBackgroundColor = 'rgb(150, 25, 192)'
                                backgroundColor = 'rgba(150, 25, 192, 0.5)'
                                pointRadius = {pointRad}
                                />
                                
                    <LineChart labels={times.slice(-inputValue)} data={zCoord.slice(-inputValue)} 
                                label='Graph Accel Z'
                                borderColor= 'rgb(250, 100, 25)' 
                                pointBorderColor = 'rgb(250, 100, 25)' 
                                pointBackgroundColor = 'rgb(250, 100, 25)'
                                backgroundColor = 'rgba(250, 100, 25, 0.5)'
                                pointRadius = {pointRad}
                                />
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