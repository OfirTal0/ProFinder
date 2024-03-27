function  Base() {
    return (
        <>
        <div className="home" id="home">
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


