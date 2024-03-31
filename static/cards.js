function Cards() {
    const [cards, setCards] = React.useState([]);
    const [job, setJob] = React.useState('');
    const [recommandations, setRecommendations] = React.useState([]);
    const [recommendationIndex, setRecommendationIndex] = React.useState(false);
    const [recommendationInput, setRecommendationInput] = React.useState("");
    const [rating, setRating] = React.useState("");
    const [userName, setUserName] = React.useState("");
    const [inputSearch, setInputSearch] = React.useState("");

    const handleSearch = (e) => {
        const searchTerm = e.target.value;
        setInputSearch(searchTerm); 
    };

    React.useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const jobParam = urlParams.get('job');

        setJob(jobParam);
        axios.get("http://127.0.0.1:5000/api/professionals")
            .then(response => {
                let filterdCards = inputSearch ? response.data.filter((card) => {
                    return (
                        card.name.toLowerCase().includes(inputSearch.toLowerCase()) ||
                        card.profession.toLowerCase().includes(inputSearch.toLowerCase()) ||
                        (card.phone && card.phone.includes(inputSearch))
                    );
                }) : response.data;

                setCards(filterdCards);
            })
            .catch(error => {
                console.error("Error fetching cards:", error);
            });
    }, [inputSearch, recommendationIndex]);

    React.useEffect(() => {
        axios.get("http://127.0.0.1:5000/api/recommandations")
            .then(response => {    
                setRecommendations(response.data);
            })
            .catch(error => {
                console.error("Error fetching recommendations:", error);
            });
    }, [recommendationIndex]);
    
    const displayRecommendation = (cardID) => {
        setRecommendationIndex(cardID); 
    };

    const addRecommendation = (e, cardID) => {
        e.preventDefault(); // Prevent form submission
        
        axios.post('/add_recommendation', {cardID:cardID, name:userName, rating: rating, recommendationInput:recommendationInput }).then(response => {
            console.log("PASS TO add reco");
        });

        setRecommendationIndex(false); 
    };

    const handleRatingChange = (e) => {
        setRating(e.target.value);
    };

    const noneDisplayAddCardForm = () => {
        setRecommendationIndex(false); 
    };

    return (
        <>
            <div className="column-container" id="">
                <h1>{job === "All" ? "All" + " " : job + " "}cards</h1>
                <form className="search" id="search">
                    <input 
                        type="text" 
                        className="home-search" 
                        placeholder="Free search..." 
                        value={inputSearch} 
                        onChange={handleSearch} />
                </form>

                <div className="pro-cards" id="pro-cards">
                    
                    {cards.map(card => (
                        (job === "All" || card.profession === job) && (
                            <div key={card.id} className="pro-card" id="pro-card">
                                <div className="job-button">
                                    <h2>{card.profession}</h2>
                                    <img 
                                        className="pro-image"
                                        src={`/static/images/pro_images/${card.id}.png`}
                                        onError={(e) => {
                                            e.target.onerror = null; 
                                            e.target.src = '/static/images/pro_images/0.png'; 
                                        }}
                                    />
                                    {recommendationIndex == false && card.id !== recommendationIndex ? (
                                        <>
                                            <h3>Name: {card.name}</h3>
                                            <h3>Rating: {card.rating}</h3>
                                            <h3>Phone: {card.phone}</h3>  
                                            <div className="recommendationsDiv">
                                                <h3>Pro Recommendations</h3>
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th>Name</th>
                                                            <th>Rating</th>
                                                            <th>Recommendation</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {recommandations.map(recommendation => (
                                                            (card.id == recommendation.pro_name) ?
                                                            <tr key={recommendation.id}>
                                                                <td>{recommendation.name}</td>
                                                                <td>{recommendation.rating}</td>
                                                                <td>{recommendation.recommandation}</td>
                                                            </tr>
                                                            : ""
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div> 
                                            <div>
                                                <button className="all-button" type="button" onClick={() => displayRecommendation(card.id)}>Add recommendation</button>
                                            </div>   
                                        </>
                                    ) : card.id=== recommendationIndex && ( 
                                        <>                                                                  
                                            <h2>Recommendation</h2>
                                            <form className="formClass" onSubmit={(e) => addRecommendation(e, card.id)}>
                                                    <label htmlFor="user_name">Your name:</label>
                                                    <input type="text" id="user_name" onChange={(e) => setUserName(e.target.value)}  required />

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
                                                <div>
                                                    <button  className="all-button" type="submit">Submit</button>
                                                    <button className="all-button" type="button" onClick={noneDisplayAddCardForm}>Close</button> {/* Changed button type to button */}
                                                </div>
                                            </form>
                                        </>
                                    )}      
                                </div>
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
