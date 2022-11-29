import React from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {Button, Grid} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {Typography} from "@mui/material";
import Divider from "@mui/material/Divider";
import Chip from '@mui/material/Chip';

export const CommentForm = () => {
    return (
        <>
        <Grid container spacing={1} sx={{
            width : "100vw",
            backgroundColor : "#212528",
            marginLeft : "0px",
            border  : "1px solid #B3B3B3",
            visibility : "hidden"
        }}>
            <Grid item xs={9} sx={{ opacity : 1, visibility : "none" }}>
                <TextField
                    fullWidth
                    sx={{
                        ' .MuiOutlinedInput-root': {
                            color: 'black',
                            border : '0px solid #B3B3B3',
                            backgroundColor : "#B3B3B3",
                            fontFamily : "ScoreDream",
                            opacity : 1
                        },
                        mb : 1
                    }}
                    placeholder="댓글을 입력해주세요"
                />
            </Grid>
            <Grid item xs={3} sx={{ paddingLeft : "16px" }}>
                <Button variant="contained" style={{
                    backgroundColor : "#FFA629",
                    marginTop : "9px",
                    marginLeft : "10px",
                    fontFamily : "ScoreDream"
                }}>작성</Button>
            </Grid>
        </Grid>
        </>
    );
};

export default CommentForm;