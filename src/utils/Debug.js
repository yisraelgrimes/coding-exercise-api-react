/* eslint-disable no-unused-expressions */
// Basic debug function
// Can be used inside a Component to print props to the screen
// and/or to log info about the component to the console.

// Props:
// - info: Prints a title for the component.
// - print: Prints debugger to screen
// - log: Logs debugger in console
// - children: Everything passed here get's printed
// - ... - spread in the paraent components props to see
// -       them and their values printed


import React from "react";


function _countProps(obj) {
    let result = 0;
    for(const prop in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
            result++;
        }
    }
    return result;
}


// Prints all relevant data about a component to the screen
// - To only print info to console, use: debug="log"
// - To only print info to the DOM, use: debug="print"

export function Debug({info, print, log, children, ...props}) {

    const logTitle = info ? `-- Debug: ${info} --` : "-- Debug --";
    // Check whether `props` were passed into the component
    const arePropsEmpty = Object.keys(props).length === 0 && props.constructor === Object;

    log && (
        console.log(logTitle),
        children && console.log(children),
        console.log(arePropsEmpty ? "No Props." : props)
    );

    // Make sure there are properties (from spread)
    const hasProps = _countProps(props) > 0;

    return (
        print ? (
      <>
        <pre style={{ background:"#333", color:"white", maring:"20px", padding:"20px" }}>
            <strong style={{color:"#cc0066"}}>Debug: {info}</strong>

            {children && (
                <span style={{color:"#2be8ff"}}>
                    <br />
              Children:
                    {JSON.stringify(children, null, 2)}
                </span>
            )}

            {hasProps && (
                <span style={{color:"#2be8ff"}}>
                    <br />
              Props:
                    {JSON.stringify(props, null, 2)}
                </span>
            )}

        </pre>
      </>
        ) : (
        // Return null if you are only logging info to console
            null
        )
    );
}
