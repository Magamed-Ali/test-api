import React, {useEffect, useState} from 'react';
import svg from "./images/restart_system_icon_218079.svg";

function App(props) {
    const [currentDay, setCurrentDay] = useState([]);
    const [previousPeriod, setPreviousPeriod] = useState([]);
    let difference1 = [];
    let difference2 = [];
    let sharedarray = [];
    const [color, setColor] = useState(true);

    useEffect(() => {

        fetch('https://www.cbr-xml-daily.ru/archive/2022/02/10/daily_json.js')
            .then(response => response.json())
            .then((json) => {
                setCurrentDay(json.Valute)
            })

        fetch('https://www.cbr-xml-daily.ru/archive/2022/02/11/daily_json.js')
            .then(response => response.json())
            .then((json) => {
                setPreviousPeriod(json.Valute)
            })
    }, [])
    sharedarray = difference1.map((val, idx) => val + difference2[idx])

    const handleClick = () => setColor(!color)
    return (
        <div className = {`box ${color ? "night" : "day"}`}>
            <img src={svg} className="luminaire"  onClick={handleClick}/>
            <div className="current-day">
                <div className="day">Предыдущий день
                    {Object.values(previousPeriod).map(i => {
                        difference1.push(i.Value)
                        return (
                            <div>
                                <ul>
                                    <li title={i.Name}>{i.CharCode}</li>
                                    <li>{i.Value}</li>
                                </ul>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="current-day">
                <div className="day">Текуший день
                    {Object.values(currentDay).map(i => {
                        difference2.push(i.Value)
                        return (
                            <div>
                                <ul>
                                    <li title={i.Name}>{i.CharCode}</li>
                                    <li>{i.Value}</li>
                                </ul>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="current-day">
                <div className="day">Разница
                    {difference1.length == 0 ? "no data" : sharedarray = difference1.map((val, idx) =>
                        <ul>
                            <li>
                                {(((val * 100) / difference2[idx]) - 100).toFixed(3)}
                            </li>
                            <li>
                                {(((val * 100) / difference2[idx]) - 100).toFixed(3) > 0 ?
                                    <span style={{color: "#3eb900"}}>&#9650;</span> :
                                    <span style={{color: "#ee0000"}}>&#9660;</span>}
                            </li>
                        </ul>
                    )
                    }
                </div>
            </div>
        </div>
    );
}

export default App;