import React, {Component} from "react";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";

export class TeamName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            open: false
        };
    }

    componentDidMount() {

    }

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };
    synchronize = (event) => {
        const {value} = event.target;
        this.setState({name: value});
        this.props.updateFunction(value);
    };

    render() {
        return (
            <div>
                <Typography align={"center"} variant={"h2"} gutterBottom margin={"normal"}>
                    {this.state.name}
                    <Button className={"editBtn"} onClick={this.handleClickOpen} color="secondary">
                        Edit
                    </Button>
                </Typography>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Team name"
                            type="name"
                            defaultValue={this.state.name}
                            fullWidth
                            onChange={this.synchronize}
                        />
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}