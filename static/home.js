

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
    
    return (
        <>
        <div className="base" id="base">
            <h1>Smart Search</h1>
            
            <h1>Find From Category</h1>
            <button className="all-button" id="all-button" onClick={() => handleClickJob("All")}>See all</button>
            <div className="job-cards" id="job-cards">
                {jobs.map(job => (
                    <div key={job.id} className="job-card">
                        <button className="job-button" id={`${job.job}`} onClick={() => handleClickJob(job.job)}>
                        <img className="job-image" src={`/static/images/${job.image}.png`} alt={job.job} />
                        <h2>{job.job}</h2>
                        </button>
                    </div>
                ))}
            </div>
            </div>

        </>
        ); 
}



const home = ReactDOM.createRoot(document.getElementById("home-container"));
home.render(<Home/>);


