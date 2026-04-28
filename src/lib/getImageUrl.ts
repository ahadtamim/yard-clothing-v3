export const getImageUrl = (image: any) => {
  if (!image) return '/placeholder.jpg';
  
  // If Payload returned the image as a string (rare with depth: 2)
  if (typeof image === 'string') return image;

  // Use the main URL, or a specific size if preferred (e.g., image.sizes?.thumbnail?.url)
  const path = image.url;

  if (!path) return '/placeholder.jpg';

  // If the path is already an absolute URL (starts with http), return it
  if (path.startsWith('http')) return path;

  // If it's relative, manually prefix your Vercel Blob domain
  // Based on your storage screenshot: zjxiyg6t5n64z1cj.public.blob.vercel-storage.com
  return `https://zjxiyg6t5n64z1cj.public.blob.vercel-storage.com${path}`;
};