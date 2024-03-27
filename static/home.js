

function Home() {
    const [jobs, setJobs] = React.useState([]);
    const [clickedJob, setClickedJob] = React.useState(null); // State to track the clicked job

    React.useEffect(() => {
        axios.get("http://127.0.0.1:5000/api/jobs").then(response => {
            setJobs(response.data);
        }).catch(error => {
            console.error("Error fetching jobs:", error);
        });
    }, []);

    
    return (
        <>
        <div className="base" id="base">
            <h1>Find From Category</h1>
            <a href="/cards" className="all-button" id="all-button">See all</a>
            <div className="job-cards" id="job-cards">
                {jobs.map(job => (
                    <div key={job.id} className="job-card">
                        <button className="job-button" id={`${job.job}`} >
                        <img className="job-image" src={`/static/images/${job.image}.png`} alt={job.job} />
                        <h3>{job.job}</h3>
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


