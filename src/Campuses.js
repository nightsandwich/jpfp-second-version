import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { deleteCampus } from "./store";
import {Button, Grid,Typography, CardActionArea, CardActions, CardContent, Card, CardMedia} from '@mui/material';

const Campuses = ({campuses}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    if (!campuses.length){
        return (
            <h1>loading...</h1>
        )
    }
    return (   
    <div>
        <div className='addContainer'>
            <Grid container spacing={2}  direction='row' >
            {
                campuses.map(campus => {
                    return (
                        <Grid key={campus.id} item xs={7} sm={4}>
                        <Card sx={{ maxWidth: 400, maxHeight: 400}} >
                            <CardActionArea onClick={()=>history.push(`/campuses/${campus.id}`)}>
                                <CardMedia
                                    component="img"
                                    height="130"
                                    image={campus.imageUrl}
                                    alt="campus image"
                                />
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                    {campus.name}
                                    </Typography>
                                    <Typography variant="body1" color="text.primary">
                                    {campus.students.length === 0 ? 'No students enrolled.' : campus.students.length === 1 ? '1 student enrolled.' : `${campus.students.length} students enrolled.`}
                                    </Typography>
                                </CardContent>
                            </CardActionArea >
                            <CardActions>
                                <Button onClick={()=>dispatch(deleteCampus(campus.id))} size="small" variant="contained" color='error'>
                                    Delete
                                </Button>
                                <Button onClick={()=>history.push(`/campuses/${campus.id}`)} variant="contained" color="primary" size="small">
                                    Learn More
                                </Button>
                            </CardActions>
                        </Card>
                        </Grid>
                    );
                })
            }
            </Grid>
        </div>
    </div>
    );
}

export default Campuses;


