import React, { useEffect, useState } from 'react';
import { Button } from "@/index"

import colors from "@/colors"


const ColorSelect = ({ color }) => {
    console.log(color)

    function checkIfCSSVariableExists(variableName) {
        const root = document.documentElement;
        const computedStyles = getComputedStyle(root);

        // Use the computedStyles object to check the value of the variable
        const value = computedStyles.getPropertyValue(variableName);

        // Check if the value is not null or an empty string
        if (value !== null && value !== "") {
            console.log(`Variable ${variableName} exists with a value of ${value}`);
        } else {
            console.log(`Variable ${variableName} does not exist.`);
        }
    }

    const changeAccentColor = (color) => {


        let elem = document.documentElement

        // get all the color values from the color object
        let colorValues = Object.values(color.light);
        for (let i = 0; i < colorValues.length; i++) {
            let colorValue = colorValues[i];
            elem.style.setProperty(`--rad-ui-color-accent-${(i + 1) * 100}`, `${colorValue}`);
            //   console.log(colorValue)
        }

        // Call the function with the variable name you want to check
        //    checkIfCSSVariableExists(`--rad-ui-color-accent-100`);



    };



    const dimensions = 32
    return <div onClick={() => changeAccentColor(color)} 
    className='cursor-pointer rounded-full hover:border-gray-700 border' 
    style={{ width: dimensions, height: dimensions, backgroundColor:color["light"]["900"] }}></div>
}





const SandboxEditor = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false)


    useEffect(() => {


    }, [])

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode)
    }

    return <div className={`m-5 p-2 border border-gray-300 ${isDarkMode ? 'rad-ui-dark-theme bg-black' : ''}`}>
        <div className='mb-4 border-b border-gray-900'>
            <Button onClick={toggleDarkMode}>{isDarkMode ? "Light" : "Dark"}</Button>
            <div className='flex space-x-2 my-1'>
             {Object.keys(colors).map((color) => {
             
                    return <ColorSelect color={colors[color]} />

             }
                )}
             
            </div>
        </div>
        <div>
            {children}
        </div>
    </div>
}

export default SandboxEditor;