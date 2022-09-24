import React, { useState, useEffect } from 'react';
import './App.css';
import Scroll from '../components/Scroll';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import ErrorBoundary from '../components/ErrorBoundary';

function App() {

    const [robots, setRobots] = useState([])
    const [searchfield, setsearchfield] = useState('')

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => {
                setRobots(users)
            });
    }, [])


    const onSearchChange = (event) => {
        setsearchfield(event.target.value)
    }

    const filteredRobots = robots.filter(robot => {
        return robot.name.toLocaleLowerCase().includes(searchfield.toLocaleLowerCase());
    })

    return (!robots.length) ?
        (<h1>Loading</h1>)
        :
        (
            <div className='tc'>
                <h1 className='f1'>Robo Friends</h1>
                <SearchBox searchChange={onSearchChange} />
                <Scroll>
                    <ErrorBoundary>
                        <CardList robots={filteredRobots} />
                    </ErrorBoundary>
                </Scroll>
            </div>
        );

}

export default App