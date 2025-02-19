import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function VideoPlayer() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/videos/${id}`
        );
        setVideo(response.data);
        const commentsResponse = await axios.get(
          `http://localhost:5000/api/videos/${id}/comments`
        );
        setComments(commentsResponse.data);
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };
    fetchVideo();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/api/videos/${id}/comments`,
        {
          content: newComment,
        }
      );
      setComments([...comments, response.data]);
      setNewComment("");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  if (!video) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <video
        controls
        className="w-full aspect-video mb-4"
        src={`http://localhost:5000/${video.videoPath}`}
      />
      <h1 className="text-2xl font-bold mb-4">{video.title}</h1>
      <p className="text-gray-600 mb-8">{video.description}</p>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>
        <form onSubmit={handleCommentSubmit} className="mb-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Add a comment..."
            rows="3"
          />
          <button
            type="submit"
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Post Comment
          </button>
        </form>
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment._id} className="bg-white p-4 rounded-lg shadow">
              <p className="text-gray-800">{comment.content}</p>
              <p className="text-gray-500 text-sm mt-2">
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
