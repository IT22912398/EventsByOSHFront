import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box, Rating, Card, CardContent, IconButton, Avatar } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from '../main_parts/navbar.user.log.js';
import Footer from '../main_parts/footer.js';
import '../APIUrl.js';

function FeedBack() {
    const userName = sessionStorage.getItem('user_name');

    const feedbackId = Math.floor(Math.random() * 100000);
    const [email, setEmail] = useState(userName);
    const [description, setDescription] = useState("");
    const [rating, setRating] = useState(0);
    const [errors, setErrors] = useState({});
    const [feedbacks, setFeedbacks] = useState([]);
    const [editBtn, setEditBtn] = useState(false);

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const fetchFeedbacks = async () => {
        try {
            const response = await axios.get(global.APIUrl + "/feedback/allfeedback");
            setFeedbacks(response.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    const validateForm = () => {
        const errors = {};
        let isValid = true;

        if (!description.trim()) {
            errors.description = "Description is required";
            isValid = false;
        }

        if (rating === 0) {
            errors.rating = "Rating is required";
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const feedback = { feedbackId, email, description, rating };
            try {
                const response = await axios.post(global.APIUrl + "/feedback/addfeedback", feedback);
                Swal.fire({
                    title: "Success!",
                    text: "Feedback submitted successfully",
                    icon: 'success',
                    confirmButtonText: "OK",
                    type: "success"
                });
                fetchFeedbacks();
                clearForm();
            } catch (error) {
                console.log(error.message);
                Swal.fire({
                    title: "Error!",
                    text: "Failed to submit feedback",
                    icon: 'error',
                    confirmButtonText: "OK",
                    type: "success"
                });
            }
        }
    };

    const remove = async (feedbackId) => {
        try {
            await axios.delete(global.APIUrl + "/feedback/deletefeedback/" + feedbackId);
            Swal.fire({
                title: "Success!",
                text: "Feedback deleted successfully",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"
            });
            fetchFeedbacks();
        } catch (error) {
            console.log(error.message);
            Swal.fire({
                title: "Error!",
                text: "Failed to delete feedback",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            });
        }
    };

    const edit = (feedbackId, description, rating, email) => {
        localStorage.setItem("feedbackId", feedbackId);
        setEmail(email);
        setDescription(description);
        setRating(rating);
        setEditBtn(true);
    };

    const editing = async () => {
        if (validateForm()) {
            const feedback = { feedbackId: localStorage.getItem("feedbackId"), email, description, rating };
            try {
                await axios.put(global.APIUrl + "/feedback/updatefeedback", feedback);
                Swal.fire({
                    title: "Success!",
                    text: "Feedback updated successfully",
                    icon: 'success',
                    confirmButtonText: "OK",
                    type: "success"
                })
                fetchFeedbacks();
                clearForm();
                setEditBtn(false);
            } catch (error) {
                console.log(error.message);
                Swal.fire({
                    title: "Error!",
                    text: "Failed to update feedback",
                    icon: 'error',
                    confirmButtonText: "OK",
                    type: "success"
                })
            }
        }
    };

    const clearForm = () => {
        setDescription("");
        setRating(0);
    };

    const renderRatingStars = (rating) => {
        const stars = [];
        for (let i = 0; i < rating; i++) {
            stars.push(<span key={i}>&#9733;</span>);
        }
        for (let i = rating; i < 5; i++) {
            stars.push(<span key={i}>&#9734;</span>);
        }
        return stars;
    };

    return (
        <div>
            <div className="pt-1 pb-1" style={{ backgroundColor: '#F4F4F4' }}>
                <center>
                    <small style={{ fontSize: '14px', letterSpacing: '2px' }} className="text-muted text-capitalize">The Largest Event Management Hub In The Sri Lanka</small>
                </center>
            </div>
            <Navbar />
            <br />
            <br />
            <center>
                <div className='card' style={{ backgroundColor: "", boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", width: "40%" }}>
                    {editBtn ? (
                        <h3 style={{ marginTop: '40px' }}>Edit Your FeedBack</h3>
                    ) : (
                        <h3 style={{ marginTop: '40px' }}>Make Your FeedBack</h3>
                    )}

                    <div className="row container-fluid" style={{ marginTop: '7%', marginBottom: '7%' }}>
                        {editBtn ? (
                            <form onSubmit={editing} style={{ width: '100%' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Avatar style={{ backgroundColor: 'theme.palette.secondary.main', marginRight: '20px', }}>{email[0]}</Avatar>
                                    <TextField
                                        id="email"
                                        label="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        disabled
                                    />
                                    <TextField
                                        id="description"
                                        label="Description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        error={errors.description}
                                        helperText={errors.description}
                                        multiline
                                        rows={4}
                                    />
                                    <Typography component="legend">Rate your experience:</Typography>
                                    <Rating
                                        name="rating"
                                        value={rating}
                                        onChange={(event, newValue) => {
                                            setRating(newValue);
                                        }}
                                        size="large"
                                        error={errors.rating}
                                    />
                                    {errors.rating && <Typography variant="body2" color="error">{errors.rating}</Typography>}
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        sx={{ mt: 2 }}
                                    >
                                        Edit
                                    </Button>
                                </Box>
                            </form>
                        ) : (
                            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Avatar style={{ backgroundColor: 'theme.palette.secondary.main', marginRight: '20px', }}>{email[0]}</Avatar>
                                    <TextField
                                        id="email"
                                        label="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        disabled
                                    />
                                    <TextField
                                        id="description"
                                        label="Description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        error={errors.description}
                                        helperText={errors.description}
                                        multiline
                                        rows={4}
                                    />
                                    <Typography component="legend">Rate your experience:</Typography>
                                    <Rating
                                        name="rating"
                                        value={rating}
                                        onChange={(event, newValue) => {
                                            setRating(newValue);
                                        }}
                                        size="large"
                                        error={errors.rating}
                                    />
                                    {errors.rating && <Typography variant="body2" color="error">{errors.rating}</Typography>}
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        sx={{ mt: 2 }}
                                    >
                                        Submit
                                    </Button>
                                </Box>
                            </form>
                        )}
                    </div>
                </div>

                <div style={{ marginTop: '40px', width: '60%' }}>
                    {feedbacks.map((feedback) => (
                        <Card key={feedback.feedbackId} style={{ marginBottom: '20px' }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                    <Avatar style={{ backgroundColor: 'theme.palette.secondary.main', marginRight: '20px', }}>{feedback.email[0]}</Avatar>
                                    <Typography variant="h6" sx={{ marginLeft: '10px' }}>Feedback ID: {feedback.feedbackId}</Typography>
                                </Box>
                                <Typography variant="body1">Description: {feedback.description}</Typography>
                                <Typography variant="body1">Rating: {renderRatingStars(feedback.rating)}</Typography>
                                {feedback.email === userName ? (
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                                        <IconButton color="primary" onClick={() => edit(feedback.feedbackId, feedback.description, feedback.rating, feedback.email)}>
                                            <Edit />
                                        </IconButton>
                                        <IconButton color="error" onClick={() => remove(feedback.feedbackId)}>
                                            <Delete />
                                        </IconButton>
                                    </Box>
                                ) : (
                                    <></>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </center>
            <Footer />
        </div>
    );
}

export default FeedBack;
