import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const User = () => {
    const [user, setUser] = useState(null);
    const [articles, setArticles] = useState([]);
    const [editingArticle, setEditingArticle] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token');
            const userResponse = await axios.get('http://localhost:5000/user', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setUser(userResponse.data);
            const articlesResponse = await axios.get('http://localhost:5000/my-articles', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setArticles(articlesResponse.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleEdit = (article) => {
        setEditingArticle(article);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.patch(`http://localhost:5000/articles/${editingArticle._id}`, editingArticle, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setEditingArticle(null);
            fetchUserData();
            alert('Article updated successfully!');
        } catch (error) {
            console.error('Error updating article:', error);
            alert('Failed to update article. Please try again.');
        }
    };

    const handleDelete = async (articleId) => {
        if (window.confirm('Are you sure you want to delete this article?')) {
            const token = localStorage.getItem('token');
            try {
                await axios.delete(`http://localhost:5000/articles/${articleId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                fetchUserData();
                alert('Article deleted successfully!');
            } catch (error) {
                console.error('Error deleting article:', error);
                alert('Failed to delete article. Please try again.');
            }
        }
    };

    if (!user) {
        return <div></div>;
    }

    return (
        <main className="w-full my-20 xl:my-40 flex flex-col items-center">
            <div className="w-full max-w-[90%] xl:max-w-[70%] bg-white shadow-lg rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">User Profile</h2>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <button
                    onClick={handleLogout}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </div>

            <div className="w-full max-w-[90%] xl:max-w-[70%]">
                <h2 className="text-2xl font-bold mb-4">Artikel Saya</h2>
                {articles.length === 0 ? (
                    <p>You haven't uploaded any articles yet.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {articles.map(article => (
                            <div key={article._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                                {article.image && <img src={article.image} alt={article.title} className="w-full h-48 object-cover"/>}
                                <div className="p-4">
                                <h3 className="font-bold text-xl mb-2">
                                    <a href={`/article/${article._id}`} className="hover:underline">{article.title}</a>
                                </h3>
                                <p className="text-gray-700 text-base mb-2">{article.content.substring(0, 100)}...</p>
                                <div className="mt-4 flex justify-end gap-3">
                                    <button onClick={() => handleEdit(article)} className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                                    <button onClick={() => handleDelete(article._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                                </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {editingArticle && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <h3 className="text-lg font-bold mb-4">Edit Article</h3>
                        <form onSubmit={handleUpdate}>
                            <input
                                type="text"
                                value={editingArticle.title}
                                onChange={e => setEditingArticle({...editingArticle, title: e.target.value})}
                                className="w-full p-2 mb-4 border rounded"
                                placeholder="Title"
                            />
                            <textarea
                                value={editingArticle.content}
                                onChange={e => setEditingArticle({...editingArticle, content: e.target.value})}
                                className="w-full p-2 mb-4 border rounded"
                                placeholder="Content"
                            />
                            <input
                                type="text"
                                value={editingArticle.category}
                                onChange={e => setEditingArticle({...editingArticle, category: e.target.value})}
                                className="w-full p-2 mb-4 border rounded"
                                placeholder="Category"
                            />
                            <input
                                type="text"
                                value={editingArticle.tags.join(', ')}
                                onChange={e => setEditingArticle({...editingArticle, tags: e.target.value.split(', ')})}
                                className="w-full p-2 mb-4 border rounded"
                                placeholder="Tags (comma-separated)"
                            />
                            <input
                                type="text"
                                value={editingArticle.image}
                                onChange={e => setEditingArticle({...editingArticle, image: e.target.value})}
                                className="w-full p-2 mb-4 border rounded"
                                placeholder="Category"
                            />
                            <div className="flex justify-between">
                                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Update</button>
                                <button onClick={() => setEditingArticle(null)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </main>
    )
}

export default User