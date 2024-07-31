"use server"

import { createClient } from "@libsql/client";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL || "",
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export interface Post {
  id: number
  title: string
  DATE: string
  body: string
  description: string
  author: string
  views: number
  images: string
  published: number
}

export const getPosts = async () => {
try {
  const result = await client.execute("SELECT * FROM pages");
  const pages = result.toJSON();
  const posts = convertToObjects(pages) as Post[];
  return posts.filter((post) => post.published === 1);
} catch (error) {
  console.error("Failed to fetch posts", error);
  throw error;
}
};

export async function getPost(slug: string) {
  const result = await client.execute({sql:"SELECT * FROM pages where title = ?", args:[slug]});
  const page = result.toJSON();
  const posts = convertToObjects(page) as Post[];
  return posts[0] || { id: 0, title: "Post Not Found", author: "", DATE: "", description: "", body: "", images: "", published: 0 };
}

export async function addView(slug: string) {
  try {
    const posts = await getPosts();
    const post = posts.find((post) => post.title === slug);

    if (!post) {
      console.error(`Post not found for slug(views): ${slug}`);
      return;
    }

    const newViews = post.views + 1;

    // Log the SQL statement and arguments for debugging
    await client.execute({sql:"UPDATE pages SET views = ? WHERE id = ?;", args: [newViews, post.id]});

    // // Log the result for debugging
    // console.log(`SQL update result:`, result);

    // if (result.rowsAffected === 0) {
    //   console.error(`No rows updated for post with id: ${post.id}`);
    // } else {
    //   console.log(`Successfully updated views for post with id: ${post.id}`);
    // }

  } catch (error) {
    console.error(`Failed to add view for slug: ${slug}`, error);
    throw new Error(`Failed to add view for slug: ${slug}`);
  }
}


type Result = {
    columns: string[];
    rows: any[][];
};

type Page = {
    [key: string]: any;
};

function convertToObjects(result: Result): Page[] {
    const { columns, rows } = result;
    const objects: Page[] = rows.map(row => {
        const obj: Page = {};
        columns.forEach((column, index) => {
            obj[column] = row[index];
        });
        return obj;
    });
    return objects;
}
