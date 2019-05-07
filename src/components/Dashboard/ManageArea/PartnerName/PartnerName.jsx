import React, {Component} from "react";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";


export class PartnerName extends Component {
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
                <Typography align={"center"} variant={"h5"} gutterBottom margin={"normal"}>
                    Partner: {this.state.name}
                    <Button className={"editBtn"} color="secondary" onClick={this.handleClickOpen}>
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
                            label="Partner name"
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