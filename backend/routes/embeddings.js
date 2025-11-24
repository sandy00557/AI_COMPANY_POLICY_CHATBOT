// // import dotenv from "dotenv";
// // import {OpenAIEmbeddings} from "@langchain/openai";
// // import {Pinecone} from "@pinecone-database/pinecone";
// const router=express.Router();


// router.post("/",async(req,res)=>{
//     try{
//         const {chunks,companyName}=req.body;
//         await embedAndStoreChunks(chunks,companyName);

//         res.json({
//             message:"Embeddings created and stored successfully",
//         })
//     }   
//     catch(err){
//         console.error("Embedding Error:",err);
//         res.status(500).json({
//             error:"Embedding failed",
//         })
//     }
// });

// module.exports=router;

// // dotenv.config();

// // const embeddingLLM=new OpenAIEmbeddings({
// //     model:"text-embedding-3-small",
// // })

// // const pinecone=new Pinecone();
// // const pineconeIndex=pinecone.index("langchain-docs");








const express=require('express');
const multer=require('multer');
const {uploadPDFController}=require("../controller/uploadController");

const router=express.Router();
const upload=multer({storage:multer.memoryStorage()});

router.post("/",upload.single("file"),uploadPDFController);

module.exports=router;

