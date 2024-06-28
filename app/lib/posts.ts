"use server"

import matter from 'gray-matter'
import path from 'path'
import fs from 'fs/promises'
import { cache } from 'react'
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
    console.log(posts[0].title);
    
    return posts.filter((post) => post.published === 1);
  } catch (error) {
    console.error("Failed to fetch posts", error);
    throw error;
  }
};

export async function getPost(slug: string) {
  try {
    const posts = await getPosts();
    // console.log(posts);
    const post = posts.find((post) => post.title === slug);
    
    if (!post) {
      console.error(`No post found with slug: ${slug}`);
    }
    // await addView(slug);
    return post;
  } catch (error) {
    console.error(`Failed to get post for slug: ${slug}`, error);
    throw error;
  }
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
    await client.execute("UPDATE pages SET views = 2 WHERE id = 8;");

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
async function testAddView() {
  const slug = 'pwojrgpoefop'; // Replace with a valid slug for testing
  try {
    await addView(slug);
    console.log('View count updated successfully.');
  } catch (error) {
    console.error('Error updating view count:', error);
  }
}

testAddView();


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
