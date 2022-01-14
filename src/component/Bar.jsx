import { useEffect, useState } from "react";
import axios from 'axios';
//need to make the beer file
import Beer from "./Beer";

const Bar = () => {
    const [beerData, setBeerData] = useState("");
    const [error, setError] = useState(null);
    const [loaded, setLoaded] = useState(false);
    let tempId;
    useEffect(() => {
        axios.get(`http://localhost:5015/beer/readAll`)
            .then((response) => {
                setBeerData(response.data);
                console.log("===========================");
                console.log(response.data);
                console.log(beerData);
                setLoaded(true)
            })
            .catch((error) => {
                setLoaded(true);
                setError(error);
            })
            .then(() => {
                console.log(beerData);
            });
    }, []);

    const getBeerId = (id) => {
        axios.get(`http://localhost:5015/beer/read/${id}`)
            .then((response) => {
                console.log("read by id yes connor");
                console.log(response);
                console.log(response.data);
                console.log(response.data.beerName)
                setBeerData([response.data]); //need to turn into an array otherwise you cant .map in the return 
                setLoaded(true);
            }).catch((error) => {
                setLoaded(true);
                setError(error);
            }).then(() => {
                console.log(beerData);
            });
    }

    const deleteBeerId = (id) => {
        axios.delete(`http://localhost:5015/beer/delete/${id}`)
        .then((response) => {
            console.log(response);
            console.log(`item deleted`);
        })
        .catch((error) => {
            setLoaded(true);
            setError(error);
        })

    }

    const postBeer = () => {
        axios.post(`http://localhost:5015/beer/create`)



    }

    if (error === true) {
        return <h2>Oops,theres been an error please refresh the page</h2>
    } else if (!loaded) {
        return <h2>Please wait, data is loading</h2>
    } else {
        return (
            <div>
                <h2>Loads if the data is fine</h2>
                <input type="text" name="beerName" onChange={(event) => tempId = (event.target.value)} />
                <button type="button" onClick={() => { getBeerId(tempId) }}>
                    BeerName
                </button>
                <input type="text" name="deleteId" onChange={(event) => tempId = (event.target.value)} />
                <button type="button" onClick={() => { deleteBeerId(tempId) }}>
                    Delete beer by Id
                </button>

                <form>
                <label for="beerName">beer name</label>
                <input type="text" name="beerName" onChange={(event) => tempId = (event.target.value)} />
                <br></br>
                <label for="description">description</label>
                <input type="text" name="description" onChange={(event) => tempId = (event.target.value)} />
                <br></br>
                <label for="image">image</label>
                <input type="text" name="image" onChange={(event) => tempId = (event.target.value)} />
                <br></br>
                <label for="abv">abv</label>
                <input type="text" name="abv" onChange={(event) => tempId = (event.target.value)} />
                <br></br>
                <label for="alcoholFree">alcohol free</label>
                <input type="text" name="alcoholFree" onChange={(event) => tempId = (event.target.value)} />
                <br></br>
                <label for="beerType">beerType</label>
                <input type="text" name="beerType" onChange={(event) => tempId = (event.target.value)} />
                <br></br>
                
                <button type="submit" onClick={() => { createBeer(tempId) }}>
                    Create beer
                </button>
                <button type="reset">
                    Reset
                </button>

                </form>

                {beerData.map((beer) => {
                    console.log(beer);
                    console.log(beer.beerName);
                    return <Beer beerName = {beer.beerName} description= {beer.description} image={beer.imageUrl} abv={beer.abv} alcoholFree={beer.alcoholFree.toString()} beerType={beer.beerType} />
                })}
            </div>
        )
    }
}
export default Bar;

