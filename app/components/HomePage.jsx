import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router';

export default class BonesJokes extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div id="home-page">
                <div id="center-home" className="inner-div">
                    <h1>Yahtzee!</h1>
                    <img src="https://s-media-cache-ak0.pinimg.com/originals/3c/bc/61/3cbc61ad3f1782b5a23949baaf225b69.jpg" />
                    <h4>Choose to play against the computer or another player.</h4>
                    <Link to="/game">
                        <Button className="buttons" bsSize="large">Play Computer</Button>
                    </Link>
                    <Button className="buttons" bsSize="large">Play Another Player</Button>
                </div>
            </div>
        )
    }
}