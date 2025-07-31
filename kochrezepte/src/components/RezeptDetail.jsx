import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

function RezeptDetail({
                          rezepte = [],
                          kategorien = [],
                          zutaten = [],
                          rezeptZutaten = [],
                          schritte = [],
                          onDelete
                      }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const rezept = rezepte.find(r => String(r.id) === id);
    if (!rezept) {
        return (
            <section className="section">
                <div className="container">
                    <div className="box">
                        <h2 className="title is-4">Rezept nicht gefunden</h2>
                        <Link className="button is-light" to="/rezepte">
                            Zurück zur Liste
                        </Link>
                    </div>
                </div>
            </section>
        );
    }

    const kategorieName = kategorien
        .find(k => String(k.id) === String(rezept.kategorieId))
        ?.name || '—';

    const zutatenList = rezeptZutaten
        .filter(rz => String(rz.rezeptId) === id)
        .map(rz => ({
            ...rz,
            name: zutaten.find(z => String(z.id) === String(rz.zutatenId))?.name || 'Unbekannt'
        }));

    const schritteList = Array.isArray(rezept.schritteIds)
        ? schritte
            .filter(s => rezept.schritteIds.map(String).includes(String(s.id)))
            .sort((a, b) => (a.reihenfolge || 0) - (b.reihenfolge || 0))
        : [];

    const handleDelete = () => {
        if (window.confirm('Bist du sicher, dass du dieses Rezept löschen möchtest?')) {
            onDelete(id);
            navigate('/rezepte');
        }
    };

    return (
        <section className="section">
            <div className="container">
                <div className="box">
                    <h2 className="title is-3">{rezept.titel}</h2>
                    <p className="subtitle is-6 mt-2">
                        <strong>Kategorie:</strong> {kategorieName}
                    </p>

                    {rezept.bildUrl && (
                        <figure className="image mb-4">
                            <img src={rezept.bildUrl} alt={rezept.titel} />
                        </figure>
                    )}

                     {rezept.bewertung != null && (
                        <p className="mb-4"><strong>Bewertung:</strong> {"★".repeat(rezept.bewertung)}</p>
                     )}

                    <p className="content">{rezept.beschreibung}</p>

                    <h3 className="title is-5 mt-5">Zutaten</h3>
                    {zutatenList.length > 0 ? (
                        <ul>
                            {zutatenList.map((rz, idx) => (
                                <li key={idx}>
                                    {rz.name}: {rz.menge} {rz.einheit}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Keine Zutaten vorhanden.</p>
                    )}

                    <h3 className="title is-5 mt-5">Zubereitungsschritte</h3>
                    {schritteList.length > 0 ? (
                        <ol>
                            {schritteList.map(s => (
                                <li key={s.id} className="mb-2">
                                    {s.beschreibung}
                                </li>
                            ))}
                        </ol>
                    ) : (
                        <p>Keine Schritte vorhanden.</p>
                    )}

                    <div className="buttons mt-4">
                        <Link className="button is-warning" to={`/rezepte/${id}/edit`}>
                            Rezept bearbeiten
                        </Link>
                        <button className="button is-danger" onClick={handleDelete}>
                            Rezept löschen
                        </button>
                        <Link className="button is-light" to="/rezepte">
                            Zurück zur Liste
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default RezeptDetail;


