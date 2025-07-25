/**
 * Redis uzi nima?
 * Install qilish
 * Folder hosil qilish
 * npm init -y
 * import express, axios
 * const app
 * cors integrate to app
 * create redis client
 * **/

import express, { Request, Response } from "express";
import cors from "cors";
import axios from "axios";
import { createClient } from "redis";
import { fetchUserDataClean } from "../train";
const DEFAULT_EXPIRATION = 3600;
const app = express();
app.use(cors());
const redisClient = createClient();

// connect with Redis
redisClient.connect().catch(console.error);

// TRAIN AREA
app.get("/train", async (req: Request, res: Response) => {
  try {
    console.log("Request came from /train endpoint");
    const data = await fetchUserDataClean(1);
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .send({ error: error instanceof Error ? error.message : error });
  }
});

// TRAIN AREA
// 1. Get all photos (or filtered by ?albumId=)
app.get("/photos", async (req: Request, res: Response) => {
  try {
    const albumId = req.query.albumId;
    // check cache first ==>
    const cacheKey = albumId ? `photos:${albumId}` : "photos";
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      console.log("cachedData HIT");
      return res.json(JSON.parse(cachedData));
    } else {
      console.log("cachedData MISS");
    }

    // Fetch from API if not cached
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/photos",
      { params: albumId ? { albumId } : {} }
    );

    await redisClient.setEx(
      cacheKey, //BEFORE: `photos?albumId=${albumId}`
      DEFAULT_EXPIRATION,
      JSON.stringify(data)
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch photos" });
  }
});

/* -------------------------------------------------------------- */

// 2. Get photos by albumId using path param
app.get(
  "/photos/albumId/:albumId",
  async (req: Request<{ albumId: string }>, res: Response) => {
    try {
      // check cache first

      const { albumId } = req.params;
      console.log("albumId of albumId:", albumId);
      // const cacheKey = albumId ? `photos/albumId?albumId=${albumId}` : "photos"
      const cacheKey = `photos/albumId/${albumId}`;
      const cachedData = await redisClient.get(cacheKey);

      if (cachedData) {
        console.log("cachedData HIT!!");
        return res.json(JSON.parse(cachedData)); // Fix 2: Add return to prevent double response
      } else {
        console.log("cachedData MISS");
      }

      // Fetch from API if not cached
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`
      );

      // Fix 3: Use the same cache key for storing (with actual albumId)
      await redisClient.setEx(
        cacheKey,
        DEFAULT_EXPIRATION,
        JSON.stringify(data)
      );
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch photos by albumId" });
    }
  }
);

// 3. Get photo by id
app.get(
  "/photos/id/:id",
  async (req: Request<{ id: string }>, res: Response) => {
    try {
      const { id } = req.params;
      console.log("albumId of id", id);

      // check cache first
      const cacheKey = `photos/id/${id}`;
      const cachedData = await redisClient.get(cacheKey);

      if (cachedData) {
        console.log("cachedData HIT!!!");
        return res.json(JSON.parse(cachedData));
      } else {
        console.log("cachedData MISS");
      }

      // Fetch from API if not cached
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/photos/${id}`
      );

      await redisClient.setEx(
        cacheKey,
        DEFAULT_EXPIRATION,
        JSON.stringify(data)
      );
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch photo by id" });
    }
  }
);

// 4. Get all posts
app.get("/posts/", async (req: Request, res: Response) => {
  try {
    console.log("Get All Posts");
    const postUserId = req.query.userId;

    const cacheKey = postUserId ? `posts:${postUserId}` : "posts";
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      console.log("cachedData HIT");
      return res.json(JSON.parse(cachedData));
    } else {
      console.log("cachedData MISS");
    }
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/posts`
    );
    await redisClient.setEx(cacheKey, DEFAULT_EXPIRATION, JSON.stringify(data));
    return res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// 5. Get posts by user id
app.get("/posts/userid/:userid", async (req: Request, res: Response) => {
  try {
    const { userid } = req.params;

    // check cache
    const cacheKey = `posts/userid/${userid}`;
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      console.log("cachedData HIT!!");
      return res.json(JSON.parse(cachedData));
    } else {
      console.log("cachedData MISS!!");
    }

    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${userid}`
    );
    await redisClient.setEx(cacheKey, DEFAULT_EXPIRATION, JSON.stringify(data));
    return res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts by userId" });
  }
});

// 6. Get posts by id
app.get("/posts/id/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const cacheKey = `posts/id/${id}`;
    const cachedKey = await redisClient.get(cacheKey);

    if (cachedKey) {
      console.log("cachedData HIT!!!");
      return res.json(JSON.parse(cachedKey));
    } else {
      console.log("cachedData MISS!!!");
    }

    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );

    await redisClient.setEx(cacheKey, DEFAULT_EXPIRATION, JSON.stringify(data));
    res.json(data);
  } catch {
    res.status(500).json({ error: "Failed to fetch posts by id" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

// import express, { json, Request, Response } from "express";
// import cors from "cors";
// import axios from "axios";
// import { createClient } from "redis";

// const DEFAULT_EXPIRATION = 3600;
// const app = express();
// app.use(cors());
// const redisClient = createClient();

// // connect with Redis
// redisClient.connect().catch(console.error);

// // Unified photos method - handles all three cases
// app.get("/photos/:type?/:id?", async (req: Request, res: Response) => {
//   try {
//     const { type, id } = req.params;
//     const albumId = req.query.albumId;

//     let cacheKey: string;
//     let apiUrl: string;
//     let apiParams: any = {};

//     // Determine the type of request and set cache key + API URL
//     if (type === "id" && id) {
//       // Case 3: Get photo by id (/photos/id/123)
//       cacheKey = `photos/id/${id}`;
//       apiUrl = `https://jsonplaceholder.typicode.com/photos/${id}`;
//       console.log("Request type: Get photo by id", id);
//     } else if (type === "albumId" && id) {
//       // Case 2: Get photos by albumId (/photos/albumId/123)
//       cacheKey = `photos/albumId/${id}`;
//       apiUrl = `https://jsonplaceholder.typicode.com/albums/${id}/photos`;
//       console.log("Request type: Get photos by albumId", id);
//     } else if (!type && !id) {
//       // Case 1: Get all photos or filtered by query param (/photos or /photos?albumId=123)
//       cacheKey = albumId ? `photos:${albumId}` : "photos";
//       apiUrl = "https://jsonplaceholder.typicode.com/photos";
//       apiParams = albumId ? { albumId } : {};
//       console.log(
//         "Request type: Get all photos",
//         albumId ? `filtered by albumId: ${albumId}` : ""
//       );
//     } else {
//       // Invalid route
//       return res.status(400).json({ error: "Invalid route" });
//     }

//     // Check cache first
//     const cachedData = await redisClient.get(cacheKey);
//     if (cachedData) {
//       console.log("Cache HIT for:", cacheKey);
//       return res.json(JSON.parse(cachedData));
//     } else {
//       console.log("Cache MISS for:", cacheKey);
//     }

//     // Fetch from API if not cached
//     const { data } = await axios.get(apiUrl, { params: apiParams });

//     // Store in cache
//     await redisClient.setEx(cacheKey, DEFAULT_EXPIRATION, JSON.stringify(data));

//     res.json(data);
//   } catch (err) {
//     console.error("Error:", err);
//     res.status(500).json({ error: "Failed to fetch photos" });
//   }
// });

// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`✅ Server running at http://localhost:${PORT}`);
// });
