import React , { Component } from "react";
import Node from './Node/Node'
import './Board.css'

var PressedCell = null;
var rowPressed = null;
var colPressed = null;
var times = 0;
var InitialBoard =[ 
    [7, 6, 0, 0, 0, 9, 0, 1, 0], 
    [8, 0, 0, 0, 0, 0, 7, 2, 4], 
    [0, 0, 0, 7, 1, 4, 0, 0, 9], 
    [4, 0, 6, 0, 0, 0, 3, 0, 2], 
    [0, 7, 0, 4, 5, 6, 0, 0, 0], 
    [0, 5, 1, 0, 0, 0, 0, 7, 6], 
    [1, 0, 0, 2, 9, 0, 0, 4, 0], 
    [2, 0, 7, 6, 3, 0, 1, 0, 0], 
    [0, 9, 8, 0, 0, 5, 2, 0, 7]
] 
var pressedProbableNumber = null;

class Board extends Component{
    constructor(props){
        super(props);
        this.state = {
            sedukoGrid : [],
            MousePressed : false
        }
       
    }
    
    clickEvent(row , col){
        if(this.state.MousePressed == false){
            rowPressed = row;
            colPressed = col;
            PressedCell = document.getElementById("Cell-"+row+'-'+col);
            var classlist = PressedCell.classList;
            classlist.toggle('CellPressed')
            this.setState({MousePressed : true})
        }else{
            var classlist = PressedCell.classList;
            classlist.toggle('CellPressed')
            if(!(rowPressed == row && colPressed == col)){
                pressedProbableNumber = null
                rowPressed = row;
                colPressed = col;
                PressedCell = document.getElementById("Cell-"+row+'-'+col);
                classlist = PressedCell.classList;
                classlist.toggle('CellPressed');
                
                
            }else{
                pressedProbableNumber = null;
                this.setState({MousePressed : false})
            }
        }
       
    }
    componentDidMount(){
        var sedukoGrid = initialGrid();
        this.setState({sedukoGrid : sedukoGrid})
        document.addEventListener('keydown', this.HandleKeyPressed);
    }
    HandleKeyPressed = (event) =>{
        if(this.state.MousePressed && checkIfNumber(event.key)){
            var newGrid = this.state.sedukoGrid.slice();
            var changedCell = newGrid[rowPressed][colPressed]
            if(changedCell.numberProbability.indexOf(Number(event.key)) == -1){
                changedCell.numberProbability.push( Number(event.key) );
                pressedProbableNumber = Number(event.key)
                changedCell.numberProbability.sort();
                this.setState({sedukoGrid : newGrid})
            }

        }
        if(this.state.MousePressed && event.key == "Enter" && pressedProbableNumber != null){
            var newGrid = this.state.sedukoGrid.slice();
            var changedCell = newGrid[rowPressed][colPressed]
            var errorBoxs = Validation(newGrid , rowPressed , colPressed , pressedProbableNumber);
            for (var SingleCell of errorBoxs){
                PressedCell = document.getElementById("Cell-"+SingleCell.row+'-'+SingleCell.col);
                PressedCell.style.backgroundColor = '#ff9999';
            }
            PressedCell = document.getElementById("Cell-"+rowPressed+'-'+colPressed);
            if(errorBoxs.length == 0){
                PressedCell.style.backgroundColor = '#ffffff'
            }
         
            changedCell.number = pressedProbableNumber;
            pressedProbableNumber = null
            changedCell.numberProbability = [];
           
         
            var classlist = PressedCell.classList;
            classlist.toggle('CellPressed');
            this.setState({sedukoGrid : newGrid , MousePressed : false})
        }
        if(this.state.MousePressed && event.key == "Delete"){
            var newGrid = this.state.sedukoGrid.slice();
            var changedCell = newGrid[rowPressed][colPressed]
            changedCell.numberProbability = [];
            changedCell.number = ''

            PressedCell = document.getElementById("Cell-"+rowPressed+'-'+colPressed);
            var classlist = PressedCell.classList;
            classlist.toggle('CellPressed');
            this.setState({sedukoGrid : newGrid , MousePressed : false})

        }

    }

    startAlgotihm(i , j){
        const newGrid = this.state.sedukoGrid;
        while (newGrid[i][j].number != ''){

            if(j < 8){
                j += 1 ;
            }else if(j == 8 && i< 8){
                j = 0;
                i++;
            }else if(i == 8 && j == 8){
             
                for(var randomNumber = 0; randomNumber <newGrid.length;randomNumber++){
                    var single = []
                    for(var k = 0; k <newGrid[0].length;k++){
                        single.push(newGrid[randomNumber][k].number)
                    }
                   
                }
                setTimeout(() => {
                    this.setState({sedukoGrid : newGrid})
                }, 8 * 140 + 8 *140);
               
                return true;
            }
         
        }
      
          
      

            for(var randomNumber = 1; randomNumber <10;randomNumber++){

                if(validate(newGrid , i , j ,randomNumber)){
                    const animate = setTimeout(() => {
            
                        var Cell = document.getElementById("Cell-"+i+'-'+j);
                        var classlist = Cell.classList;
                        classlist.add('Cell-toggle')
                        var center =  Cell.getElementsByClassName('center')[0]
                        
                        center.innerText= randomNumber;
                    } , i * 140 + j *140) // 40 * times
                    times = times + 1;
                    newGrid[i][j].number = randomNumber;
                    if(this.startAlgotihm(i,j) == 1){
                        return true
                    }else{
                        newGrid[i][j].number = ''
                    }
                }
            }
    
        
        return false;
    }
    reset(){

        const newGrid = initialGrid();
        for(var i = 0;i<newGrid.length;i++){
            for(var j = 0;j<newGrid[0].length;j++){
                var Cell = document.getElementById("Cell-"+i+'-'+j);
                var classlist = Cell.classList;
                var conidtion = false;
                for(var q = 1; q <classlist.length;q++){
                    if(classlist[q] == 'Cell-toggle'){
                        conidtion = true;
                    }
                }
                if(conidtion){
                    classlist.remove('Cell-toggle')
                }
            }
        }
       
        this.setState({sedukoGrid : newGrid})
    }

 

    render(){
        var grid = this.state.sedukoGrid;
        return(
            <div className = "container">
                <div>
                    <button className='btn btn-primary start' onClick = {()=> this.startAlgotihm(0,0)}> Start</button>
                    <button className = 'btn btn-outline-danger start' onClick = {() => this.reset()}>Reset</button>
                </div>

               {grid.map((row , rowIndex)=>{
                   return(
                       <div className = "singleRow">
                           {row.map((Cell , CellIndex) =>{
                               return(
                                <Node
                                row = {rowIndex}
                                col = {CellIndex}
                                number = {Cell.number}
                                DefaultClass = {Cell.DefaultClass}
                                numberProbability = {Cell.numberProbability}
                                onClick = {(rowIndex , CellIndex) => this.clickEvent(rowIndex , CellIndex)}
                                ></Node>
                               );
                           })}
                       </div>
                   );
               })}
            </div>
        );
    }
}

function initialGrid(){
    let grid = [];
    for(var i = 0;i <9;i++){
        var singleRow = [];
        for(var j = 0;j <9;j++){
            var singleSqaure = CreateSquare(i , j , InitialBoard[i][j])
            singleRow.push(singleSqaure);
        }
        grid.push(singleRow)
    }

    return grid;
}
function CreateSquare(row , col , number){
    var sqaure;
    var DefaultClass = '';
    if(row == 2 || row == 5){
        DefaultClass = DefaultClass + "bottom-border ";
    }else if(row == 3 || row == 6){
        DefaultClass = DefaultClass + "top-border ";
    }

    if(col == 2 || col == 5){
        DefaultClass = DefaultClass + "right-border ";
    }else if(col == 3 || col == 6){
        DefaultClass = DefaultClass + "left-border ";
    }
    if(number == 0){
        number = '';
    }
    sqaure = {
        row : row,
        col : col,
        number : number,
        DefaultClass : DefaultClass,
        numberProbability : []
    };
    return sqaure;
}
function checkIfNumber(CodeNumber){
    if(CodeNumber >= 1  && CodeNumber<= 9){
        return true;
    }
    return false;
}
function Validation(Grid , row , col , number){
    var errorBoxs = []
    for(var i = 0;i<9;i++){
        if(Grid[row][i].number == number){
            
            errorBoxs.push(Grid[row][i])
        }
        if(Grid[i][col].number == number){
            errorBoxs.push(Grid[i][col])
        }
    }
    var it = Math.floor(row/3);
    var jt = Math.floor(col/3);
    for(var i = it * 3; i<it * 3 + 3;i++){
        for(var j = jt * 3;j<jt * 3 + 3;j++){
            if(Grid[i][j].number == number){
               errorBoxs.push(Grid[i][j])
            }
        }
    }
    return errorBoxs
}
function validate(Grid , row , col , number){
    for(var i = 0;i<9;i++){
        if(Grid[row][i].number == number){
            
            return false
        }
        if(Grid[i][col].number == number){
            return false
        }
        var it = Math.floor(row/3);
        var jt = Math.floor(col/3);
        for(var k = it * 3; k<it * 3 + 3;k++){
            for(var l = jt * 3;l<jt * 3 + 3;l++){
                if(Grid[k][l].number == number){
                    return false
                }
            }
        }
    
    }
    return true 
}
export default Board;