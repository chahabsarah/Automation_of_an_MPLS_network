from django.shortcuts import render
import os
from netmiko import ConnectHandler
from django.http import JsonResponse
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

class BaseRouterConfigTest(View):
    router_name = ""
    config_file_name = ""

    @method_decorator(csrf_exempt, name='dispatch')
    def post(self, request):
        # Si tu veux encore utiliser POST dans d'autres cas, tu peux ajouter la logique ici
        return JsonResponse({'error': 'Utilisez la méthode GET pour obtenir les différences de configuration.'}, status=405)

    def get(self, request):
        config_file_path = f'configuration/{self.config_file_name}'

        if not os.path.isfile(config_file_path):
            return JsonResponse({'error': 'Le fichier de configuration de référence n\'existe pas.'}, status=400)

        with open(config_file_path, 'r') as file:
            test_config = file.readlines()

        router_config = self.get_router_configuration()

        differences = self.compare_configurations(test_config, router_config)

        if not differences['missing'] and not differences['extra']:
            message = "Aucune différence entre la configuration du routeur et la configuration de référence."
        else:
            message = "Il y a des différences entre la configuration du routeur et la configuration de référence."

        return JsonResponse({
            'message': message,
            'differences': differences
        })

    def get_router_configuration(self):
        raise NotImplementedError("Cette méthode doit être implémentée dans la sous-classe.")

    def compare_configurations(self, reference_config, router_config):
        differences = {
            'missing': [],
            'extra': [],
        }

        reference_set = set(line.strip() for line in reference_config)
        router_set = set(line.strip() for line in router_config)

        for line in reference_set:
            if line not in router_set:
                differences['missing'].append(line)

        for line in router_set:
            if line not in reference_set:
                differences['extra'].append(line)

        return differences

    def fetch_router_config(self, router):
        try:
            connection = ConnectHandler(**router)
            connection.send_command_timing('enable')
            output = connection.send_command("show configuration")
            connection.disconnect()
            return output.splitlines()
        except Exception as e:
            return [f"Erreur de connexion à {router['host']}: {str(e)}"]
    def fetch_juniper_config(self, router):
        try:
            connection = ConnectHandler(**router)
            output = connection.send_command("show configuration | display set")
            connection.disconnect()
            return output.splitlines()
        except Exception as e:
            return [f"Erreur de connexion à {router['host']}: {str(e)}"]
class TestRouter1Config(BaseRouterConfigTest):
    router_name = "R1"
    config_file_name = "confrouteur1.txt"

    def get_router_configuration(self):
        router = {
            'device_type': 'cisco_ios_telnet',
            'host': '127.0.0.1',
            'port': 5004,

        }
        return self.fetch_router_config(router)

class TestRouter2Config(BaseRouterConfigTest):
    router_name = "R2"
    config_file_name = "confrouteur2.txt"

    def get_router_configuration(self):
        router = {
            'device_type': 'cisco_ios_telnet',
            'host': '127.0.0.1',
            'port': 5005,

        }
        return self.fetch_router_config(router)

class TestRouter3Config(BaseRouterConfigTest):
    router_name = "R3"
    config_file_name = "confrouteur3.txt"

    def get_router_configuration(self):
        router = {
            'device_type': 'cisco_ios_telnet',
            'host': '127.0.0.1',
            'port': 5006,

        }
        return self.fetch_router_config(router)

class TestRouter4Config(BaseRouterConfigTest):
    router_name = "R4"
    config_file_name = "confrouteur4.txt"

    def get_router_configuration(self):
        router = {
            'device_type': 'cisco_ios_telnet',
            'host': '127.0.0.1',
            'port': 5007,

        }
        return self.fetch_router_config(router)

class TestJuniper1Config(BaseRouterConfigTest):
    router_name = "J1"
    config_file_name = "juniperun.txt"

    def get_router_configuration(self):
        router = {
            'device_type': 'juniper_junos_telnet',
            'host': '127.0.0.1',
            'port': 5000,
            'username': 'admin',
            'password': 'root123',
        }
        return self.fetch_juniper_config(router)

class TestJuniper2Config(BaseRouterConfigTest):
    router_name = "J2"
    config_file_name = "juniperdeux.txt"

    def get_router_configuration(self):
        router = {
            'device_type': 'juniper_junos_telnet',
            'host': '127.0.0.1',
            'port': 5001,
            'username': 'admin',
            'password': 'root123',
        }
        return self.fetch_juniper_config(router)

class TestJuniper3Config(BaseRouterConfigTest):
    router_name = "J3"
    config_file_name = "junipertrois.txt"

    def get_router_configuration(self):
        router = {
        'device_type': 'juniper_junos_telnet',
        'host': '127.0.0.1',
        'port': 5003,
        'username': 'admin',
        'password': 'root123',
}
        return self.fetch_juniper_config(router)

class TestJuniper4Config(BaseRouterConfigTest):
    router_name = "J4"
    config_file_name = "juniperquatre.txt"

    def get_router_configuration(self):
        router = {
            'device_type': 'juniper_junos_telnet',
            'host': '127.0.0.1',
            'port': 5003,
            'username': 'admin',
            'password': 'root123',
        }
        return self.fetch_juniper_config(router)
