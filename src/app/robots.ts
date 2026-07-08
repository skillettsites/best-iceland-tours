import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';

const AI_CRAWLERS = [
  'GPTBot',           // OpenAI training crawler
  'ChatGPT-User',     // OpenAI live chat browsing
  'OAI-SearchBot',    // OpenAI SearchGPT
  'ClaudeBot',        // Anthropic training crawler
  'Claude-Web',       // Anthropic web tool
  'anthropic-ai',     // Anthropic alias
  'PerplexityBot',    // Perplexity index
  'Perplexity-User',  // Perplexity live answer
  'Google-Extended',  // Google AI training (Gemini, Vertex)
  'GoogleOther',      // Google product crawlers
  'CCBot',            // Common Crawl (powers many AI training datasets)
  'Applebot-Extended',// Apple AI training
  'Meta-ExternalAgent', // Meta AI
  'Bytespider',       // TikTok / ByteDance AI
  'DuckAssistBot',    // DuckDuckGo AI
  'cohere-ai',        // Cohere
  'YouBot',           // You.com
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default rule for traditional search crawlers
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      // Explicit welcome for AI crawlers, see /llms.txt for a curated content index
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: ['/api/'],
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
