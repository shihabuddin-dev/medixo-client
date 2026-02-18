export async function createBlogPost(blogData: { title: string; content: string; tags: string[] }) {
  try {
    const res = await fetch('/api/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blogData),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Failed to create blog' }));
      return { error: { message: err.message || 'Failed to create blog' } };
    }

    const data = await res.json();
    return { data };
  } catch (error: any) {
    return { error: { message: error.message || 'Network error' } };
  }
}
