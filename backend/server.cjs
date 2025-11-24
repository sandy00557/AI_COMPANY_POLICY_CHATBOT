// //npm installs to add in vectors -npm install openai @pinecone-database/pinecone dotenv

// const express = require("express");
// const cors = require("cors");
// const multer = require("multer");
// const { extractText, getDocumentProxy } = require("unpdf");

// const app = express();
// app.use(cors());
// app.use(express.json());

// const upload = multer({ storage: multer.memoryStorage() });

// app.post("/upload", upload.single("file"), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     const pdf = await getDocumentProxy(new Uint8Array(req.file.buffer));
//     const { totalPages, text } = await extractText(pdf, { mergePages: true });

//     // ✅ IMPROVED: Detect document type and use appropriate chunker
//     const chunks = detectAndChunk(text);

//     res.json({
//       message: "PDF processed successfully",
//       totalPages: totalPages,
//       chunkCount: chunks.length,
//       documentType: chunks.type,
//       chunks: chunks.data,
//     });
//   } catch (err) {
//     console.error("PDF Parse Error:", err);
//     res.status(500).json({ error: "Error processing PDF" });
//   }
// });

// // ✅ NEW: Detect document structure and chunk accordingly
// function detectAndChunk(text) {
//   const hasBullets = text.includes("•");
//   const hasNumberedSections = /^\d+\./m.test(text);
//   const hasStructure = hasBullets || hasNumberedSections;

//   if (hasStructure) {
//     return {
//       type: "structured",
//       data: chunkStructuredDocument(text),
//     };
//   } else {
//     return {
//       type: "narrative",
//       data: chunkTextBySentences(text, 500, 50),
//     };
//   }
// }

// // ✅ NEW: For HR policies, contracts, manuals with bullets/sections
// function chunkStructuredDocument(text, maxWordsPerChunk = 300) {
//   // Step 1: Split by numbered sections (1., 2., 3., etc.)
//   const sections = text.split(/(?=\d+\.)/);

//   const chunks = [];

//   for (const section of sections) {
//     if (section.trim().length === 0) continue;

//     // Step 2: Split each section by bullet points (•)
//     const bulletItems = section.split(/(?=•)/);

//     let currentChunk = [];
//     let currentWordCount = 0;

//     for (const item of bulletItems) {
//       const itemWords = item.split(/\s+/).length;

//       // Check if adding this item exceeds word limit
//       if (
//         currentWordCount + itemWords > maxWordsPerChunk &&
//         currentChunk.length > 0
//       ) {
//         // Save current chunk
//         chunks.push(currentChunk.join(" ").trim());
//         currentChunk = [];
//         currentWordCount = 0;
//       }

//       currentChunk.push(item.trim());
//       currentWordCount += itemWords;
//     }

//     // Save remaining chunk from this section
//     if (currentChunk.length > 0) {
//       chunks.push(currentChunk.join(" ").trim());
//     }
//   }

//   // Filter out very small chunks and empty strings
//   return chunks
//     .filter(chunk => chunk.trim().length > 0)
//     .filter(chunk => chunk.split(/\s+/).length >= 5);
// }

// // Original sentence-based chunker (for narrative documents)
// function chunkTextBySentences(
//   text,
//   maxWordsPerChunk = 500,
//   overlapWords = 50
// ) {
//   const sentences = text
//     .split(/(?<=[.!?])\s+(?=[A-Z])/g)
//     .filter(s => s.length > 0)
//     .map(s => s.trim())
//     .filter(s => s.length > 0);

//   if (sentences.length === 0) {
//     return [text];
//   }

//   const chunks = [];
//   let currentChunk = [];
//   let currentWordCount = 0;

//   for (let i = 0; i < sentences.length; i++) {
//     const sentence = sentences[i];
//     const wordCount = sentence.split(/\s+/).length;

//     if (
//       currentWordCount + wordCount > maxWordsPerChunk &&
//       currentChunk.length > 0
//     ) {
//       const chunkText = currentChunk.join(" ").trim();
//       if (chunkText.split(/\s+/).length >= 10) {
//         chunks.push(chunkText);
//       }

//       currentChunk = [];
//       currentWordCount = 0;

//       // Add overlap
//       let overlapCount = 0;
//       for (let j = Math.max(0, i - 2); j < i && overlapCount < overlapWords; j++) {
//         currentChunk.push(sentences[j]);
//         overlapCount += sentences[j].split(/\s+/).length;
//       }
//       currentWordCount = overlapCount;
//     }

//     currentChunk.push(sentence);
//     currentWordCount += wordCount;
//   }

//   if (currentChunk.length > 0) {
//     const finalChunk = currentChunk.join(" ").trim();
//     if (finalChunk.split(/\s+/).length >= 10) {
//       chunks.push(finalChunk);
//     }
//   }

//   return chunks.length > 0 ? chunks : [text];
// }

// app.listen(5000, () => console.log("Server running on PORT 5000"));





const express=require('express');
const cors=require('cors');
const uploadRoutes=require("../backend/routes/embeddings");
require("dotenv").config();

const app=express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/upload",uploadRoutes);

app.listen(5000,()=>console.log("Server running on PORT 5000"));