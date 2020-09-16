import React , { Component } from "react";
import './Node.css'
class Node extends Component{

    render(){
        var {
            row,
            col,
            number,
            DefaultClass,
            onClick,
            numberProbability,
        } = this.props ; 

        
        return(
                <div className = {"singleCell " + DefaultClass}
                    id = {'Cell-'+row+"-"+col}
                    onClick = {()=> onClick(row , col)}>
                <div className = {'center robabilty-box number_'+number}>{number}</div>
                <div className = {'right robabilty-box number'+numberProbability[0]}>{numberProbability[0]}</div>
                <div className = {'lower-right robabilty-box number'+numberProbability[1]}>{numberProbability[1]}</div>
                <div className = {'down robabilty-box number'+numberProbability[2]}>{numberProbability[2]}</div>
                <div className = {'lower-left robabilty-box number'+numberProbability[3]}>{numberProbability[3]}</div>
                <div className = {'left robabilty-box number'+numberProbability[4]}>{numberProbability[4]}</div>
                <div className = {'upper-left robabilty-box number'+numberProbability[5]}>{numberProbability[5]}</div>
                <div className = {'up robabilty-box number'+numberProbability[6]}>{numberProbability[6]}</div>
                <div className = {'upper-right robabilty-box number'+numberProbability[7]}>{numberProbability[7]}</div>
    
          
        </div>
        )
    }
}


export default Node;