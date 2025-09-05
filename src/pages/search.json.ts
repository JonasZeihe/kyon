// src/pages/search.json.ts
import type { APIRoute } from 'astro'
import { getAllPosts } from '../lib/content'

export const GET: APIRoute = async () => {
  const data = getAllPosts().map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    tags: p.tags || [],
    date: p.date,
  }))
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, immutable',
    },
  })
}
