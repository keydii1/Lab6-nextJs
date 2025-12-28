"use server";

import { docs, searchDocs } from "./data";

// Server Action to handle AI queries
export async function askAI(query: string): Promise<string> {
  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Simple RAG simulation: search docs for relevant content
  const relevantDocs = searchDocs(query);

  if (relevantDocs.length === 0) {
    return `I couldn't find specific information about "${query}" in our documentation. 

Here are some topics I can help you with:
• Getting Started with Next.js
• Pages Router and App Router
• Data Fetching (getStaticProps, getServerSideProps)
• API Routes and Middleware

Try asking about one of these topics!`;
  }

  // Generate response based on most relevant doc
  const topDoc = relevantDocs[0];
  const context = topDoc.content.substring(0, 500);

  // Simulate AI response generation
  const response = generateResponse(query, topDoc.title, context);

  return response;
}

function generateResponse(
  query: string,
  docTitle: string,
  context: string
): string {
  const lowerQuery = query.toLowerCase();

  // Pattern matching for common questions
  if (lowerQuery.includes("what is") || lowerQuery.includes("explain")) {
    return `**${docTitle}**

${context}

---
📚 This information is from our "${docTitle}" documentation. Would you like to know more about related topics?`;
  }

  if (lowerQuery.includes("how to") || lowerQuery.includes("how do")) {
    return `Here's how you can work with this in Next.js:

Based on our documentation on "${docTitle}":

${context}

---
💡 **Tip**: Check the full documentation for code examples and best practices.`;
  }

  if (lowerQuery.includes("example") || lowerQuery.includes("code")) {
    return `Here's an example from our "${docTitle}" documentation:

${context}

---
🔗 For more examples, visit the full documentation page.`;
  }

  if (
    lowerQuery.includes("difference") ||
    lowerQuery.includes("vs") ||
    lowerQuery.includes("compare")
  ) {
    return `Great question! Let me explain based on "${docTitle}":

${context}

---
📖 The documentation covers this topic in detail with comparisons and use cases.`;
  }

  // Default response
  return `Based on our "${docTitle}" documentation:

${context}

---
🤖 I found this information relevant to your query. Is there anything specific you'd like me to clarify?`;
}

// Rate limiting map (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

export async function checkRateLimit(clientId: string): Promise<boolean> {
  const now = Date.now();
  const windowMs = 60000; // 1 minute window
  const maxRequests = 10;

  const clientData = rateLimitMap.get(clientId);

  if (!clientData || now - clientData.timestamp > windowMs) {
    rateLimitMap.set(clientId, { count: 1, timestamp: now });
    return true;
  }

  if (clientData.count >= maxRequests) {
    return false;
  }

  clientData.count++;
  return true;
}

// Get all documentation for embedding
export async function getAllDocs() {
  return docs;
}
