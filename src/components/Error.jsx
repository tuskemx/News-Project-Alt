import React from 'react';

export const Error = props => {
    console.log(props);
    const { err } = props;
    console.log(err, "error");

    return (
        <div>
            <h2>Something went terribly wrong...</h2>;
            {/* <h2 >{err.errorstatus}</h2>
            <h3 > {err.errormessage}</h3> */}
            <br></br>
            <h3>Sorry for the problem!</h3>
        </div>
    );
};

