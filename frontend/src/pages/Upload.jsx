import React, { useState } from 'react';
import axios from 'axios';

const Upload = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState('');
    const [image, setImage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('http://localhost:5000/articles', 
                { title, content, category, tags: tags.split(','), image, author: 'User' },
                { headers: { 'Authorization': `Bearer ${token}` } }
            );
            if (response.status === 201) {
                alert('Article uploaded successfully!');
                // Reset form fields
                setTitle('');
                setContent('');
                setCategory('');
                setTags('');
                setImage('');
            } else {
                throw new Error('Unexpected response from server');
            }
        } catch (error) {
            console.error('Error uploading article:', error);
            alert('Failed to upload article. Please try again.');
        }
    };

    return (
        <main className="w-full my-20 xl:my-40 grid place-items-center">
            <form onSubmit={handleSubmit} className="w-full max-w-[90%] xl:max-w-[70%]">
                <h2 className="text-2xl font-semibold mb-4">Upload Article</h2>
                <input
                    className="w-full p-2 mb-4 border rounded"
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    className="w-full p-2 mb-4 border rounded"
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <input
                    className="w-full p-2 mb-4 border rounded"
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                />
                <input
                    className="w-full p-2 mb-4 border rounded"
                    type="text"
                    placeholder="Tags (comma-separated)"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                />
                <input
                    className="w-full p-2 mb-4 border rounded"
                    type="text"
                    placeholder="Image URL"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
                <button
                    className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    type="submit"
                >
                    Upload Article
                </button>
            </form>
        </main>
    );
};

export default Upload;