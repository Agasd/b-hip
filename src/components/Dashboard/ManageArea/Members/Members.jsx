import React, {Component} from "react";
import Input from "@material-ui/core/Input";

import './Members.css'
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import Button from "@material-ui/core/Button";


export class Members extends Component {
    constructor(props) {
        super(props);
        this.state = {
            members: this.props.members
        };
    }

    addNew = () => {
        let temp = this.state.members;
        temp.push("");
        this.setState({
            members: temp
        });
        this.props.updateFunction(this.state.members);
    };
    removeMember = (index) => {
        const temp = this.state.members;
        console.log(index);
        console.log(temp);
        let filtered_temp = temp.slice(0, index).concat(temp.slice(index + 1, temp.length));
        console.log(filtered_temp);
        this.setState({
            members: filtered_temp
        });
        this.props.updateFunction(this.state.members);
    };
    synchronize = (event, index) => {
        if (this._timeout) { //if there is already a timeout in process cancel it
            clearTimeout(this._timeout);
        }
        const {value} = event.target;
        this._timeout = setTimeout(() => {
            this._timeout = null;
            const temp = this.state.members;
            temp[index] = value;
            this.setState({
                members: temp
            });
            this.props.updateFunction(this.state.members);
        }, 1000);
    };

    render() {
        let members = this.state.members.map((item, i) =>
            <li key={i + 1 + item}>
                <span>{i + 1}: </span>
                <Input
                    className={"memberName"}
                    defaultValue={item}
                    inputProps={{
                        'aria-label': 'Description',
                    }}
                    onChange={(event) => {
                        this.synchronize(event, i);
                    }}
                />
                <IconButton onClick={() => {
                    this.removeMember(i)
                }} aria-label="Delete">
                    <DeleteIcon/>
                </IconButton>
            </li>
        );
        return (
            <div className={"memberDiv"}>
                <ul>
                    {members}
                </ul>
                <Button onClick={this.addNew} variant="contained">
                    Add new Member
                </Button>
            </div>
        )
    }
}
