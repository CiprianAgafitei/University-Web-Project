<?php

namespace CSC;

class CSCAccess {
	private const HOST_DB = "localhost";
	private const DATABASE_NAME = "csc_db";
	private const USERNAME = "root";
	private const PASSWORD = "";

	private $connection;
		
	/** INSTAURAZIONE DELLA CONNESSIONE */
	public function openConnection() {
            try {
                $this->connection = mysqli_connect(
                    self::HOST_DB,
                    self::USERNAME,
                    self::PASSWORD,
                    self::DATABASE_NAME
                );
    
                if (!$this->connection) {
                    throw new \mysqli_sql_exception("Failed to connect to MySQL: " . mysqli_connect_error());
                }
                return true;
            } catch (\mysqli_sql_exception $e) {
                echo "Connection failed: " . $e->getMessage();
                return false;
            }
        }

        /** CHIUSURA DELLA CONNESSIONE */
        public function closeConnection() {
            try {
                if ($this->connection) {
                    mysqli_close($this->connection);
                    $this->connection = null;
                    return true;
                } else {
                    throw new \Exception("Connection is not established.");
                }
            } catch (\Exception $e) {
                echo "Error while closing connection: " . $e->getMessage();
                return false;
            }
        }
        
        /** VERIFICA CORRETTEZZA DELLE CREDENZIALI-LOGIN  DEL CLIENTE */
        public function checkLoginClientCredentials($email, $password) {
            	$queryCheck = "SELECT * FROM Cliente WHERE Email=\"$email\" AND Pass_hash=\"$password\"";	
            	$queryResult = mysqli_query($this->connection, $queryCheck) or die("Errore in DBAccess" . mysqli_error($this->connection));
		return mysqli_num_rows($queryResult) > 0;
        }
        
        /** VERIFICA SE L'UTENTE HA GIA EFFETTUATO RICHIESTE/PRENOTAZIONI 
         *     (se l'email già presente nel db nella tabella utenti) */
        public function checkUser($email) {
            	$queryCheck = "SELECT * FROM Utente WHERE Email=\"$email\"";
            	$queryResult = mysqli_query($this->connection, $queryCheck) or die("Errore in DBAccess" . mysqli_error($this -> connection));
		return mysqli_num_rows($queryResult) > 0;
        }

	/** VERIFICA SE L'UTENTE è GIA REGISTRATO */
        public function checkRegisteredClient($email) {
            	$queryCheck = "SELECT * FROM Cliente  WHERE Email=\"$email\"";
            	$queryResult = mysqli_query($this->connection, $queryCheck) or die("Errore in DBAccess" . mysqli_error($this -> connection));
		return mysqli_num_rows($queryResult) > 0;
        }

        /** INSERIMENTO NUOVO UTENTE */
        public function insertNewUser($email, $nome) {
		/* Inserimento in db con valori "" (campo vuoto) se il valori sono null sui campi che accettano null */
		$queryInsert = "INSERT INTO Utente(Email, Nome) 
								VALUES (\"$email\", \"$nome\")";
		mysqli_query($this->connection, $queryInsert) or die(mysqli_error($this->connection));
		return mysqli_affected_rows($this->connection) > 0;
	}

        /** INSERIMENTO NUOVO CLIENTE */
        public function insertNewClient($email, $nome, $cognome, $password) {
		/* Inserimento in db con valori "" (campo vuoto) se il valori sono null sui campi che accettano null */
		$queryInsert = "INSERT INTO Cliente(Email, Nome, Cognome, Pass_hash) 
								VALUES (\"$email\", \"$nome\", \"$cognome\", \"$password\")";
		mysqli_query($this->connection, $queryInsert) or die(mysqli_error($this->connection));
		return mysqli_affected_rows($this->connection) > 0;
	}

        /** INSERIMENTO NUOVA PRENOTAZIONE */
        public function insertNewPrenotation($campo, $attività, $utente, $data, $ora) {
		$id_attività = $this->getIdAttivita($attività);
		$queryInsert = "INSERT INTO Prenotazione(Codice_campo, Id_Attivita, Utente, Data, Ora) 
								VALUES (\"$campo\", \"$id_attività\", \"$utente\", \"$data\", \"$ora\")";
		mysqli_query($this->connection, $queryInsert) or die(mysqli_error($this->connection));
		return mysqli_affected_rows($this->connection) > 0;
	}
		
	/** RIMOZIONE DI UNA PRENOTAZIONE */
        public function removePrenotation($campo, $attivita, $utente, $data, $ora) {
		$id_attivita = $this->getIdAttivita($attivita);
		$queryRemove = "DELETE FROM Prenotazione WHERE codice_campo=\"$campo\" AND id_attivita=\"$id_attivita\" 
					AND utente=\"$utente\" AND data=\"$data\" AND ora=\"$ora\"";
		mysqli_query($this->connection, $queryRemove) or die(mysqli_error($this->connection));
		return mysqli_affected_rows($this->connection) > 0;
	}

        /** INSERIMENTO NUOVA RICHIESTA */
        public function insertNewRequest($email, $titolo, $testo) {
		/* Inserimento in db con valori "" (campo vuoto) se il valori sono null sui campi che accettano null */
		$queryInsert = "INSERT INTO Richieste(Email, Titolo, Testo) 
								VALUES (\"$email\", NULLIF(\"$titolo\", \"\"), \"$testo\")";
		mysqli_query($this->connection, $queryInsert) or die(mysqli_error($this->connection));
		return mysqli_affected_rows($this->connection) > 0;
	}
        
        /** OTTENIMENTO DI TUTTE LE PRENOTAZIONI DI UN UNTENTE ORDINATE CRONOLOGICAMENTE */
        public function getClientPrenotations($email) {
		$query = "SELECT * FROM Prenotazione WHERE Utente=\"$email\" ORDER BY data";
		$queryResult = mysqli_query($this->connection, $query) or die("Errore in DBAccess" . mysqli_error($this->connection));

		if(mysqli_num_rows($queryResult) != 0){
			$result = array();
			while($row = mysqli_fetch_assoc($queryResult)) 
			{
				$result[] = $row;
			}
			mysqli_free_result($queryResult);
			return $result;
		} 
		else {
			return null;
		}
	}

	/** OTTENIMENTO DEL NOME DELL'ATTIVITA DATO L'ID */
	public function getActivityName($id) {
		$query = "SELECT nome_sport FROM Attivita WHERE id=\"$id\"";
		$queryResult = mysqli_query($this->connection, $query) or die("Errore in DBAccess" . mysqli_error($this -> connection));
			
		if ($queryResult) {
			$row = mysqli_fetch_assoc($queryResult);
			return isset($row['nome_sport']) ? $row['nome_sport'] : "Nome sport non disponibile";
		}else {
			return "Nome sport non disponibile";
		}
	}

        /** OTTENIMENTO DI TUTTE LE PRENOTAZIONI DI TUTTI GLI UTENTI */
        public function getAllPrenotations() {
		$query = "SELECT * FROM Prenotazione ORDER BY data";
		$queryResult = mysqli_query($this->connection, $query) or die("Errore in DBAccess" . mysqli_error($this -> connection));

		if(mysqli_num_rows($queryResult) != 0){
			$result = array();
			while($row = mysqli_fetch_assoc($queryResult)) 
			{
				$result[] = $row;
			}
			mysqli_free_result($queryResult);
			return $result;
		} 
		else {
			return null;
		}
	}
	
	/** OTTENIMENTO DI TUTTE LE RICHIESTE */
	public function getAllRequests() {
		$query = "SELECT * FROM Richieste";
		$queryResult = mysqli_query($this->connection, $query) or die("Errore in DBAccess" . mysqli_error($this -> connection));

		if(mysqli_num_rows($queryResult) != 0){
			$result = array();
			while($row = mysqli_fetch_assoc($queryResult)) 
			{
				$result[] = $row;
			}
			mysqli_free_result($queryResult);
			return $result;
		} 
		else {
			return null;
		}
	}

	/** OTTENIMENTO DELL'ID DELL'ATTIVITA PASSATA COME PARAMETRO */
	private function getIdAttivita($attivita) {
		$query = "SELECT id FROM Attivita WHERE nome_sport=\"$attivita\"";
		$queryResult = mysqli_query($this->connection, $query) or die("Errore in DBAccess" . mysqli_error($this -> connection));

		$row = mysqli_fetch_assoc($queryResult);
		$id_attivita = ($row !== null) ? $row['id'] : null;

		mysqli_free_result($queryResult);
		return $id_attivita;
	}

	/** CONTEGGIO DEL NUMERO DI CAMPO DISPONIBILI DI UNA CERTA ATTIVITA */
	private function getNumeroCampiAttivita($id_attivita) {
		$query = "SELECT COUNT(*) AS nrCampi FROM Campo WHERE id_Attivita=\"$id_attivita\"";
		$result = mysqli_query($this->connection, $query);
		$row = mysqli_fetch_assoc($result);
		return $row['nrCampi'];
	}

	/** OTTENIMENTO DEGLI ORARI DELLE PRENOTAZIONI EFFETTUATE IN UNA CERTA DATA DI UNA PARTICOLARE ATTIVITA
	 * 		CON TRACCIAMENTO DEL NUMERO DI CAMPI DISPONIBILI PER TALE ATTIVITA E INCROCIO CON I CAMPI
	 * 								PRENOTATI PER CIASCUN ORARIO
	 * 				(utile per visualizzare in seguito le disponibilità restanti) */
	public function getReservedPrenotations($data_scelta, $attivita) {
		$id_attivita = $this->getIdAttivita($attivita);
		$query = "SELECT ora, codice_campo
					  FROM Prenotazione P JOIN Campo C 
					  ON P.codice_campo=C.codice AND P.id_Attivita=C.id_Attivita
					  WHERE P.data='$data_scelta' 
					  AND P.id_Attivita='$id_attivita'
					  ORDER BY P.ora";		// Ordinati in modo crescente in base all'ora
			
		$queryResult = mysqli_query($this->connection, $query) or die("Errore in DBAccess" . mysqli_error($this -> connection));

		if(mysqli_num_rows($queryResult) != 0)
		{
			$result = array();
			while($row = mysqli_fetch_assoc($queryResult)) 
			{
				$result[] = $row;
			}
			mysqli_free_result($queryResult);

			// Verifica disponibilita campi con gli orari occupati
			$nr_campi_disp = $this->getNumeroCampiAttivita($id_attivita);
			if ($nr_campi_disp == 1)
				return $result;
			
			$newResult = array();
			$conta_rip_ora_corr = 0;

			for ($i = 0; $i < count($result)-1; $i++) 
			{
				if ($i-1 > 0 && $result[$i-1]['ora'] !== $result[$i]['ora'])
					$conta_rip_ora_corr = 1;
				else
					$conta_rip_ora_corr++;
					
				for ($j = $i+1; $j < count($result); $j++) 
				{
					if ($result[$j]['ora'] == $result[$i]['ora']) {
						$conta_rip_ora_corr++;
					}
					else
						break;
				}
				// Se ci sono ancora campi disponibili tolgo la prenotazione
				if ($conta_rip_ora_corr == $nr_campi_disp) {
					$newResult[] = $result[$i];
				}
			}
			return $newResult;
		} 
		else {
			return null;
		}
	}

	/** OTTENIMENTO DEL PRIMO CAMPO DISPONIBILE CON DATA, L'ATTIVITA SCELTA E L'ORARIO */
	public function getCampoDisponibile($data_scelta, $attivita, $orario) {
		$id_attivita = $this->getIdAttivita($attivita);
		$query = "SELECT codice
					  FROM Campo
				  	  WHERE id_Attivita = \"$id_attivita\"
					  AND codice NOT IN (SELECT codice_campo FROM Prenotazione WHERE data=\"$data_scelta\" AND id_Attivita=\"$id_attivita\" AND ora=\"$orario\")
					  LIMIT 1";
		$queryResult = mysqli_query($this->connection, $query) or die("Errore in DBAccess" . mysqli_error($this -> connection));
		
		$row = mysqli_fetch_assoc($queryResult);
		$campo = ($row && mysqli_num_rows($queryResult) > 0) ? $row['codice'] : null;

		mysqli_free_result($queryResult);
		return $campo;
	}

	/** AGGIORNAMENTO DEL NOME UTENTE DELLA PRENOTAZIONE DA "guest" A $email */
	public function updateUserPrenotation($campo, $data, $attivita, $ora, $email) {
		$id_attivita = $this->getIdAttivita($attivita);
		if ($ora !== null) {
			$query = "UPDATE Prenotazione SET utente=\"$email\" WHERE codice_campo=\"$campo\" AND data=\"$data\"
									 AND id_Attivita=\"$id_attivita\" AND ora=\"$ora\"";
			mysqli_query($this->connection, $query) or die(mysqli_error($this->connection));
		}
	}

	/** OTTENIMENTO DELLE INFORMAZIONI (nome e cognome) DELL'UTENTE DATA LA SUA MAIL */
	public function getClientInfoDetails($email) {
		$query = "SELECT nome, cognome FROM Cliente WHERE email=\"$email\"";
		$queryResult = mysqli_query($this->connection, $query);

		if ($queryResult) {
			$result = mysqli_fetch_assoc($queryResult);
			mysqli_free_result($queryResult);
		
			return array(
				'nome' => $result['nome'],
				'cognome' => $result['cognome']
			);
		}
		return null;
	}

	/** OTTENIMENTO DEL NOME DELL'ATTIVITA CORRISPONDENTE ALL'ID */
	public function getNomeAttivita($id_attivita) {
		$query = "SELECT nome_sport
					  FROM Attivita
				  	  WHERE id_Attivita=\"$id_attivita\"";
		$queryResult = mysqli_query($this->connection, $query) or die("Errore in DBAccess" . mysqli_error($this -> connection));

		$row = mysqli_fetch_assoc($queryResult);
		$attivita = ($row && mysqli_num_rows($queryResult) > 0) ? $row['nome_sport'] : null;

		mysqli_free_result($queryResult);
		return $attivita;
	}

	/******************FUNZIONI PER FILE UPDATE_PASSWORD PHP */
		public function getUserPassword($email) {
			$query = "SELECT Pass_hash FROM Cliente WHERE Email=?";
			
			$stmt = mysqli_prepare($this->connection, $query);
			mysqli_stmt_bind_param($stmt, 's', $email);
			mysqli_stmt_execute($stmt);
			$result = mysqli_stmt_get_result($stmt);
	
			if ($row = mysqli_fetch_assoc($result)) {
				return $row['Pass_hash'];
			} else {
				return null;
			}
		}
	
		/** AGGIORNAMENTO DELLA PASSWORD DI UN UTENTE */
		public function updateUserPassword($email, $newPasswordHash) {
			$query = "UPDATE Cliente SET Pass_hash=? WHERE Email=?";
			
			$stmt = mysqli_prepare($this->connection, $query);
			mysqli_stmt_bind_param($stmt, 'ss', $newPasswordHash, $email);
			mysqli_stmt_execute($stmt);
	
			return mysqli_stmt_affected_rows($stmt) > 0;
		}

	public function getPrenotationsByEmail($email) {
			$query = "SELECT * FROM Prenotazione WHERE utente = ?"; 
			
			$stmt = mysqli_prepare($this->connection, $query);
			mysqli_stmt_bind_param($stmt, 's', $email);
			mysqli_stmt_execute($stmt);
			
			$result = mysqli_stmt_get_result($stmt);
			
			if ($result) {
				$prenotations = array();
				while ($row = mysqli_fetch_assoc($result)) {
					$prenotations[] = $row;
				}
				return $prenotations;
			} else {
				return null;
			}
		}
	
}
