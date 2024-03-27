
function Cards(p) {
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        axios.get("http://127.0.0.1:5000/api/professionals").then(response => {
            setCards(response.data);
        }).catch(error => {
            console.error("Error fetching cards:", error);
        });
    }, []);

    return (
        <>
        <div>
            <h1>{p.job}</h1>
        </div>

        </>
        ); 

}

const cards = ReactDOM.createRoot(document.getElementById("cards-container"));
cards.render(<Cards/>);


