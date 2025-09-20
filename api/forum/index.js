import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || 'https://ycorozkbfeqwybujwnaz.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inljb3JvemtiZmVxd3lidWp3bmF6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzY2MTQ2MCwiZXhwIjoyMDczMjM3NDYwfQ.Uk8pYd76w-UEEzLmnXrTJEMdo86sB71iOA1vnQI8UoQ';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { action } = req.query;

    switch (action) {
      case 'posts':
        return await handlePosts(req, res);
      case 'comments':
        return await handleComments(req, res);
      case 'likes':
        return await handleLikes(req, res);
      default:
        return await handlePosts(req, res);
    }
  } catch (error) {
    console.error('Forum API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function handlePosts(req, res) {
  try {
    const { data: posts, error: postsError } = await supabase
      .from('forum_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (postsError) {
      console.log('Database fetch failed, using mock data:', postsError.message);
      // Return mock data as fallback
      return res.json([{
        id: 1,
        title: "Best practices for wheat crop in March",
        content: "I've been farming wheat for 10 years and wanted to share some insights about planting in March conditions...",
        author: "Ramesh Kumar",
        authorId: "user1",
        category: "Crop Management",
        likes: 24,
        dislikes: 2,
        views: 156,
        timeAgo: "2 hours ago",
        hasVoiceNote: true,
        language: "Hindi",
        tags: ["wheat", "planting", "march"],
        isBookmarked: false,
        isLiked: false,
        isDisliked: false,
        authorReputation: 1250,
        isVerified: true,
        images: ["wheat-field.jpg"],
        whatsappGroupJoined: false,
        replies: []
      }]);
    }

    // Fetch comments for each post
    const postsWithComments = await Promise.all(
      posts.map(async (post) => {
        const { data: comments } = await supabase
          .from('forum_comments')
          .select('*')
          .eq('post_id', post.id)
          .order('created_at', { ascending: true });

        const formattedComments = comments ? comments.map(comment => ({
          id: comment.id,
          author: comment.author_name,
          authorId: comment.author_id,
          content: comment.content,
          timeAgo: getTimeAgo(comment.created_at),
          likes: comment.likes_count,
          isLiked: false,
          replies: []
        })) : [];

        return {
          id: post.id,
          title: post.title,
          content: post.content,
          author: post.author_name,
          authorId: post.author_id,
          category: post.category,
          likes: post.likes_count,
          dislikes: post.dislikes_count,
          views: post.views_count,
          timeAgo: getTimeAgo(post.created_at),
          hasVoiceNote: post.has_voice_note,
          language: post.language,
          tags: post.tags || [],
          isBookmarked: false,
          isLiked: false,
          isDisliked: false,
          authorReputation: post.author_reputation,
          isVerified: post.is_verified,
          images: post.images || [],
          whatsappGroupJoined: post.whatsapp_group_joined,
          replies: formattedComments
        };
      })
    );

    res.json(postsWithComments);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
}

async function handleComments(req, res) {
  const { postId } = req.query;
  const { content } = req.body;

  try {
    const { data: commentData, error: dbError } = await supabase
      .from('forum_comments')
      .insert({
        post_id: parseInt(postId),
        author_id: "current_user",
        author_name: "Current User",
        content: content,
        likes_count: 0
      })
      .select()
      .single();

    if (dbError) {
      console.log('Database insert failed:', dbError.message);
      throw dbError;
    }

    const formattedComment = {
      id: commentData.id,
      postId: commentData.post_id,
      author: commentData.author_name,
      authorId: commentData.author_id,
      content: commentData.content,
      timeAgo: "Just now",
      likes: commentData.likes_count,
      isLiked: false,
      replies: []
    };

    res.json(formattedComment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Failed to create comment' });
  }
}

async function handleLikes(req, res) {
  const { postId } = req.query;
  const { action } = req.body;
  const userId = "current_user";

  try {
    // Check if user already liked/disliked this post
    const { data: existingLike, error: likeError } = await supabase
      .from('post_likes')
      .select('*')
      .eq('post_id', postId)
      .eq('user_id', userId)
      .single();

    if (likeError && likeError.code !== 'PGRST116') {
      console.log('Database like check failed:', likeError.message);
      throw likeError;
    }

    if (existingLike) {
      if (existingLike.action === action) {
        // Remove the like/dislike
        await supabase
          .from('post_likes')
          .delete()
          .eq('id', existingLike.id);

        // Update post counts
        const updateField = action === 'like' ? 'likes_count' : 'dislikes_count';
        const { data: currentPost } = await supabase
          .from('forum_posts')
          .select(updateField)
          .eq('id', postId)
          .single();
        
        await supabase
          .from('forum_posts')
          .update({ [updateField]: Math.max(0, currentPost[updateField] - 1) })
          .eq('id', postId);
      } else {
        // Change from like to dislike or vice versa
        await supabase
          .from('post_likes')
          .update({ action: action })
          .eq('id', existingLike.id);

        // Update post counts
        const oldField = action === 'like' ? 'dislikes_count' : 'likes_count';
        const newField = action === 'like' ? 'likes_count' : 'dislikes_count';
        
        const { data: currentPost } = await supabase
          .from('forum_posts')
          .select('likes_count, dislikes_count')
          .eq('id', postId)
          .single();
        
        await supabase
          .from('forum_posts')
          .update({ 
            [oldField]: Math.max(0, currentPost[oldField] - 1),
            [newField]: currentPost[newField] + 1
          })
          .eq('id', postId);
      }
    } else {
      // Add new like/dislike
      await supabase
        .from('post_likes')
        .insert({
          post_id: postId,
          user_id: userId,
          action: action
        });

      // Update post counts
      const updateField = action === 'like' ? 'likes_count' : 'dislikes_count';
      const { data: currentPost } = await supabase
        .from('forum_posts')
        .select(updateField)
        .eq('id', postId)
        .single();
      
      await supabase
        .from('forum_posts')
        .update({ [updateField]: currentPost[updateField] + 1 })
        .eq('id', postId);
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error updating likes:', error);
    res.status(500).json({ error: 'Failed to update likes' });
  }
}

function getTimeAgo(dateString) {
  const now = new Date();
  const postDate = new Date(dateString);
  const diffInSeconds = Math.floor((now - postDate) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  return `${Math.floor(diffInSeconds / 86400)} days ago`;
}
