import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RezeptForm({ kategorien = [], zutaten = [], onSave }) {
    const [titel, setTitel] = useState('');
    const [beschreibung, setBeschreibung] = useState('');
    const [kategorieId, setKategorieId] = useState('');

    const [currentZutatId, setCurrentZutatId] = useState('');
    const [currentMenge, setCurrentMenge] = useState('');
    const [currentEinheit, setCurrentEinheit] = useState('');
    const [zutatenListe, setZutatenListe] = useState([]);

    const [currentSchrittText, setCurrentSchrittText] = useState('');
    const [schritteListe, setSchritteListe] = useState([]);

    const navigate = useNavigate();

    const addZutat = () => {
        if (!currentZutatId || !currentMenge || !currentEinheit) return;
        setZutatenListe([
            ...zutatenListe,
            { id: Date.now().toString(), zutatenId: currentZutatId, menge: currentMenge, einheit: currentEinheit }
        ]);
        setCurrentZutatId(''); setCurrentMenge(''); setCurrentEinheit('');
    };

    const removeZutat = (id) => {
        setZutatenListe(zutatenListe.filter(z => z.id !== id));
    };

    const addSchritt = () => {
        if (!currentSchrittText.trim()) return;
        setSchritteListe([
            ...schritteListe,
            { id: Date.now().toString(), beschreibung: currentSchrittText.trim() }
        ]);
        setCurrentSchrittText('');
    };

    const removeSchritt = (id) => {
        setSchritteListe(schritteListe.filter(s => s.id !== id));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!titel.trim() || !beschreibung.trim() || !kategorieId) return;
        const neuesRezept = {
            id: Date.now().toString(),
            titel: titel.trim(),
            beschreibung: beschreibung.trim(),
            kategorieId,
            schritteIds: schritteListe.map(s => s.id),
            zutatenIds: zutatenListe.map(z => z.zutatenId),
            bildUrl: '',
            bewertung: null
        };
        onSave(neuesRezept, zutatenListe, schritteListe);
        navigate('/rezepte');
    };

    return (
        <section className="section">
            <div className="container">
                <h2 className="title is-3">Neues Rezept anlegen</h2>
                <form onSubmit={handleSubmit}>

                    <div className="field">
                        <label className="label">Titel</label>
                        <div className="control">
                            <input className="input" type="text" value={titel} onChange={e => setTitel(e.target.value)} required />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Beschreibung</label>
                        <div className="control">
                            <textarea className="textarea" value={beschreibung} onChange={e => setBeschreibung(e.target.value)} required />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Kategorie</label>
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select value={kategorieId} onChange={e => setKategorieId(e.target.value)} required>
                                    <option value="">Wähle eine Kategorie</option>
                                    {kategorien.map(k => <option key={k.id} value={k.id}>{k.name}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="box">
                        <h3 className="title is-5">Zutaten</h3>
                        <div className="field is-grouped">
                            <div className="control is-expanded">
                                <div className="select is-fullwidth">
                                    <select value={currentZutatId} onChange={e => setCurrentZutatId(e.target.value)}>
                                        <option value="">Zutat wählen</option>
                                        {zutaten.map(z => <option key={z.id} value={z.id}>{z.name}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="control">
                                <input className="input" type="text" placeholder="Menge" value={currentMenge} onChange={e => setCurrentMenge(e.target.value)} />
                            </div>
                            <div className="control">
                                <input className="input" type="text" placeholder="Einheit" value={currentEinheit} onChange={e => setCurrentEinheit(e.target.value)} />
                            </div>
                            <div className="control">
                                <button type="button" className="button is-link" onClick={addZutat}>Hinzufügen</button>
                            </div>
                        </div>
                        <ul>
                            {zutatenListe.map(z => {
                                const findZ = zutaten.find(item => item.id === z.zutatenId);
                                return (
                                    <li key={z.id}>
                                        {findZ?.name || '-'}: {z.menge} {z.einheit}
                                        <button type="button" className="button is-small is-danger ml-3" onClick={() => removeZutat(z.id)}>Entfernen</button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <div className="box">
                        <h3 className="title is-5">Zubereitungsschritte</h3>
                        <div className="field has-addons">
                            <div className="control is-expanded">
                                <input className="input" type="text" placeholder="Schrittbeschreibung" value={currentSchrittText} onChange={e => setCurrentSchrittText(e.target.value)} />
                            </div>
                            <div className="control">
                                <button type="button" className="button is-link" onClick={addSchritt}>Hinzufügen</button>
                            </div>
                        </div>
                        <ol>
                            {schritteListe.map((s) => (
                                <li key={s.id} className="mb-2">
                                    {s.beschreibung}
                                    <button type="button" className="button is-small is-danger ml-3" onClick={() => removeSchritt(s.id)}>Entfernen</button>
                                </li>
                            ))}
                        </ol>
                    </div>

                    {/* Submit */}
                    <div className="field is-grouped mt-5">
                        <div className="control">
                            <button type="submit" className="button is-link">Speichern</button>
                        </div>
                        <div className="control">
                            <button type="button" className="button is-light" onClick={() => navigate('/rezepte')}>Abbrechen</button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default RezeptForm;
