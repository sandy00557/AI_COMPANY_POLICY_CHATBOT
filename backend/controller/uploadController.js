const { embedChunksToPinecone } = require("../utils/embeddings_utils");

async function uploadPDFController(req,res){
    try{
        const {companyName}=req.body;
        if(!companyName){
            return res.status(400).json({error: "CompanyName is required"});
        }
        if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
        }

        const pdf = await getDocumentProxy(new Uint8Array(req.file.buffer));
        const { totalPages, text } = await extractText(pdf, { mergePages: true });

        // ✅ IMPROVED: Detect document type and use appropriate chunker
        const chunkResult = detectAndChunk(text);

        const chunks=chunkResult.data;

        await embedChunksToPinecone(chunks,companyName);

        res.json({
        message: "PDF processed + embedded successfully",
        totalPages: totalPages,
        chunkCount: chunks.length,
        documentType: chunks.type,
        });
    } catch (err) {
        console.error("Upload Error:", err);
        res.status(500).json({ error: "Error processing PDF" });
    }
}