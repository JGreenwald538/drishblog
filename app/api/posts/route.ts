// app/api/posts/route.ts
import { NextResponse } from 'next/server';
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

type Result = {
  columns: string[];
  rows: any[][];
};

function convertToObjects(result: Result): Post[] {
  const { columns, rows } = result;
  const objects: Post[] = rows.map(row => {
    const obj: any = {};
    columns.forEach((column, index) => {
      obj[column] = row[index];
    });
    return obj;
  });
  return objects;
}

export async function GET() {
  try {
    console.log('API: Fetching posts...');
    const result = await client.execute("SELECT * FROM pages");
    const pages = result.toJSON();
    const posts = convertToObjects(pages) as Post[];
    const publishedPosts = posts.filter((post) => post.published === 1);
    
    console.log(`API: Found ${publishedPosts.length} published posts`);
    return NextResponse.json(publishedPosts);
  } catch (error: any) {
    console.error('API: Failed to fetch posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts', details: error.message },
      { status: 500 }
    );
  }
}