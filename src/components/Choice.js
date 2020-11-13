import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'

export default class Choice extends Component {

    getChoiceCount = () => {
        if (this.props.picked){
            return this.props.choiceCount + 1
        } else {
            return this.props.choiceCount
        }
    }

    pickedCardStyle = {
        display: "inline-block",
        border: "5px solid",
        borderColor: "#5829bb"
    }

    notPickedCardStyle = {
        display: "inline-block",
    }

    render() {
        const choiceCount = this.getChoiceCount()
        const choicePercent = Math.round((choiceCount / (this.props.total + 1)) * 100) + "%"
        if (!this.props.choiceMade){
            return(
                    <Card fluid style={this.props.picked ? this.pickedCardStyle : this.notPickedCardStyle} onClick={this.props.handleChoice} className='choice-card'>
                        <Card.Content textAlign="center">
                            <Card.Description>
                            <div className='choice'>
                                <h1>{this.props.choice}</h1>
                            </div>
                            </Card.Description>
                        </Card.Content>
                    </Card>
            )
        } else {
            return(
                <Card fluid style={this.props.picked ? this.pickedCardStyle : this.notPickedCardStyle} className='choice-card'>
                    <Card.Content textAlign="center">
                        <Card.Description>
                        <div className='choice'>
                            {(choicePercent === "NaN%") ? <h1> </h1> : <h1>{choicePercent}</h1>}
                            <h4>{this.props.choice}</h4>
                            <h4>Picked {choiceCount} times</h4>
                        </div>
                        </Card.Description>
                    </Card.Content>
                </Card>
            )
        }
    }
}

