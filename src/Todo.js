import React, {Component} from 'react'
import uuid from "uuid";


class Todo extends Component{
    
    constructor(props) {
        super(props)

       this.input=React.createRef()
       this.state={
           list:[],
           id:'',
           value: '',
           completed: '',
           showInput: false
          }

          this.handleChange = this.handleChange.bind(this)
    }

    completedStyle = {
        fontStyle: "italic",
        color: "#cdcdcd",
        textDecoration: "line-through"

    }

    handleChange(id){
        this.setState(prevState => {
            const updateList = prevState.list.map(todo => {
                if(todo.id === id){
                    todo.completed = !todo.completed
                }
                return todo
            })
            return {
                list: updateList
                
            }
        })

        localStorage.setItem("list", JSON.stringify(this.state.list))

    }


    addTask = () =>{
        const Items={
            id:uuid.v4(),
            value: this.input.current.value,
            completed: "false"
        };

        if(localStorage.getItem('list')==null){
            const list = []
            list.push(Items)
            localStorage.setItem("list", JSON.stringify(list))
        }
        else{
            const list = JSON.parse(localStorage.getItem('list'))
            list.push(Items)
            localStorage.setItem("list", JSON.stringify(list))
        }
        this.setState({
            list:JSON.parse(localStorage.getItem('list'))
        });
    }

    editTask = (id,value) =>{

        const list = JSON.parse(localStorage.getItem('list'))
        list.map(item=>{
            if(item.id===id){
              item.value=value;
            }
          })
          this.setState({
            list:list
          })
          localStorage.setItem("list", JSON.stringify(list))        
    }



componentDidMount(){
    const List = window.localStorage.getItem('list')
    const parseList = JSON.parse(List)

    if(List ==null){
        return false
    }
    else{
        this.setState({
            list: parseList
        });
    }
}


deleteItem = (event) =>{
    let index = event.target.getAttribute('data-key')
    let listValue = JSON.parse(localStorage.getItem('list'))
    listValue.splice(index,1)
    this.setState({list:listValue})
    localStorage.setItem('list',JSON.stringify(listValue))
}


clearTask = () =>{

    localStorage.clear();
    
    this.setState({
        list:[],
    });
}

operation(){
    this.setState({
        showInput: !this.state.showInput
    })
}
    render() {
        return (
            <div className="main-container">
                <h1>My Todo List</h1>
                <hr/>
                <div className="todo-item">
                    <input className="add-input" type="text" placeholder="Insert Here" ref={this.input}></input>
                        <button onClick={this.addTask} className="button" >+</button>
                            <ul className="ba">
                                {
                                    this.state.list.map((item,index)=>
                                    {
                                        return(
                                        <li key={item.id}> 
                                        <div   className="todo-div">
                                        <div   className="todo-div">
                                        <input type="checkbox" onChange={(event)=>this.handleChange(item.id)}></input>

                                            {
                                                this.state.showInput?
                                                <div className="todo-div">
                                                    <input  className="input-view" type="text" id={item.id} value={item.value} onChange={(e)=>{this.editTask(item.id,e.target.value)}}/>
                                                    <button className="editbtn" type="button" onClick={() => this.operation()}>Done</button>
                                                </div>
                                                :null


                                            }

                                            {
                                                !this.state.showInput?
                                                <label style={!item.completed ? this.completedStyle: null}>{item.value}</label>
                                                :null
                                            }


                                        </div>
                                        <div className="btn-div">
                                            <button className="editbtn" type="button" value="edit" onClick={() => this.operation()}>Edit</button>
                                            <button className="button" type="button" value="delete" data-key={index} onClick={this.deleteItem}>Delete</button>
                                        </div>

                                        </div>
  
                                        <hr/>

                                        </li>)
                                    })
                                } 
                            </ul>

                        <div className="btn-div">
                            <button onClick={this.clearTask} className="editbtn" >clear</button>
                        </div>

                </div>

            </div>
        )
    }
}

export default Todo;