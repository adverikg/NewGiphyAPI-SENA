import React, { useState, useEffect } from 'react';
import './App.css';

const apiKey = 'RvWAGyRwnV8BJfVjCQt3pm9n22BpvPAQ';

function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [gifs, setGifs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getTrendingGIFs();
    }, []);

    const searchGIFs = async () => {
        if (!searchTerm.trim()) {
            alert('Please enter a search term');
            return;
        }

        setLoading(true);
        const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchTerm}&limit=20`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setGifs(data.data);
        } catch (error) {
            console.error('Error fetching and displaying GIFs:', error);
            alert('Failed to fetch GIFs. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const getTrendingGIFs = async () => {
        setLoading(true);
        const url = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=20`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setGifs(data.data);
        } catch (error) {
            console.error('Error fetching and displaying trending GIFs:', error);
            alert('Failed to fetch trending GIFs. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Busca Tus GIFs"
                aria-label="Search GIFs"
            />
            <button onClick={searchGIFs}>Buscar</button>
            <div id="gifContainer">
                {loading ? (
                    <div id="loading" aria-live="polite">Loading...</div>
                ) : (
                    gifs.map((gif) => (
                        <img key={gif.id} src={gif.images.fixed_height.url} alt={gif.title} className="gif" />
                    ))
                )}
            </div>
        </div>
    );
}

export default App;
