// custom hook for use in any component to fetch data
// will take 1 parameter that is the url, and will re-run whenever the url is updated

import { useState, useEffect } from 'react';

const useFetch = (url) =>
{

    const [data, setData] = useState(null); 
    const[isPending, setIsPending] = useState(true);
    const[error, setError] = useState(null); // make a dynamic variable to hold error messages

    useEffect(() => {

        const abortCont = new AbortController();

        setTimeout(() => {
            fetch(url, { signal: abortCont.signal }) 
            .then(res => {
                // when you're looking at the response object run an if statement that if the response object's ok property is
                // set to false, you will throw an error that will be caught in the catch block below 
                if(!res.ok){
                    throw Error('Could not fetch data for this resource');
                }
                return res.json();
            })
            .then(data => {
                setError(null); // if you successfully get the data later on, set error to false so it won't display error message on screen
                console.log(data);
                setData(data);
                setIsPending(false); // once we have the data, change isPending to false so the loading message disapears
            })
            // catching an error related to being unable to connect to the server
            .catch(err => {
                if (err.name === 'AbortError') {console.log('fetch aborted')} 
                else {
                    setError(err.message); //if you catch an error, update the dymamic error variable with it's message
                    setIsPending(false); // don't display the isLoading message if there was an error
                }
            })
        }, 1000);

        return () => abortCont.abort(); // abort the fetch if 
    }, [url]);

    return { data, isPending, error }; // return an object with 3 properties to the caller

}

export default useFetch;