import Card from '../../../shared/components/UIElements/Card';
import React from 'react';
import './card.css';
const HomeCard = props => {
return (
    <Card className = "container">
        <div className = "top">
            <h3 className = "title-card">{props.title}</h3>
        </div>
        <div className = "desc-card">
            <p>{props.description}</p>
        </div>
    </Card>
)

};


export default HomeCard;