import { Router } from "express";
import { sample_categories, sample_movies } from "../data";
import asynceHandler from 'express-async-handler';
import { MovieModel } from "../models/movie.model";
const router =Router();



router.get("/seed",asynceHandler(
    async(req,res)=>{

        const movieCount= await MovieModel.countDocuments();
        if(movieCount>0){
            res.send("Seed is already done@!");
            return;
        }

        await MovieModel.create(sample_movies);
        res.send("Seed is done")

      
    }
)  )

router.get("/",asynceHandler(async(req,res)=>{
    const movies = await MovieModel.find();
    res.send(movies);
}))

router.get("/search/:searchTerm",asynceHandler(async(req,res) =>{
    const searchRegex= new RegExp(req.params.searchTerm, 'i');
    const movies = await MovieModel.find({name: {$regex:searchRegex}})
    res.send(movies);
}) )




router.get( '/category',asynceHandler(async (req, res) => {
    const cate = await MovieModel.aggregate([
      {
        $unwind: '$category',
      },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: '$_id',
          count: '$count',
        },
      },
    ]).sort({ count: -1 });

    const all = {
      name: 'All',
      count: await MovieModel.countDocuments(),
    };

    cate.unshift(all);
    res.send(cate);
  })
);

router.get("/category/:categoryName",asynceHandler( async(req,res) => {
    const categoryName = req.params.categoryName;
    const movies = await MovieModel.find({category: req.params.categoryName});
    res.send(movies);
}))  

router.get("/:movieId",asynceHandler(async (req,res) => {
    const movie = await MovieModel.findById(req.params.movieId);
    res.send(movie);
}))  




export default router;

