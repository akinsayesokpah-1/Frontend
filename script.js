// ⚡ Backend API URL (replace with your Render URL)
const API_URL = "https://socialapp-backend.onrender.com/api";

// Load posts from backend
async function loadPosts() {
  const feed = document.getElementById("feedList");
  feed.innerHTML = "Loading...";

  try {
    const res = await fetch(`${API_URL}/posts`);
    const posts = await res.json();

    feed.innerHTML = "";
    posts.forEach(p => {
      const tpl = document.getElementById("postTemplate").content.cloneNode(true);
      tpl.querySelector(".text").textContent = p.text;
      feed.appendChild(tpl);
    });

  } catch (err) {
    feed.innerHTML = "Error loading posts.";
    console.error(err);
  }
}

// Create a new post
async function createPost(text) {
  if (!text) return alert("Write something first!");
  try {
    await fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });
    document.getElementById("postText").value = "";
    loadPosts();
  } catch (err) {
    alert("Failed to post");
    console.error(err);
  }
}

// Event listeners
document.getElementById("postBtn").onclick = () => {
  const text = document.getElementById("postText").value.trim();
  createPost(text);
};

// Initial load
loadPosts();
