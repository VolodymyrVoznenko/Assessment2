import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Kategorien({ kategorien = [], rezepte = [] }) {
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const filteredRezepte = rezepte.filter(r => {
        if (!selectedCategory) return true;
        return String(r.kategorieId) === String(selectedCategory);
    });

    return (
        <section className="section">
            <div className="container">
                <h2 className="title is-3">Rezepte nach Kategorie</h2>

                <div className="field">
                    <label className="label">Kategorie filtern</label>
                    <div className="control">
                        <div className="select">
                            <select value={selectedCategory} onChange={handleChange}>
                                <option value="">Alle Kategorien</option>
                                {kategorien.map(k => (
                                    <option key={k.id} value={k.id}>{k.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {filteredRezepte.length === 0 ? (
                    <p>Keine Rezepte gefunden.</p>
                ) : (
                    <ul className="menu-list">
                        {filteredRezepte.map(r => (
                            <li key={r.id}>
                                <Link to={`/rezepte/${r.id}`}>{r.titel}</Link>
                            </li>
                        ))}
                    </ul>
                )}

                <div className="buttons mt-5">
                    <Link className="button is-light" to="/">Zurück zur Startseite</Link>
                </div>
            </div>
        </section>
    );
}

export default Kategorien;
