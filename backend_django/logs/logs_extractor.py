#logs/logs_extractor.py
import re
from netmiko import ConnectHandler
from datetime import datetime

# Fonction d'extraction et enregistrement des logs
def extraire_logs_juniper(routeur):
    """Extraire les logs d'un routeur Juniper"""
    try:
        connexion = ConnectHandler(**routeur)
        output = connexion.send_command('show log messages | last 3000')
        connexion.disconnect()
        return output
    except Exception as e:
        print(f"Erreur lors de la connexion au routeur {routeur['host']}: {e}")
        return None

def extraire_logs_cisco(routeur):
    """Extraire les logs d'un routeur Cisco"""
    try:
        connexion = ConnectHandler(**routeur)
        output = connexion.send_command('show logging | last 3000')
        connexion.disconnect()
        return output
    except Exception as e:
        print(f"Erreur lors de la connexion au routeur {routeur['host']}: {e}")
        return None

def filtrer_erreurs_warnings(logs):
    """Filtrer les erreurs et les warnings dans les logs"""
    pattern = re.compile(r'(error|warning)', re.IGNORECASE)
    resultats = []
    
    for ligne in logs.splitlines():
        if pattern.search(ligne):
            timestamp = datetime.now().strftime('%H:%M:%S')
            resultats.append(f"{timestamp} - {ligne}")
    
    return resultats

def enregistrer_logs(routeur, logs_filtrés):
    """Enregistrer les logs filtrés dans un fichier .txt"""
    nom_fichier = f"logs_{routeur['host']}.txt"
    
    with open(nom_fichier, 'a') as f:
        for log in logs_filtrés:
            f.write(log + '\n')
    
    print(f"Logs enregistrés dans {nom_fichier}")

def recuperer_et_filtrer_logs_1():
    routeur_1 = {
        'device_type': 'cisco_ios_telnet',
        'host': '127.0.0.1',
        'port': 5004,

    }
    logs = extraire_logs_cisco(routeur_1)
    if logs:
        logs_filtrés = filtrer_erreurs_warnings(logs)
        enregistrer_logs(routeur_1, logs_filtrés)

def recuperer_et_filtrer_logs_2():
    routeur_2 = {
        'device_type': 'cisco_ios_telnet',
        'host': '127.0.0.1',
        'port': 5005,

    }
    logs = extraire_logs_cisco(routeur_2)
    if logs:
        logs_filtrés = filtrer_erreurs_warnings(logs)
        enregistrer_logs(routeur_2, logs_filtrés)

def recuperer_et_filtrer_logs_3():
    routeur_3 = {
        'device_type': 'cisco_ios_telnet',
        'host': '127.0.0.1',
        'port': 5006,

    }
    logs = extraire_logs_cisco(routeur_3)
    if logs:
        logs_filtrés = filtrer_erreurs_warnings(logs)
        enregistrer_logs(routeur_3, logs_filtrés)

def recuperer_et_filtrer_logs_4():
    routeur_4 = {
        'device_type': 'cisco_ios_telnet',
        'host': '127.0.0.1',
        'port': 5007,

    }
    logs = extraire_logs_cisco(routeur_4)
    if logs:
        logs_filtrés = filtrer_erreurs_warnings(logs)
        enregistrer_logs(routeur_4, logs_filtrés)

def recuperer_et_filtrer_logs_5():
    routeur_5 = {
        'device_type': 'juniper_junos_telnet',
        'host': '127.0.0.1',
        'port': 5000,
        'username': 'admin',
        'password': 'root123',
    }
    logs = extraire_logs_juniper(routeur_5)
    if logs:
        logs_filtrés = filtrer_erreurs_warnings(logs)
        enregistrer_logs(routeur_5, logs_filtrés)

def recuperer_et_filtrer_logs_6():
    routeur_6 = {
        'device_type': 'juniper_junos_telnet',
        'host': '127.0.0.1',
        'port': 5001,
        'username': 'admin',
        'password': 'root123',
    }
    logs = extraire_logs_juniper(routeur_6)
    if logs:
        logs_filtrés = filtrer_erreurs_warnings(logs)
        enregistrer_logs(routeur_6, logs_filtrés)

def recuperer_et_filtrer_logs_7():
    routeur_7 = {
        'device_type': 'juniper_junos_telnet',
        'host': '127.0.0.1',
        'port': 5003,
        'username': 'admin',
        'password': 'root123',
    }
    logs = extraire_logs_juniper(routeur_7)
    if logs:
        logs_filtrés = filtrer_erreurs_warnings(logs)
        enregistrer_logs(routeur_7, logs_filtrés)

def recuperer_et_filtrer_logs_8():
    routeur_8 = {
        'device_type': 'juniper_junos_telnet',
        'host': '127.0.0.1',
        'port': 5002,
        'username': 'admin',
        'password': 'root123',
    }
    logs = extraire_logs_juniper(routeur_8)
    if logs:
        logs_filtrés = filtrer_erreurs_warnings(logs)
        enregistrer_logs(routeur_8, logs_filtrés)