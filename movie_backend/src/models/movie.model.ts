import { Schema, model } from "mongoose";


export interface Movie{
    id:string;
    name:string;
    description:string;
    category:string [];
    stars:number;
    imgUrl:string;
    trailerUrl:string;
    release_date:string;
}

export const MovieSchema= new Schema<Movie>(

    {
        name: {type: String, required: true},
        description: {type: String, required: true},
        category: {type: [String]},
        stars: {type: Number, required: true},
        imgUrl: {type: String, required: true},
        trailerUrl: {type: String, required: true},
        release_date: {type: String, required: true}
    },{
        toJSON:{
            virtuals: true
        },
        toObject:{
            virtuals: true
        },
        timestamps:true
    }
)

export const MovieModel =model<Movie>('movie',MovieSchema)