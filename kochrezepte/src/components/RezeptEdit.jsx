import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function RezeptEdit({ rezepte = [], kategorien = [], zutaten = [], rezeptZutaten = [], schritte = [], onUpdate }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const rezept = rezepte.find(r => r.id === id);

    const initialZutatenList = rezeptZutaten
        .filter(rz => rz.rezeptId === id)
        .map((rz, idx) => ({...rz, id: rz.id || `${rz.zutatenId}-${idx}`}));

    const initialSchritteList = schritte.filter(s => rezept.schritteIds.includes(s.id));

    const [titel, setTitel] = useState(rezept.titel);
    const [beschreibung, setBeschreibung] = useState(rezept.beschreibung);
    const [kategorieId, setKategorieId] = useState(rezept.kategorieId);
    const [zutatenList, setZutatenList] = useState(initialZutatenList);
    const [stepsList, setStepsList] = useState(initialSchritteList);

    const [selZutat, setSelZutat] = useState('');
    const [menge, setMenge] = useState('');
    const [einheit, setEinheit] = useState('');
    const [stepText, setStepText] = useState('');

    if (!rezept) {
        return <p>Rezept nicht gefunden.</p>;
    }

    const handleAddZutat = () => {
        if (!selZutat || !menge || !einheit) return;
        setZutatenList(list => [
            ...list,
            { rezeptId: id, zutatenId: selZutat, menge, einheit, id: Date.now().toString() }
        ]);
        setSelZutat(''); setMenge(''); setEinheit('');
    };
    const handleRemoveZutat = zid =>
        setZutatenList(list => list.filter(z => z.id !== zid));

    const handleAddStep = () => {
        if (!stepText.trim()) return;
        setStepsList(list => [
            ...list,
            { id: Date.now().toString(), beschreibung: stepText.trim() }
        ]);
        setStepText('');
    };
    const handleRemoveStep = sid =>
        setStepsList(list => list.filter(s => s.id !== sid));

    const handleSave = e => {
        e.preventDefault();
        const updated = {
            ...rezept,
            titel: titel.trim(),
            beschreibung: beschreibung.trim(),
            kategorieId,
            schritteIds: stepsList.map(s => s.id),
            zutatenIds: zutatenList.map(z => z.zutatenId)
        };

        onUpdate(updated, zutatenList, stepsList);
        navigate(`/rezepte/${id}`);
    };

    const handleCancel = () => {
        navigate(`/rezepte/${id}`);
    };

    return (
        <section className="section">
            <div className="container">
                <h2 className="title is-3">Rezept bearbeiten</h2>
                <form onSubmit={handleSave}>

                    <div className="field">
                        <label className="label">Titel</label>
                        <div className="control">
                            <input className="input" value={titel} onChange={e => setTitel(e.target.value)} />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Beschreibung</label>
                        <div className="control">
                            <textarea className="textarea" value={beschreibung} onChange={e => setBeschreibung(e.target.value)} />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Kategorie</label>
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select value={kategorieId} onChange={e => setKategorieId(e.target.value)}>
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
                                    <select value={selZutat} onChange={e => setSelZutat(e.target.value)}>
                                        <option value="">Zutat wählen</option>
                                        {zutaten.map(z => <option key={z.id} value={z.id}>{z.name}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="control">
                                <input className="input" placeholder="Menge" value={menge} onChange={e => setMenge(e.target.value)} />
                            </div>
                            <div className="control">
                                <input className="input" placeholder="Einheit" value={einheit} onChange={e => setEinheit(e.target.value)} />
                            </div>
                            <div className="control">
                                <button type="button" className="button is-link" onClick={handleAddZutat}>Hinzufügen</button>
                            </div>
                        </div>
                        <ul>
                            {zutatenList.map(z => {
                                const zname = zutaten.find(item => item.id === z.zutatenId)?.name;
                                return (
                                    <li key={z.id} className="mb-2">
                                        {zname}: {z.menge} {z.einheit}
                                        <button
                                            type="button"
                                            className="button is-small is-danger ml-3"
                                            onClick={() => handleRemoveZutat(z.id)}
                                        >
                                            Entfernen
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <div className="box">
                        <h3 className="title is-5">Zubereitungsschritte</h3>
                        <div className="field has-addons">
                            <div className="control is-expanded">
                                <input className="input" placeholder="Schrittbeschreibung" value={stepText} onChange={e => setStepText(e.target.value)} />
                            </div>
                            <div className="control">
                                <button type="button" className="button is-link" onClick={handleAddStep}>Hinzufügen</button>
                            </div>
                        </div>
                        <ol>
                            {stepsList.map((s) => (
                                <li key={s.id} className="mb-2">
                                    {s.beschreibung}
                                    <button
                                        type="button"
                                        className="button is-small is-danger ml-3"
                                        onClick={() => handleRemoveStep(s.id)}
                                    >
                                        Entfernen
                                    </button>
                                </li>
                            ))}
                        </ol>
                    </div>

                    <div className="field is-grouped mt-5">
                        <div className="control">
                            <button className="button is-link" type="submit">Speichern</button>
                        </div>
                        <div className="control">
                            <button className="button is-light" type="button" onClick={handleCancel}>Abbrechen</button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default RezeptEdit;
