import React, { Component } from 'react';
class TaskForm extends Component {


    constructor(props){
        super(props);
        this.state = {
            name : '',
            status : false

        }
    }
    onChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        if(name === 'status'){
            value = event.target.value=== "true"? true : false;
        }
        this.setState({
            [name] : value
        })
    }
    onSubmit = (event) =>{
        event.preventDefault();
        this.props.onSubmit(this.state);
        this.onClear();
        this.onCloseForm();
    }
    onCloseForm = () => {
        this.props.onCloseForm();
    }
    onClear =() => {
        this.setState({
            name : '',
            status : false
        })
    }
    render() {
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        Thêm Công Việc
                        <span
                            className="fa fa-times-circle text-right"
                            onClick ={this.onCloseForm}
                        >x</span>
                    </h3>
                </div>
                <div className="panel-body">
                    <form onSubmit = { this.onSubmit }>
                        <div className="form-group">
                            <label>Tên :</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value= {this.state.name}
                                onChange ={ this.onChange}
                            />
                        </div>
                        <label>Trạng Thái :</label>
                        <select
                            className="form-control"
                            name="status"
                            value= {this.state.status}
                            onChange ={ this.onChange}
                        >
                            <option value={true}>Kích Hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select><br/>
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">
                                <span className="fa fa-plus mr-5"></span>Lưu Lại
                            </button>&nbsp;
                            <button type="button" className="btn btn-danger" onClick= {this.onClear}>
                                <span className="fa fa-close mr-5"></span>Hủy Bỏ
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default TaskForm;