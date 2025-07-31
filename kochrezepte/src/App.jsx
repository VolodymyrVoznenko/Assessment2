import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home.jsx';
import RezeptList from './components/RezeptList.jsx';
import RezeptDetail from './components/RezeptDetail.jsx';
import RezeptForm from './components/RezeptForm.jsx';
import Kategorien from './components/Kategorien.jsx';

import { rezepteData as initialRezepte } from './data/rezepteData';
import { kategorienData as initialKategorien } from './data/kategorienData';
import { zutatenData as initialZutaten } from './data/zutatenData';
import { rezeptZutatenData as initialRezeptZutaten } from './data/rezeptZutatenData';
import { schritteData as initialSchritte } from './data/schritteData';
import RezeptEdit from "./components/RezeptEdit.jsx";

function App() {
  const [rezepte, setRezepte] = useState(initialRezepte);
  const [kategorien, setKategorien] = useState(initialKategorien);
  const [zutaten, setZutaten] = useState(initialZutaten);
  const [rezeptZutaten, setRezeptZutaten] = useState(initialRezeptZutaten);
  const [schritte, setSchritte] = useState(initialSchritte);

  return (
      <Router>
        <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <Link className="navbar-item" to="/">
              <strong>RezeptVerwaltung</strong>
            </Link>
          </div>
          <div className="navbar-menu">
            <div className="navbar-start">
              <Link className="navbar-item" to="/rezepte">
                Rezepte
              </Link>
              <Link className="navbar-item" to="/rezepte/new">
                Neues Rezept
              </Link>
              <Link className="navbar-item" to="/kategorien">
                Kategorien
              </Link>
            </div>
          </div>
        </nav>

        <section className="section">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                  path="/rezepte"
                  element={
                    <RezeptList
                        rezepte={rezepte}
                    />
                  }
              />
                <Route
                    path="/rezepte/new"
                    element={
                        <RezeptForm
                            kategorien={kategorien}
                            zutaten={zutaten}
                            onSave={(newRezept, newZutatenList, newSchritteList) => {

                                setRezepte(prev => [...prev, newRezept]);
                                setRezeptZutaten(prev => [...prev, ...newZutatenList.map(z => ({...z, rezeptId: newRezept.id}))]);
                                setSchritte(prev => [...prev, ...newSchritteList.map((s, idx) => ({...s, rezeptId: newRezept.id, reihenfolge: idx + 1}))]);

                            }}
                        />
                    }
                />
              <Route
                  path="/rezepte/:id"
                  element={
                    <RezeptDetail
                        rezepte={rezepte}
                        zutaten={zutaten}
                        rezeptZutaten={rezeptZutaten}
                        schritte={schritte}
                        kategorien={kategorien}
                        onDelete={(id) => setRezepte(rezepte.filter(r => r.id !== id))}
                        onUpdate={(aktualisiert) =>
                            setRezepte(rezepte.map(r => r.id === aktualisiert.id ? aktualisiert : r))
                        }
                    />
                  }
              />
                <Route
                    path="/rezepte/:id/edit"
                    element={
                        <RezeptEdit
                            rezepte={rezepte}
                            kategorien={kategorien}
                            zutaten={zutaten}
                            rezeptZutaten={rezeptZutaten}
                            schritte={schritte}
                            onUpdate={(r, zList, sList) => {
                                setRezepte(rezepte.map(rec => rec.id === r.id ? r : rec));
                                setRezeptZutaten(rezeptZutaten.filter(rz => rz.rezeptId !== r.id).concat(zList));
                                setSchritte(schritte.filter(s => !r.schritteIds.includes(s.id)).concat(sList));
                            }}
                        />
                    }
                />
              <Route
                  path="/kategorien"
                  element={
                    <Kategorien
                        kategorien={kategorien}
                        rezepte={rezepte}
                    />
                  }
              />
            </Routes>
          </div>
        </section>
      </Router>
  );
}

export default App;
