import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { createContext } from 'react';

const SliderContext = createContext()

export default function DiscreteSlider() {

    const [value, setValue] = React.useState(30);

    const XixiCoco = (event, newValue) => {
        setValue(newValue);
        console.log("Slider " + value);
    };

    return (
        <SliderContext.Provider value={value}>
            <Box sx={{ width: 300 }}>
                <Slider
                    onChange={XixiCoco}
                    aria-label="Temperature"
                    defaultValue={value}
                    valueLabelDisplay="auto"
                    step={10}
                    marks
                    min={5}
                    max={70}
                />
                <Slider defaultValue={value} step={5} marks min={10} max={110} disabled />
            </Box>
        </SliderContext.Provider>
    );
}