import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  secret?: string;
  message?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Only allow GET method
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Return the secret if the request passed middleware validation
  res.status(200).json({ secret: "Next.js is cool" });
}
