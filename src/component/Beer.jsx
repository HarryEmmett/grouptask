const MyBeer = ({beerName, description, image, abv, alcoholFree, beerType}) => {
    return ( 
        <div>
        <h2>name of beer: {beerName}</h2>
        <h2>name of description: {description}</h2>
        <h2>name of image: {image}</h2>
        <h2>name of abv: {abv}</h2>
        <h2>name of alcoholFree: {alcoholFree}</h2>
        <h2>name of beerType: {beerType}</h2>
        </div>
     );
}
 
export default MyBeer;