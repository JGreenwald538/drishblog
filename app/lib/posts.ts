// app/lib/posts.ts
import { createClient } from "@libsql/client/http"; // Use HTTP client

let client: any = null;

function getClient() {
  if (!client) {
    try {
      // More verbose logging
      console.log('Creating database client...');
      console.log('Database URL:', process.env.TURSO_DATABASE_URL?.substring(0, 20) + '...');
      
      client = createClient({
        url: process.env.TURSO_DATABASE_URL!,
        authToken: process.env.TURSO_AUTH_TOKEN!,
      });
      
      console.log('Client created successfully');
    } catch (error) {
      console.error('Failed to create client:', error);
      throw error;
    }
  }
  return client;
}

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

export const getPosts = async (): Promise<Post[]> => {
  try {
    console.log('getPosts called');
    const dbClient = getClient();
    
    console.log('Executing query...');
    const result = await dbClient.execute("SELECT * FROM pages");
    
    console.log('Query successful, processing results...');
    const pages = result.toJSON();
    const posts = convertToObjects(pages) as Post[];
    
    console.log(`Found ${posts.length} posts`);
    return posts.filter((post) => post.published === 1);
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    // Return empty array instead of throwing
    return [];
  }
};

export async function getPost(slug: string) {
  try {
    const result = await client.execute({
      sql: "SELECT * FROM pages where title = ?", 
      args: [slug]
    });
    const page = result.toJSON();
    const posts = convertToObjects(page) as Post[];
    return posts[0] || { 
      id: 0, 
      title: "Post Not Found", 
      author: "", 
      DATE: "", 
      description: "", 
      body: "", 
      images: "", 
      published: 0,
      views: 0 
    };
  } catch (error) {
    console.error("Failed to fetch post", error);
    return { 
      id: 0, 
      title: "Post Not Found", 
      author: "", 
      DATE: "", 
      description: "", 
      body: "", 
      images: "", 
      published: 0,
      views: 0 
    };
  }
}

// Only use "use server" for actions that modify data
export async function addView(slug: string) {
  "use server"; // This one modifies data, so it needs "use server"
  
  try {
    const posts = await getPosts();
    const post = posts.find((post) => post.title === slug);

    if (!post) {
      console.error(`Post not found for slug(views): ${slug}`);
      return;
    }

    const newViews = post.views + 1;
    await client.execute({
      sql: "UPDATE pages SET views = ? WHERE id = ?;", 
      args: [newViews, post.id]
    });

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