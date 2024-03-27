
function Cards() {
    const [cards, setCards] = React.useState([]);
    const [job, setJob] = React.useState('');
    const [recommendation, setRecommendation] = React.useState(false);
    const [recommendationInput, setRecommendationInput] = React.useState("");
    const [rating, setRating] = React.useState("");
    const [userName, setUserName] = React.useState("");

    const fetchCards = () => {
        axios.get("http://127.0.0.1:5000/api/professionals")
            .then(response => {
                setCards(response.data);
            })
            .catch(error => {
                console.error("Error fetching cards:", error);
            });
    };

    React.useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const jobParam = urlParams.get('job');

        setJob(jobParam);
        fetchCards();
    }, []);


    const displayRecommendation = (cardID) => {
        setRecommendation(cardID); 
    }

    const addRecommendation = (e, cardID) => {
        e.preventDefault(); // Prevent form submission
        
        axios.post('/add_recommendation', {cardID:cardID,name:userName, rating: rating, recommendationInput:recommendationInput }).then(response => {
            console.log("PASS TO add reco");
            fetchCards();
        });

        setRecommendation(false); 

    }

    const handleRatingChange = (e) => {
        setRating(e.target.value);
    };

    const noneDisplayAddCardForm = () => {
        setRecommendation(false); 
        };


    return (
        <>
        <div className="column-container" id="">
            <h1>{job === "All" ? "All" + " " : job + " "}cards</h1>
            <div className="pro-cards" id="pro-cards">
                {cards.map(card => (
                    (job === "All" || card.profession === job) && (
                        <div key={card.id} className="pro-card" id="pro-card">
                            <button className="job-button">
                                <h2>{card.profession}</h2>
                                <img className="job-image" src={`/static/images/${card.image}.png`} alt={card.profession} />
                                <h3>Name: {card.name}</h3>
                                <h3>Rating: {card.rating}</h3>
                                <h3>Phone: {card.phone}</h3>                                      
                                { recommendation!==false && card.id=== recommendation ? (
                                    <>
                                        <h2>Recommendation</h2>

                                        <form className="formClass" onSubmit={(e) => addRecommendation(e, card.id)}>
                                            <div>
                                            <label htmlFor="user_name">Your name:</label>
                                            <input type="text" id="user_name" onChange={(e) => setUserName(e.target.value)}  required />
                                            </div>

                                            <label htmlFor="rating">Rating:</label>
                                            <select id="rating" onChange={handleRatingChange} required>
                                                <option value="">Select Rating</option>

                                                <option value="5">5</option>
                                                <option value="4">4</option>
                                                <option value="3">3</option>
                                                <option value="2">2</option>
                                                <option value="1">1</option>
                                            </select>

                                            <div>
                                            <input type="text" id="reco_text" placeholder="Write something..." onChange={(e) => setRecommendationInput(e.target.value)}  required />
                                            </div>
                                            <button  className="all-button" type="submit">Submit</button>
                                            <button className="all-button" type="submit" onClick={noneDisplayAddCardForm}>Close</button>

                                    </form>

                                    </>
                                ) : (
                                    <div>
                                    <button className="all-button" type="submit" onClick={() => displayRecommendation(card.id)}>Add recommendation</button>

                                    </div>
                                )}
                                
                            </button>
                        </div>
                    )
                ))}
            </div>
        </div>
    </>
        ); 

}

const cards = ReactDOM.createRoot(document.getElementById("cards-container"));
cards.render(<Cards/>);


