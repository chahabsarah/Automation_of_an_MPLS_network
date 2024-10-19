from django.http import HttpResponse
from netmiko import ConnectHandler

"""ping and interfaces state test"""
def router_interfaces_r1(request):
    r1 = {
        'device_type': 'cisco_ios_telnet',
        'host': '127.0.0.1',
        'port': 5004,
        'username': 'votre_nom_utilisateur',  # Remplacez par votre nom d'utilisateur
        'password': 'votre_mot_de_passe',      # Remplacez par votre mot de passe
    }
    
    target_ip = '9.9.9.9' #3al r3
    try:
        # Connexion au routeur
        connection = ConnectHandler(**r1)
        
        # Exécution de la commande
        output = connection.send_command('show ip interface brief')
        output2 = connection.send_command(f'ping {target_ip}')



        # Affichage de la sortie
        return HttpResponse(f"<pre>{output}</pre> \n {output2}")

    except Exception as e:
        return HttpResponse(f"Une erreur s'est produite : {e}")

    finally:
        # Déconnexion du routeur
        connection.disconnect()


def router_interfaces_r2(request):
    r2 = {
        'device_type': 'cisco_ios_telnet',
        'host': '127.0.0.1',  # Adresse IP locale
        'port': 5005,          # Port Telnet pour R2
        'username': 'votre_nom_utilisateur',  # Remplacez par votre nom d'utilisateur
        'password': 'votre_mot_de_passe',      # Remplacez par votre mot de passe
    }

    target_ip = '6.6.6.6' #rourhou
    try:
        # Connexion au routeur
        connection = ConnectHandler(**r2)
        
        # Exécution de la commande
        output = connection.send_command('show ip interface brief')
        output2 = connection.send_command(f'ping {target_ip}')

        # Affichage de la sortie
        return HttpResponse(f"<pre>{output}</pre> \n {output2}")

    except Exception as e:
        return HttpResponse(f"Une erreur s'est produite : {e}")

    finally:
        # Déconnexion du routeur
        connection.disconnect()


def router_interfaces_r3(request):
    r3 = {
        'device_type': 'cisco_ios_telnet',
        'host': '127.0.0.1',  # Adresse IP locale
        'port': 5006,          # Port Telnet pour R3
        'username': 'votre_nom_utilisateur',  # Remplacez par votre nom d'utilisateur
        'password': 'votre_mot_de_passe',      # Remplacez par votre mot de passe
    }

    target_ip = '5.5.5.5' 
    try:
        # Connexion au routeur
        connection = ConnectHandler(**r3)
        
        # Exécution de la commande
        output = connection.send_command('show ip interface brief')
        output2 = connection.send_command(f'ping {target_ip}')

        # Affichage de la sortie
        return HttpResponse(f"<pre>{output}</pre> \n {output2}")
    except Exception as e:
        return HttpResponse(f"Une erreur s'est produite : {e}")

    finally:
        # Déconnexion du routeur
        connection.disconnect()


def router_interfaces_r4(request):
    r4 = {
        'device_type': 'cisco_ios_telnet',
        'host': '127.0.0.1',  # Adresse IP locale
        'port': 5007,          # Port Telnet pour R4
        'username': 'votre_nom_utilisateur',  # Remplacez par votre nom d'utilisateur
        'password': 'votre_mot_de_passe',      # Remplacez par votre mot de passe
    }

    target_ip = '6.6.6.6'#3al r2 
    try:
        # Connexion au routeur
        connection = ConnectHandler(**r4)
        
        # Exécution de la commande
        output = connection.send_command('show ip interface brief')
        output2 = connection.send_command(f'ping {target_ip}')

        # Affichage de la sortie
        return HttpResponse(f"<pre>{output}</pre> \n {output2}")

    except Exception as e:
        return HttpResponse(f"Une erreur s'est produite : {e}")

    finally:
        # Déconnexion du routeur
        connection.disconnect()

"""routing sessions ospf & bgp test ,mpls route test , vrf test , ressources system test"""

def router_interfaces_j1(request):
    j1 = {
        'device_type': 'juniper_junos_telnet',  # Type de dispositif correct
        'host': '127.0.0.1',
        'port': 5000,
        'username': 'admin',  # Remplacez par votre nom d'utilisateur
        'password': 'root123',  # Remplacez par votre mot de passe
    }
    
    connection = None
    output = ""

    try:
        # Connexion au routeur
        connection = ConnectHandler(**j1)

        # Exécution de la commande pour afficher les interfaces
        output = connection.send_command('show interfaces brief')
        output2 = connection.send_command('show configuration protocols ospf')
        output3 = connection.send_command('show configuration protocols bgp')
        output4 = connection.send_command('show route table mpls.0')
        output5 = connection.send_command('show configuration routing-instances')
        output6 = connection.send_command('show system processes extensive') #cpu
        output7 = connection.send_command('show system memory')#memoire
        output8 = connection.send_command('show system storage')#disque dur

    except Exception as e:
        # Ignorer les erreurs de connexion
        output = "Connexion échouée, mais la commande est toujours exécutée."

        # Exécuter la commande même si la connexion échoue
        try:
            connection = ConnectHandler(**j1)  # Essayer à nouveau de se connecter
            output += "\n" + connection.send_command('show interfaces brief')
        except Exception as inner_e:
            output += f"\nImpossible d'exécuter la commande : {inner_e}"

    finally:
        # Déconnexion si la connexion a été établie
        if connection:
            try:
                connection.disconnect()
            except Exception as e:
                pass  # Ignorer les erreurs lors de la déconnexion

    # Affichage de la sortie
    return HttpResponse(f"<pre>{output}</pre>\n<pre>{output2}</pre>\n<pre>{output3}</pre>\n<pre>{output4}</pre>\n<pre>{output5}</pre>\n<pre>{output6}</pre>\n<pre>{output7}</pre>\n<pre>{output8}</pre>\n")


def router_interfaces_j2(request):
    j2 = {
        'device_type': 'juniper_junos_telnet',  # Type de dispositif correct
        'host': '127.0.0.1',
        'port': 5001,
        'username': 'admin',  # Remplacez par votre nom d'utilisateur
        'password': 'root123',  # Remplacez par votre mot de passe
    }
    
    connection = None
    output = ""

    try:
        # Connexion au routeur
        connection = ConnectHandler(**j2)

        # Exécution de la commande pour afficher les interfaces
        output = connection.send_command('show interfaces brief')
        output2 = connection.send_command('show configuration protocols ospf')
        output3 = connection.send_command('show configuration protocols bgp')
        output4 = connection.send_command('show route table mpls.0')
        output5 = connection.send_command('show configuration routing-instances')
        output6 = connection.send_command('show system processes extensive') #cpu
        output7 = connection.send_command('show system memory')#memoire
        output8 = connection.send_command('show system storage')#disque dur

    except Exception as e:
        # Ignorer les erreurs de connexion
        output = "Connexion échouée, mais la commande est toujours exécutée."

        # Exécuter la commande même si la connexion échoue
        try:
            connection = ConnectHandler(**j2)  # Essayer à nouveau de se connecter
            output += "\n" + connection.send_command('show interfaces brief')
        except Exception as inner_e:
            output += f"\nImpossible d'exécuter la commande : {inner_e}"

    finally:
        # Déconnexion si la connexion a été établie
        if connection:
            try:
                connection.disconnect()
            except Exception as e:
                pass  # Ignorer les erreurs lors de la déconnexion

    # Affichage de la sortie
    return HttpResponse(f"<pre>{output}</pre>\n<pre>{output2}</pre>\n<pre>{output3}</pre>\n<pre>{output4}</pre>\n<pre>{output5}</pre>\n<pre>{output6}</pre>\n<pre>{output7}</pre>\n<pre>{output8}</pre>\n")


def router_interfaces_j3(request):
    j3 = {
        'device_type': 'juniper_junos_telnet',  # Type de dispositif correct
        'host': '127.0.0.1',
        'port': 5003,
        'username': 'admin',  # Remplacez par votre nom d'utilisateur
        'password': 'root123',  # Remplacez par votre mot de passe
    }
    
    connection = None
    output = ""

    try:
        # Connexion au routeur
        connection = ConnectHandler(**j3)

        # Exécution de la commande pour afficher les interfaces
        output = connection.send_command('show interfaces brief')
        output2 = connection.send_command('show configuration protocols ospf')
        output3 = connection.send_command('show configuration protocols bgp')
        output4 = connection.send_command('show route table mpls.0')
        output5 = connection.send_command('show configuration routing-instances')
        output6 = connection.send_command('show system processes extensive') #cpu
        output7 = connection.send_command('show system memory')#memoire
        output8 = connection.send_command('show system storage')#disque dur

    except Exception as e:
        # Ignorer les erreurs de connexion
        output = "Connexion échouée, mais la commande est toujours exécutée."

        # Exécuter la commande même si la connexion échoue
        try:
            connection = ConnectHandler(**j3)  # Essayer à nouveau de se connecter
            output += "\n" + connection.send_command('show interfaces brief')
        except Exception as inner_e:
            output += f"\nImpossible d'exécuter la commande : {inner_e}"

    finally:
        # Déconnexion si la connexion a été établie
        if connection:
            try:
                connection.disconnect()
            except Exception as e:
                pass  # Ignorer les erreurs lors de la déconnexion

    # Affichage de la sortie
    return HttpResponse(f"<pre>{output}</pre>\n<pre>{output2}</pre>\n<pre>{output3}</pre>\n<pre>{output4}</pre>\n<pre>{output5}</pre>\n<pre>{output6}</pre>\n<pre>{output7}</pre>\n<pre>{output8}</pre>\n")


def router_interfaces_j4(request):
    j4 = {
        'device_type': 'juniper_junos_telnet',  # Type de dispositif correct
        'host': '127.0.0.1',
        'port': 5002,
        'username': 'admin',  # Remplacez par votre nom d'utilisateur
        'password': 'root123',  # Remplacez par votre mot de passe
    }
    
    connection = None
    output = ""

    try:
        # Connexion au routeur
        connection = ConnectHandler(**j4)

        # Exécution de la commande pour afficher les interfaces
        output = connection.send_command('show interfaces brief')
        output2 = connection.send_command('show configuration protocols ospf')
        output3 = connection.send_command('show configuration protocols bgp')
        output4 = connection.send_command('show route table mpls.0')
        output5 = connection.send_command('show configuration routing-instances')
        output6 = connection.send_command('show system processes extensive') #cpu
        output7 = connection.send_command('show system memory')#memoire
        output8 = connection.send_command('show system storage')#disque dur
    except Exception as e:
        # Ignorer les erreurs de connexion
        output = "Connexion échouée, mais la commande est toujours exécutée."

        # Exécuter la commande même si la connexion échoue
        try:
            connection = ConnectHandler(**j4)  # Essayer à nouveau de se connecter
            output += "\n" + connection.send_command('show interfaces brief')
        except Exception as inner_e:
            output += f"\nImpossible d'exécuter la commande : {inner_e}"

    finally:
        # Déconnexion si la connexion a été établie
        if connection:
            try:
                connection.disconnect()
            except Exception as e:
                pass  # Ignorer les erreurs lors de la déconnexion

    # Affichage de la sortie
    return HttpResponse(f"<pre>{output}</pre>\n<pre>{output2}</pre>\n<pre>{output3}</pre>\n<pre>{output4}</pre>\n<pre>{output5}</pre>\n<pre>{output6}</pre>\n<pre>{output7}</pre>\n<pre>{output8}</pre>\n")

