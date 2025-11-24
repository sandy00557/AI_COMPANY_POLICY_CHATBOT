const {OpenAIEmbeddings}=require("openai");
const {Pinecone}=require("@pinecone-database/pinecone");
const {PineconeStore}=require("@langchain/pinecone");
require("dotenv").config();



async function embedChunksToPinecone(chunkedDocuments,companyName){
    const embeddingsModel=new OpenAIEmbeddings({
        model:"text-embedding-3-small",
        apiKey:process.env.OPENAI_API_KEY,
    });

    const pinecone=new Pinecone({
        apiKey:process.env.PINECONE_API_KEY,
    });

    const pineconeIndex=pinecone.index(process.env.PINECONE_INDEX_NAME);

    const docs=chunkedDocuments.map((chunk,i)=>({
        pageContent:chunk,
        metadata:{
            company: companyName,
            chunkId:`${companyName}-${i}`,
            text:chunk,
        }
    }))

    /*
    Without map method()?
    | Feature                      | With `.map()`     | Without `.map()` |
    | ---------------------------- | ----------------- | ---------------- |
    | Can embed text               | ✔ Yes             | ❌ No             |
    | Can store metadata           | ✔ Yes             | ❌ No             |
    | Can filter by company        | ✔ Yes             | ❌ No             |
    | Pinecone accepts data        | ✔ Yes             | ❌ No             |
    | LangChain accepts data       | ✔ Yes             | ❌ Breaks         |
    | Can retrieve correct answers | ✔ Yes             | ❌ No             |
    | Multi-company support        | ✔ Works perfectly | ❌ Impossible     |


    In map method we are converting the raw text into document objects with the metadata which is accepted by PineCone, LangChain and etc...
    */


    for(let i=0;i<docs.length;i+=100){
        /*why do we need slice?
        For example docs have more than 1000 doc objects we can't add everything in the PineCone at a time. So we need to batch and send it. */
        const batch=docs.slice(i,i+100);
        await PineconeStore.fromDocuments(batch,embeddingsModel,{
            pineconeIndex,
        });
    }
    /*
    Why do we need embeddingsModel here?
    It transforms text chunks into semantic meaning vectors
    not just plain text.
    Example:
    "18 annual leaves after probation"
    Embedding model converts it into:
    [0.11, -0.32, 0.87, ...]   (1536 numbers)
    These numbers represent the meaning of the sentence.
    So Pinecone can compare text based on meaning
    */

    console.log("All chunks stored in Pinecone Successfully");
}


module.exports={embedChunksToPinecone};