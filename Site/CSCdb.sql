USE csc_db;

DROP TABLE IF EXISTS Richieste;
DROP TABLE IF EXISTS Prenotazione;
DROP TABLE IF EXISTS Campo;
DROP TABLE IF EXISTS Attivita;
DROP TABLE IF EXISTS Cliente;
DROP TABLE IF EXISTS Utente;

CREATE TABLE Utente (
    email VARCHAR(100) NOT NULL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET = utf8;

INSERT INTO Utente VALUES 
                    ("admin", "admin"),
                    ("pippo@gmail.com", "pippo"),
                    ("pluto@gmail.com", "pluto"),
                    ("paperino@gmail.com", "paperino");

CREATE TABLE Cliente (
    email VARCHAR(100) NOT NULL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    cognome VARCHAR(50) NOT NULL,
    pass_hash VARCHAR(255) NOT NULL,
    FOREIGN KEY (email) REFERENCES Utente(email)
) ENGINE=InnoDB DEFAULT CHARSET = utf8;

INSERT INTO Cliente VALUES 
                    ("admin", "admin", "admin", "admin"),
                    ("pluto@gmail.com", "pluto", "plutoropoli", "1234"),
                    ("pippo@gmail.com", "pippo", "pipputo", "0000"),
                    ("paperino@gmail.com", "paperino", "de paperoni", "$$$$$");

CREATE TABLE Attivita (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome_sport VARCHAR(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET = utf8;

INSERT INTO Attivita VALUES 
                    (1, "Calcetto"),
                    (2, "Calcio"),
                    (3, "Pallavolo"),
                    (4, "Tennis"),
                    (5, "Paddel");

CREATE TABLE Campo (
    codice CHAR(1) NOT NULL,
    id_Attivita INT NOT NULL,
    PRIMARY KEY (codice, id_Attivita),
    FOREIGN KEY (id_Attivita) REFERENCES Attivita(id)
) ENGINE=InnoDB DEFAULT CHARSET = utf8;

INSERT INTO Campo VALUES 
                    ('A', 1),
                    ('B', 1),
                    ('C', 1),
                    ('A', 2),
                    ('A', 3),
                    ('B', 3),
                    ('A', 4),
                    ('A', 5),
                    ('B', 5),
                    ('C', 5),
                    ('D', 1);

CREATE TABLE Prenotazione (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    codice_campo CHAR(1) NOT NULL,
    id_Attivita INT NOT NULL,
    utente VARCHAR(100) NOT NULL,
    data DATE NOT NULL,
    ora TIME NOT NULL,
    FOREIGN KEY (codice_campo, id_Attivita) REFERENCES Campo(codice, id_Attivita), -- Chiave esterna composta
    FOREIGN KEY (utente) REFERENCES Utente(email)
) ENGINE=InnoDB DEFAULT CHARSET = utf8;

INSERT INTO Prenotazione VALUES 
                    (1, 'A', 1, "pippo@gmail.com", '2023-12-01', '08:00'),
                    (2, 'A', 2, "admin", '2023-12-01', '10:00'),
                    (3, 'A', 2, "pluto@gmail.com", '2023-12-03', '12:00'),
                    (4, 'C', 1, "pippo@gmail.com", '2023-12-05', '09:00'),
                    (5, 'B', 5, "pippo@gmail.com", '2023-12-05', '19:00'),
                    (6, 'B', 1, "pluto@gmail.com", '2023-12-06', '08:00'),
                    (7, 'A', 4, "paperino@gmail.com", '2023-12-09', '15:00'),
                    (8, 'A', 3, "paperino@gmail.com", '2023-12-09', '21:00'),
                    (9, 'C', 1, "pippo@gmail.com", '2023-12-15', '08:00'),
                    (10, 'B', 3, "pluto@gmail.com", '2023-12-15', '08:00');

CREATE TABLE Richieste (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    titolo VARCHAR(50),
    testo VARCHAR(500) NOT NULL,
    FOREIGN KEY (email) REFERENCES Utente(email)
) ENGINE=InnoDB DEFAULT CHARSET = utf8;

INSERT INTO Richieste VALUES
                    (1, "pluto@gmail.com", "Sconti natalizi", "Salve, vorrei sapere se per il periodo natalizio siete aperti e se sono previsti sconti. Grazie."),
                    (2, "paperino@gmail.com", "SONO UN VIP", "Salve, sapete chi sono io vero? Sono Paperino De Paperoni, in persona! Ho intenzione di prenotarmi un campetto per paddel, non pagherò nulla vero?? sono un vip.");
