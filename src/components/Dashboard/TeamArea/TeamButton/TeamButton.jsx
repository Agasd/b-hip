import React, {Component} from "react";
import Button from "@material-ui/core/Button/index";
import DialogTitle from "@material-ui/core/DialogTitle/index";
import DialogContent from "@material-ui/core/DialogContent/index";
import TextField from "@material-ui/core/TextField/index";
import DialogActions from "@material-ui/core/DialogActions/index";
import Dialog from "@material-ui/core/Dialog/index";

export default class TeamButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name : '',
            partner: '',
            open: false,

        }
    }
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    };
    handleNewTeam = () => {
        fetch('/api/newTeam', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status === 200) {
                    this.props.callback("Team successfully created");
                    this.handleClose();
                } else {
                    const error = new Error(res.error);
                    console.log(error);
                    throw error;
                }
            })
            .catch(err => {
                this.props.callback("Team with same name already exists");
            });

    };
    render() {
        return (
            <div>
                <div id={this.props.id}>
                    <Button
                        onClick={this.handleClickOpen}
                        variant="outlined"
                        color="secondary"
                    >
                        New Team
                    </Button>
                </div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Register new team</DialogTitle>
                    <DialogContent>
                        <TextField
                        autoFocus
                        margin="normal"
                        id="name"
                        name="name"
                        label="Team name"

                        value={this.state.name}
                        onChange={this.handleInputChange}

                        fullWidth
                        required
                        />
                        <TextField
                            margin="normal"
                            id="partner"
                            name="partner"
                            label="Partner"

                            value={this.state.partner}
                            onChange={this.handleInputChange}

                            fullWidth
                            required
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleNewTeam} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}