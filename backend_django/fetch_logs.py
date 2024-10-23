import logging
from django.core.management.base import BaseCommand
from logs.models import LogEntry
from netmiko import ConnectHandler

class Command(BaseCommand):
    help = 'Fetch logs from routers'

    routers = [
        {
            'device_type': 'juniper_junos_telnet',
            'host': '127.0.0.1',
            'port': 5003,
            'username': 'admin',
            'password': 'root123',
        },
        {
            'device_type': 'juniper_junos_telnet',
            'host': '127.0.0.1',
            'port': 5002,
            'username': 'admin',
            'password': 'root123',
        },
        {
            'device_type': 'juniper_junos_telnet',
            'host': '127.0.0.1',
            'port': 5000,
            'username': 'admin',
            'password': 'root123',
            'timeout': 60,
        },
        {
            'device_type': 'cisco_ios_telnet',
            'host': '127.0.0.1',
            'port': 5004,
            'username': 'votre_nom_utilisateur',
            'password': 'votre_mot_de_passe',
        },
        {
            'device_type': 'cisco_ios_telnet',
            'host': '127.0.0.1',
            'port': 5005,
            'username': 'votre_nom_utilisateur',
            'password': 'votre_mot_de_passe',
        },
        {
            'device_type': 'cisco_ios_telnet',
            'host': '127.0.0.1',
            'port': 5006,
            'username': 'votre_nom_utilisateur',
            'password': 'votre_mot_de_passe',
        },
        {
            'device_type': 'cisco_ios_telnet',
            'host': '127.0.0.1',
            'port': 5007,
            'username': 'votre_nom_utilisateur',
            'password': 'votre_mot_de_passe',
        },
        {
            'device_type': 'juniper_junos_telnet',
            'host': '127.0.0.1',
            'port': 5001,
            'username': 'admin',
            'password': 'root123',
        }
    ]

    def handle_logs(self, command, level):
        for router in self.routers:
            try:
                connection = ConnectHandler(**router)
                output = connection.send_command(command)

                # Enregistrer les logs dans la base de données
                log_entry = LogEntry(device_name=router['host'], message=output, level=level)
                log_entry.save()

                connection.disconnect()
            except Exception as e:
                logging.error(f"Error connecting to {router['host']}: {e}")

    def handle(self, *args, **options):
        # Gérer les logs pour Juniper
        self.handle_logs("show log messages | match error", 'error')  # Pour erreurs
        self.handle_logs("show log messages | match warning", 'alert')  # Pour avertissements
        
        # Gérer les logs pour Cisco
        self.handle_logs("show logging | include error", 'error')  # Pour erreurs
        self.handle_logs("show logging | include warning", 'alert')  # Pour avertissements
