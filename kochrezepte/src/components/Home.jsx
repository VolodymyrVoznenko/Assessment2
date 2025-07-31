import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <section className="hero">
            <div className="hero-body">
                <div className="container has-text-centered">
                    <h1 className="title is-1">Rezeptverwaltung</h1>
                    <h2 className="subtitle is-4">
                        Erstelle, zeige, bearbeite und lösche deine Kochrezepte einfach
                    </h2>

                    <div className="columns is-centered">
                        <div className="column is-one-quarter">
                            <div className="box">
                                <h3 className="title is-5">Rezepte</h3>
                                <p className="subtitle is-6">Alle Rezepte anzeigen und verwalten</p>
                                <Link to="/rezepte" className="button is-primary is-fullwidth">
                                    Rezepte anzeigen
                                </Link>
                            </div>
                        </div>

                        <div className="column is-one-quarter">
                            <div className="box">
                                <h3 className="title is-5">Neues Rezept</h3>
                                <p className="subtitle is-6">Ein neues Rezept anlegen</p>
                                <Link to="/rezepte/new" className="button is-link is-fullwidth">
                                    Rezept erstellen
                                </Link>
                            </div>
                        </div>

                        <div className="column is-one-quarter">
                            <div className="box">
                                <h3 className="title is-5">Kategorien</h3>
                                <p className="subtitle is-6">Rezepte nach Kategorie filtern</p>
                                <Link to="/kategorien" className="button is-info is-fullwidth">
                                    Kategorien
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Home;
