function  Base() {
    return (
        <>
        <div className="home" id="home">
            <a href="/"><img className="home-logo" src="/static/images/home.png"/></a>
            <a href="/admin"><img className="admin-logo" src="/static/images/admin.png"/></a>
            <div className="logo" id="logo">
                <img className="logo" src="/static/images/logo.png"/>
            </div>
            <div className="search" id="search">
                <input type="text" className="home-search" placeholder="Free search..." />
            </div>
        </div>
        </>
        ); 
}


const main = ReactDOM.createRoot(document.getElementById("base-container"));
main.render(<Base/>);


