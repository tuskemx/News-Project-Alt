import React from 'react';

export const Error = props => {
    console.log(props, "error props");
    console.log(props.err, "error");
  const {err} = props;
    return (

        <div>
        {err  &&
        <div>
            <b>Something went terribly wrong...</b>
            <br></br>
            <h1>{err.errorstatus}</h1>
            <br></br>
            <h4>{err.errormessage}</h4>
            <br></br>
            <h5>Sorry for the problem!</h5>
            </div>
        }
        </div>
        
    );
};

