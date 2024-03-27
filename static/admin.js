

function AdminLogin({ setIsAdmin }) {
    const [error, setError] = React.useState("");
    const adminUser = "admin"
    const adminPassword = "adminadmin"
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    
    const handleLogin = (e) => {
        e.preventDefault(); 
        if (username === adminUser && password === adminPassword) {
            alert('Login successful!');
            setIsAdmin(true);
            setError('');
            localStorage.setItem('isAdmin', true);


        } else {
            setIsAdmin(false);
            setError('Invalid username or password');
        }
    };

    
    return (
        <>
        <div className="base" id="base">
            <div className="adminlogin" id="adminlogin">
            <h3>Admin Login</h3>
            <form onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password"  onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit">Login</button>
            </form>
            {error && <div className="error">{error}</div>}

            </div>

        </div>
        </>
        ); 
}


function AdminArea() {
    const [cards, setCards] = React.useState([]);
    const [showAddNewCard, setShowAddNewCard] = React.useState(false); 
    const [jobs, setJobs] = React.useState([]);
    const [selectedJob, setSelectedJob] = React.useState("");
    const [name, setName] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [editing, setEditing] = React.useState(false); // State to track if editing is enabled


    React.useEffect(() => {
        axios.get("http://127.0.0.1:5000/api/jobs").then(response => {
            setJobs(response.data);
            
        }).catch(error => {
            console.error("Error fetching jobs:", error);
        });
    }, []);

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
        fetchCards();
    }, []);
    
    const deleteCard = (cardID) => {
        axios.post('/delete_card', {id: cardID}).then(response => {
            console.log("PASS TO DELETE");
            fetchCards();
        });
    };

    const displayAddCardForm = () => {
        setShowAddNewCard(true);
    };

    const noneDisplayAddCardForm = () => {
        setShowAddNewCard(false);
    };

    const handleJobChange = (e) => {
        setSelectedJob(e.target.value);
    };

    const addCard = (e) => {
        e.preventDefault(); 
        axios.post('/add_card', {job: selectedJob, name:name, phone:phone }).then(response => {
            console.log("PASS TO ADD");
            fetchCards();
        });
        setShowAddNewCard(false);
        setSelectedJob("");
    };

    const displayEditCard = () => {
        setEditing(true); 
    }

    const editCard = (id, name, phone) => {
        setName(name);
        setPhone(phone);
        axios.post('/update_card', {id: id, name:name, phone:phone }).then(response => {
            console.log("PASS TO UPDATE");
            fetchCards();
        });
        setEditing(false);
    };


    return (
        <>
            <div className="column-container" id="">
                <h1>Admin Area</h1>
                <button className="all-button" id="add-new-button" onClick={displayAddCardForm}>Add new professional</button>
                
                {showAddNewCard && (
                    <form className="add-new-card" onSubmit={addCard}>
                        <h2>{editing ? 'Edit Professional' : 'Add New Professional'}</h2>
                        <div>
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" onChange={(e) => setName(e.target.value)}  required />
                        </div>
                        <div>
                            <label htmlFor="profession">Profession:</label>
                            <select id="profession" value={selectedJob} onChange={handleJobChange}  required>
                                <option value="">Select Job</option>
                                {jobs.map(job => (
                                    <option key={job.id} value={job.id}>{job.job}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="phone">Phone:</label>
                            <input type="text" id="phone" onChange={(e) => setPhone(e.target.value)}  required />
                        </div>
                        <button type="submit">Add</button>
                        <button type="submit" onClick={noneDisplayAddCardForm}>Close</button>
                    </form>
                )}
                
                <div className="pro-cards" id="pro-cards">
                    {cards.map(card => (
                        <div key={card.id} className="pro-card" id="pro-card">
                            <button className="card-admin">
                                <h2>{card.profession}</h2>

                                <input type="text" id="name" placeholder={card.name} onChange={(e) => setName(e.target.value)} disabled={!editing} required />
                                <input type="text" id="phone" placeholder={card.phone} onChange={(e) => setPhone(e.target.value)} disabled={!editing} required />

                                { !editing ? (
                                    <>
                                        <button id="card-delete" className="admin-button" onClick={() => deleteCard(card.id)}>
                                            <img className="actionlogo" src={`/static/images/trash.png`} />
                                        </button>
                                        <button id="card-edit" className="admin-button" onClick={() => displayEditCard()}>
                                            <img className="actionlogo" src={`/static/images/pen.png`} />
                                        </button>
                                    </>
                                ) : (
                                    <div>
                                            <button type="submit" onClick={() => editCard(card.id, name, phone)}>Update</button>

                                    </div>
                                )}

                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}


function AdminPanel() {
    const [isAdmin, setIsAdmin] = React.useState(false);

    return (
        <div>
            {isAdmin || localStorage.getItem('isAdmin') === 'true' ? <AdminArea /> : <AdminLogin setIsAdmin={setIsAdmin} />}
        </div>
    );
}

const admin = ReactDOM.createRoot(document.getElementById("admin-container"));
admin.render(<AdminPanel />);

