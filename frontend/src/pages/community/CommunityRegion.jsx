import React, {useState} from 'react';
import Box from "@mui/material/Box";
import SelectForm from "../../components/common/SelectForm";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import {Grid} from "@mui/material";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import {Container} from "@mui/material";
import Divider from "@mui/material/Divider";
import ArticleFilter from "../../components/common/ArticleFilter";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BasicCard from "../../components/common/Card";
import SelectFormRegion from "../../components/common/SelectFormRegion";
import {useEffect} from "react";
import {fetchRegionArticle} from "../api/Farmmunity";
import {nowRegion} from "../../atom";
import {useRecoilState} from "recoil";
import DialButton from "../../components/common/DialButton";
import {useNavigate} from "react-router-dom";

const CommunityInfo = () => {
    const [regionArticle, setRegionArticle] = useState([])
    const [region, setRegion] = useRecoilState(nowRegion)
    const navigator = useNavigate()
    const [regionInfo, setRegionInfo] = useState([])
    const [filter, setFilter] = useState("")

    useEffect(() => {
        const getArticle = fetchRegionArticle(region)
            .then((res) => res.json().then((res) => {
                // console.log(res)
                setRegionArticle(res.articleList)
                setRegionInfo(res.articleInfo)
            }))
    },[region])

    const getFilterValue = (text) => {
        setFilter(text)
    }

    useEffect(() => {
        if(filter === "인기순"){
            regionArticle.sort(function (a,b) {
                return b.likeCount - a.likeCount
            })
            const likeArticle = [...regionArticle]
            setRegionArticle(likeArticle)
        }else if(filter === ""){
            regionArticle.sort(function (a,b) {
                return new Date(a.articleTime) - new Date(b.articleTime)
            })
            const currentArticle = [...regionArticle]
            setRegionArticle(currentArticle)
        }
    },[filter])

    return (
        <Box>
            <Box sx={{ display : "flex", justifyContent : "start" }}>
                <SelectFormRegion/>
            </Box>
            <Box sx={{ display : "flex", justifyContent : "center", alignItems : "center" }}>
                <Avatar
                    alt="Remy Sharp"
                    src={ regionInfo.regionImg }
                    sx={{ width: 100, height: 100, boxShadow: '1px 2px 9px #F4AAB9' }}
                />
            </Box>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Box sx={{ display : "flex", justifyContent : "center", alignItems : "center", fontSize : "25px", m : 1}}>{ regionInfo.regionName }</Box>
                </Grid>
            </Grid>
            <Box sx={{ display : "flex", justifyContent : "center", px : "25px" }}>
                <p style={{ lineHeight : "30px", color : "#B3B3B3" }}>
                    { regionInfo.regionName }에 대한 정보글을 확인해보세요!
                </p>
            </Box>
            <Divider style={{ backgroundColor : "#757575" }}/>
            <Box sx={{ display : "flex", justifyContent : "start" }}>
                <ArticleFilter getFilter={getFilterValue}/>
            </Box>
            <Box>
                { regionArticle.map((article, index) => (
                    <BasicCard
                        key={index}
                        title={article.articleTitle}
                        idx={article.idx}
                        content={article.articleContent}
                        likeCount={article.likeCount}
                        commentCount={article.commentCount}
                    />
                )) }
                {/*<BasicCard/>*/}
            </Box>
            <DialButton now="지역"/>
        </Box>
    );
};

export default CommunityInfo;