

function Home() {
    const [jobs, setJobs] = React.useState([]);
    
    React.useEffect(() => {
        axios.get("http://127.0.0.1:5000/api/jobs").then(response => {
            setJobs(response.data);
        }).catch(error => {
            console.error("Error fetching jobs:", error);
        });
    }, []);

    const handleClickJob = (job) => {
        window.location.href = `/cards?job=${job}`;
    };

    function scrollLeft() {
        const jobCards = document.getElementById("job-cards");
        jobCards.scrollLeft -= 100; // Adjust as needed for scrolling distance
    }
    
    function scrollRight() {
        const jobCards = document.getElementById("job-cards");
        jobCards.scrollLeft += 100; // Adjust as needed for scrolling distance
    }
    
    return (
        <>
        <div className="base" id="base">            
            <h1>Find From Category</h1>
            <button className="all-button" id="all-button" onClick={() => handleClickJob("All")}>See all</button>
            <div className="job-cards" id="job-cards">
                <button className="scroll-btn" id="scroll-left-btn" onClick={scrollLeft}>{"<"}</button>
                {jobs.map(job => (
                    <div key={job.id} className="job-card">
                        <button className="job-button-smaller" id={`${job.job}`} onClick={() => handleClickJob(job.job)}>
                            <img className="job-image" src={`/static/images/${job.image}.png`} alt={job.job} />
                            <h2>{job.job}</h2>
                        </button>
                    </div>
                ))}
                <button className="scroll-btn" id="scroll-right-btn" onClick={scrollRight}>{">"}</button>
            </div>
            </div>

        </>
        ); 
}



const home = ReactDOM.createRoot(document.getElementById("home-container"));
home.render(<Home/>);


