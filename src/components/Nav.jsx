import './nav.css'

export default function Nav() {
    
    return(
        <div className="nav">
            <div className="logo">
                <h3>Where in the world ?</h3>
            </div>
            <div className='nav-btn'>
                <p>Quizz</p>
            </div>
            <div className="dark-btn">
                <button className="darkmode">Dark</button>
            </div>
        </div>
    )
}