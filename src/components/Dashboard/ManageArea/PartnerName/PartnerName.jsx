import React, {Component} from "react";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";


export class PartnerName extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {

    }
    render() {
     return(
         <div>
             <Typography align={"center"} variant={"h5"} gutterBottom margin={"normal"}>
                 Partner: {this.props.name}
                 <Button className={"editBtn"} color="secondary">
                     Edit
                 </Button>
             </Typography>
         </div>
     )
    }
}