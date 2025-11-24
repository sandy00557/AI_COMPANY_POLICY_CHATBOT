function detectAndChunk(text) {
  const hasBullets = text.includes("•");
  const hasNumbers = /^\d+\./m.test(text);
//   const hasStructure = hasBullets || hasNumberedSections;

    if (hasBullets || hasNumbers) {
        return {
        type: "structured",
        data: chunkStructuredDocument(text),
        };
    }
    return {
      type: "narrative",
      data: chunkTextBySentences(text, 500, 50),
    };
}


function chunkTextBySentences(
  text,
  maxWordsPerChunk = 500,
  overlapWords = 50
) {
  const sentences = text
    .split(/(?<=[.!?])\s+(?=[A-Z])/g)
    .filter(s => s.length > 0)
    .map(s => s.trim())
    .filter(s => s.length > 0);

  if (sentences.length === 0) {
    return [text];
  }

  const chunks = [];
  let currentChunk = [];
  let currentWordCount = 0;

  for (let i = 0; i < sentences.length; i++) {
    const sentence = sentences[i];
    const wordCount = sentence.split(/\s+/).length;

    if (
      currentWordCount + wordCount > maxWordsPerChunk &&
      currentChunk.length > 0
    ) {
      const chunkText = currentChunk.join(" ").trim();
      if (chunkText.split(/\s+/).length >= 10) {
        chunks.push(chunkText);
      }

      currentChunk = [];
      currentWordCount = 0;

      // Add overlap
      let overlapCount = 0;
      for (let j = Math.max(0, i - 2); j < i && overlapCount < overlapWords; j++) {
        currentChunk.push(sentences[j]);
        overlapCount += sentences[j].split(/\s+/).length;
      }
      currentWordCount = overlapCount;
    }

    currentChunk.push(sentence);
    currentWordCount += wordCount;
  }

  if (currentChunk.length > 0) {
    const finalChunk = currentChunk.join(" ").trim();
    if (finalChunk.split(/\s+/).length >= 10) {
      chunks.push(finalChunk);
    }
  }

  return chunks.length > 0 ? chunks : [text];
}




function chunkStructuredDocument(text, maxWordsPerChunk = 300) {
  // Step 1: Split by numbered sections (1., 2., 3., etc.)
  const sections = text.split(/(?=\d+\.)/);

  const chunks = [];

  for (const section of sections) {
    if (section.trim().length === 0) continue;

    // Step 2: Split each section by bullet points (•)
    const bulletItems = section.split(/(?=•)/);

    let currentChunk = [];
    let currentWordCount = 0;

    for (const item of bulletItems) {
      const itemWords = item.split(/\s+/).length;

      // Check if adding this item exceeds word limit
      if (
        currentWordCount + itemWords > maxWordsPerChunk &&
        currentChunk.length > 0
      ) {
        // Save current chunk
        chunks.push(currentChunk.join(" ").trim());
        currentChunk = [];
        currentWordCount = 0;
      }

      currentChunk.push(item.trim());
      currentWordCount += itemWords;
    }

    // Save remaining chunk from this section
    if (currentChunk.length > 0) {
      chunks.push(currentChunk.join(" ").trim());
      console.log("Done Changes");
    }
  }

  // Filter out very small chunks and empty strings
  return chunks
    .filter(chunk => chunk.trim().length > 0)
    .filter(chunk => chunk.split(/\s+/).length >= 5);
}


module.exports={detectAndChunk};