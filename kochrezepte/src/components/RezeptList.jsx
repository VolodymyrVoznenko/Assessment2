import React, { useState } from 'react';
import { Link } from 'react-router-dom';
function RezeptList({rezepte}) {
    const [search, setSearch] = useState('');

    const filteredRezepte = rezepte.filter(r =>
        r.titel.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <section className="section">
            <div className="container">
                <h2 className="title is-3">Rezepte</h2>

                <div className="field has-addons">
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            placeholder="Nach Titel suchen..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {filteredRezepte.length === 0 ? (
                    <p>Keine Rezepte gefunden</p>
                ) : (
                    <ul className="menu-list">
                        {filteredRezepte.map(r => (
                            <li key={r.id}>
                                <Link to={`/rezepte/${r.id}`}>
                                    {r.titel}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
}

export default RezeptList;
