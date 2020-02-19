import React , { Component} from 'react';
import './App.css';
import TaskForm from './componlent/TaskForm';
import TaskControl from './componlent/TaskControl';
import TaskList from './componlent/TaskList';
class App extends Component {
    constructor(props){
        super(props);
        this.state ={
            task : [],
            isDisplayForm : false

        }
    }
    componentWillMount(){
        if(localStorage&&localStorage.getItem){
            var task=JSON.parse(localStorage.getItem('task'));
        }
        this.setState({
            task : task
        })
    }
    onGenderateData = () =>{
        var task =[
            {
                id : this.genderateId() ,
                name :'hoc tap',
                status : false

            },
            {
                id : this.genderateId(),
                name :'an',
                status : true

            },
            {
                id : this.genderateId(),
                name :'ngu',
                status : true

            }
        ]
        this.setState({
            task : task
        });
        localStorage.setItem('task', JSON.stringify(task));
    }
    s4(){
        return Math.floor((1+Math.random())*0x10000).toString(16).substring(1);
    }
    genderateId(){
        return this.s4()+this.s4();
    }
    onToggleForm = () => {
        if(this.state.isDisplayForm===false){
            this.setState ({
                isDisplayForm : true
            })
        }else{
            this.setState ({
                isDisplayForm : false
            })
        }
    }
    onCloseForm = () => {
        this.setState ({
            isDisplayForm : false
        })
        
    }
    onSubmit = (data) => {
        var {task}= this.state;

        data.id = this.genderateId();
        task.push(data);
        this.setState({
            task: task
        });
        localStorage.setItem('task',JSON.stringify(task));  
    }
    onUpdateStatus = (id) => {
        var {task} = this.state;
        var index = this.findIndex(id);
        task[index].status= !task[index].status;
        this.setState({
            task : task
        })
        localStorage.setItem('task', JSON.stringify(task));
    }
    findIndex = (id) => {
        var {task} = this.state;
        var result = -1;
        task.map((task, index) =>{
            if(task.id === id){
                result= index;
            }
        });
        return result;
    }
    render() {
        var { task , isDisplayForm } = this.state;
        var elmTaskFrom = isDisplayForm ? <TaskForm onSubmit={ this.onSubmit } onCloseForm ={ this.onCloseForm }/> : ""
        return (
            <div className="container">
                <div className="text-center">
                    <h1>Quản Lý Công Việc</h1><hr/>
                </div>
                <div className="row">
                    <div className={ isDisplayForm ?'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}>
                        { elmTaskFrom }
                    </div>
                    <div className={ isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
                        <button type="button" className="btn btn-primary" onClick ={ this.onToggleForm }>
                            <span className="fa fa-plus mr-5"></span>
                            Thêm Công Việc
                        </button>
                        <button type="button" className="btn btn-danger ml-5" onClick = {this.onGenderateData }>
                            Genderte Data
                        </button>
                        <TaskControl />
                        <TaskList task={task} onUpdateStatus = { this.onUpdateStatus } />
                    </div>
                </div>
            </div>
        );
    }
}
export default App;