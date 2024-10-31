from django.http import HttpResponse
from netmiko import ConnectHandler
from django.http.response import JsonResponse





def router_interfaces_r1(request):
    r1 = {
        'device_type': 'cisco_ios_telnet',
        'host': '127.0.0.1',
        'port': 5004,
        'username': 'votre_nom_utilisateur',
        'password': 'votre_mot_de_passe',
    }

    target_ip = '9.9.9.9'
    try:
        connection = ConnectHandler(**r1)
        output = connection.send_command('show ip interface brief')
        output2 = connection.send_command(f'ping {target_ip}')
        return JsonResponse({
            'interfaces': output,
            'ping': output2
        })
        
    except Exception as e:
        logger.error(f"Error connecting to router R1: {e}")
        return JsonResponse({'error': str(e)}, status=500)

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
        return JsonResponse({
            'interfaces': output,
            'ping': output2
        })
        
    except Exception as e:
        return JsonResponse({
            'error': str(e)
        }, status=500)

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
        
        output = connection.send_command('show ip interface brief')
        output2 = connection.send_command(f'ping {target_ip}')
        return JsonResponse({
            'interfaces': output,
            'ping': output2
        })
        
    except Exception as e:
        return JsonResponse({
            'error': str(e)
        }, status=500)

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
        return JsonResponse({
            'interfaces': output,
            'ping': output2
        })
        
    except Exception as e:
        return JsonResponse({
            'error': str(e)
        }, status=500)

#routeurs J (type juniper) :

# routeur j2

def router_interfaces_j2(request):
    j2 = {
        'device_type': 'juniper_junos_telnet',
        'host': '127.0.0.1',
        'port': 5001,
        'username': 'admin',
        'password': 'root123',
}
    connection = None
    output = {}

    try:
        connection = ConnectHandler(**j2)
        
        output = connection.send_command('show interface brief')
        return JsonResponse({
            'interfaces': output,
        })
        
    except Exception as e:
        return JsonResponse({
            'error': str(e)
        }, status=500)


def router_mpls_route_table_j2(request):

    j2 = {
        'device_type': 'juniper_junos_telnet',
        'host': '127.0.0.1',
        'port': 5001,
        'username': 'admin',
        'password': 'root123',
}
    connection = None
    output = {}

    try:
        connection = ConnectHandler(**j2)
        
        output = connection.send_command('show route table mpls.0')
        return JsonResponse({
            'mpls': output,
        })
        
    except Exception as e:
        return JsonResponse({
            'error': str(e)
        }, status=500)


def router_routing_instances_j2(request):

    j2 = {
        'device_type': 'juniper_junos_telnet',
        'host': '127.0.0.1',
        'port': 5001,
        'username': 'admin',
        'password': 'root123',
}
    connection = None
    output = {}

    try:
        connection = ConnectHandler(**j2)
        
        output = connection.send_command('show configuration routing-instances')
        return JsonResponse({
            'vrf': output,
        })
        
    except Exception as e:
        return JsonResponse({
            'error': str(e)
        }, status=500)


def router_system_processes_j2(request):

    j2 = {
        'device_type': 'juniper_junos_telnet',
        'host': '127.0.0.1',
        'port': 5001,
        'username': 'admin',
        'password': 'root123',
        'timeout' : 60,
}
    connection = None
    output = {}

    try:
        connection = ConnectHandler(**j2)
        
        output = connection.send_command('show system processes extensive')
        return JsonResponse({
            'proc': output,
        })
        
    except Exception as e:
        return JsonResponse({
            'error': str(e)
        }, status=500)


def router_system_memory_j2(request):

    j2 = {
        'device_type': 'juniper_junos_telnet',
        'host': '127.0.0.1',
        'port': 5001,
        'username': 'admin',
        'password': 'root123',
}
    connection = None
    output = {}

    try:
        connection = ConnectHandler(**j2)
        
        output = connection.send_command('show system memory')
        return JsonResponse({
            'memory': output,
        })
        
    except Exception as e:
        return JsonResponse({
            'error': str(e)
        }, status=500)


def router_system_memory_j1(request):

    j1 = {
    'device_type': 'juniper_junos_telnet',
    'host': '127.0.0.1',
    'port': 5000,
    'username': 'admin',
    'password': 'root123',
}
    connection = None
    output = {}

    try:
        connection = ConnectHandler(**j1)
        
        output = connection.send_command('show system memory')
        return JsonResponse({
            'memory': output,
        })
        
    except Exception as e:
        return JsonResponse({
            'error': str(e)
        }, status=500)



def router_system_memory_j4(request):

    j4 = {
        'device_type': 'juniper_junos_telnet',
        'host': '127.0.0.1',
        'port': 5002,
        'username': 'admin',
        'password': 'root123',
        'timeout': 60, 

    }
    connection = None
    output = {}

    try:
        connection = ConnectHandler(**j4)
        
        output = connection.send_command('show system memory')
        return JsonResponse({
            'memory': output,
        })
        
    except Exception as e:
        return JsonResponse({
            'error': str(e)
        }, status=500)


def router_system_memory_j3(request):

    j3 = {
        'device_type': 'juniper_junos_telnet',
        'host': '127.0.0.1',
        'port': 5003,
        'username': 'admin',
        'password': 'root123',
}
    connection = None
    output = {}

    try:
        connection = ConnectHandler(**j3)
        
        output = connection.send_command('show system memory')
        return JsonResponse({
            'memory': output,
        })
        
    except Exception as e:
        return JsonResponse({
            'error': str(e)
        }, status=500)



def router_system_storage_j2(request):

    j2 = {
        'device_type': 'juniper_junos_telnet',
        'host': '127.0.0.1',
        'port': 5001,
        'username': 'admin',
        'password': 'root123',
}
    connection = None
    output = {}

    try:
        connection = ConnectHandler(**j2)
        
        output = connection.send_command('show system storage')
        return JsonResponse({
            'storage': output,
        })
        
    except Exception as e:
        return JsonResponse({
            'error': str(e)
        }, status=500)


def router_ospf_j2(request):
    j2 = {
        'device_type': 'juniper_junos_telnet',
        'host': '127.0.0.1',
        'port': 5001,
        'username': 'admin',
        'password': 'root123',
}
    connection = None
    output = {}

    try:
        connection = ConnectHandler(**j2)
        
        output = connection.send_command('show configuration protocols ospf')
        return JsonResponse({
            'ospf': output,
        })
        
    except Exception as e:
        return JsonResponse({
            'error': str(e)
        }, status=500)


# routeur j3
def router_mpls_route_table_j3(request):

    j3 = {
        'device_type': 'juniper_junos_telnet',
        'host': '127.0.0.1',
        'port': 5003,
        'username': 'admin',
        'password': 'root123',
}
    connection = None
    output = {}

    try:
        connection = ConnectHandler(**j3)
        
        output = connection.send_command('show route table mpls.0')
        return JsonResponse({
            'mpls': output,
        })
        
    except Exception as e:
        return JsonResponse({
            'error': str(e)
        }, status=500)


def router_routing_instances_j3(request):
    j3 = {
        'device_type': 'juniper_junos_telnet',
        'host': '127.0.0.1',
        'port': 5003,
        'username': 'admin',
        'password': 'root123',
}
    connection = None
    output = {}

    try:
        connection = ConnectHandler(**j3)
        
        output = connection.send_command('show configuration routing-instances')
        return JsonResponse({
            'vrf': output,
        })
        
    except Exception as e:
        return JsonResponse({
            'error': str(e)
        }, status=500)


def router_system_processes_j3(request):

    j3 = {
        'device_type': 'juniper_junos_telnet',
        'host': '127.0.0.1',
        'port': 5003,
        'username': 'admin',
        'password': 'root123',
        'timeout': 60, 

}
    connection = None
    output = {}

    try:
        connection = ConnectHandler(**j3)
        
        output = connection.send_command('show system processes extensive')
        return JsonResponse({
            'proc': output,
        })
        
    except Exception as e:
        return JsonResponse({
            'error': str(e)
        }, status=500)


def router_system_storage_j3(request):

    j3 = {
        'device_type': 'juniper_junos_telnet',
        'host': '127.0.0.1',
        'port': 5003,
        'username': 'admin',
        'password': 'root123',
}
    connection = None
    output = {}

    try:
        connection = ConnectHandler(**j3)
        
        output = connection.send_command('show system storage')
        return JsonResponse({
            'storage': output,
        })
        
    except Exception as e:
        return JsonResponse({
            'error': str(e)
        }, status=500)


def router_interfaces_j3(request):
    j3 = {
        'device_type': 'juniper_junos_telnet',
        'host': '127.0.0.1',
        'port': 5003,
        'username': 'admin',
        'password': 'root123',
}
    connection = None
    output = {}

    try:
        connection = ConnectHandler(**j3)

        output = connection.send_command('show interface brief')
        return JsonResponse({
            'interfaces': output,
        })
        
    except Exception as e:
        return JsonResponse({
            'error': str(e)
        }, status=500)


def router_ospf_j3(request):
    j3 = {
        'device_type': 'juniper_junos_telnet',
        'host': '127.0.0.1',
        'port': 5003,
        'username': 'admin',
        'password': 'root123',
}
    connection = None
    output = {}

    try:
        connection = ConnectHandler(**j3)
        
        output = connection.send_command('show configuration protocols ospf')
        return JsonResponse({
            'ospf': output,
        })
        
    except Exception as e:
        return JsonResponse({
            'error': str(e)
        }, status=500)


# routeur j4

def router_interfaces_j4(request):
    
    j4 = {
        'device_type': 'juniper_junos_telnet',
        'host': '127.0.0.1',
        'port': 5002,
        'username': 'admin',
        'password': 'root123',
    }
    connection = None
    output = {}

    try:
        connection = ConnectHandler(**j4)

        output = connection.send_command('show interface brief')
        return JsonResponse({
            'interfaces': output,
        })
        
    except Exception as e:
        return JsonResponse({
            'error': str(e)
        }, status=500)

def router_ospf_j4(request):

    j4 = {
        'device_type': 'juniper_junos_telnet',
        'host': '127.0.0.1',
        'port': 5002,
        'username': 'admin',
        'password': 'root123',
    }
    connection = None
    output = {}

    try:
        connection = ConnectHandler(**j4)
        
        output = connection.send_command('show configuration protocols ospf')
        return JsonResponse({
            'ospf': output,
        })
        
    except Exception as e:
        return JsonResponse({
            'error': str(e)
        }, status=500)

def router_mpls_route_table_j4(request):

    j4 = {
        'device_type': 'juniper_junos_telnet',
        'host': '127.0.0.1',
        'port': 5002,
        'username': 'admin',
        'password': 'root123',
        'timeout': 60, 
    }
    connection = None
    output = {}

    try:
        connection = ConnectHandler(**j4)
        
        output = connection.send_command('show route table mpls.0')
        return JsonResponse({
            'mpls': output,
        })
        
    except Exception as e:
        return JsonResponse({
            'error': str(e)
        }, status=500)


def router_routing_instances_j4(request):

    j4 = {
        'device_type': 'juniper_junos_telnet',
        'host': '127.0.0.1',
        'port': 5002,
        'username': 'admin',
        'password': 'root123',
        'timeout': 60, 

    }
    connection = None
    output = {}

    try:
        connection = ConnectHandler(**j4)
        
        output = connection.send_command('show configuration routing-instances')
        return JsonResponse({
            'vrf': output,
        })
        
    except Exception as e:
        return JsonResponse({
            'error': str(e)
        }, status=500)


def router_system_processes_j4(request):

    j4 = {
        'device_type': 'juniper_junos_telnet',
        'host': '127.0.0.1',
        'port': 5002,
        'username': 'admin',
        'password': 'root123',

    }
    connection = None
    output = {}

    try:
        connection = ConnectHandler(**j4)
        
        output = connection.send_command('show system processes extensive')
        return JsonResponse({
            'proc': output,
        })
        
    except Exception as e:
        return JsonResponse({
            'error': str(e)
        }, status=500)



def router_system_storage_j4(request):
    j4 = {
        'device_type': 'juniper_junos_telnet',
        'host': '127.0.0.1',
        'port': 5002,
        'username': 'admin',
        'password': 'root123',
        'timeout': 60, 
    }
    connection = None
    output = {}

    try:
        connection = ConnectHandler(**j4)
        
        output = connection.send_command('show system storage')
        return JsonResponse({
            'storage': output,
        })
        
    except Exception as e:
        return JsonResponse({
            'error': str(e)
        }, status=500)


# routeur j1
def router_interfaces_j1(request):
    
    j1 = {
    'device_type': 'juniper_junos_telnet',
    'host': '127.0.0.1',
    'port': 5000,
    'username': 'admin',
    'password': 'root123',
    
}
    try:
        connection = ConnectHandler(**j1)

        output = connection.send_command('show interface brief')
        return JsonResponse({
            'interfaces': output,
        })
        
    except Exception as e:
        return JsonResponse({
            'error': str(e)
        }, status=500)


def router_mpls_route_table_j1(request):

    j1 = {
    'device_type': 'juniper_junos_telnet',
    'host': '127.0.0.1',
    'port': 5000,
    'username': 'admin',
    'password': 'root123',
}
    connection = None
    output = {}

    try:
        connection = ConnectHandler(**j1)
        
        output = connection.send_command('show route table mpls.0')
        return JsonResponse({
            'mpls': output,
        })
        
    except Exception as e:
        return JsonResponse({
            'error': str(e)
        }, status=500)


def router_routing_instances_j1(request):

    j1 = {
    'device_type': 'juniper_junos_telnet',
    'host': '127.0.0.1',
    'port': 5000,
    'username': 'admin',
    'password': 'root123',
}
    connection = None
    output = {}

    try:
        connection = ConnectHandler(**j1)
        
        output = connection.send_command('show configuration routing-instances')
        return JsonResponse({
            'vrf': output,
        })
        
    except Exception as e:
        return JsonResponse({
            'error': str(e)
        }, status=500)


def router_system_processes_j1(request):

    j1 = {
    'device_type': 'juniper_junos_telnet',
    'host': '127.0.0.1',
    'port': 5000,
    'username': 'admin',
    'password': 'root123',
    'timeout' : 60,

}
    connection = None
    output = {}

    try:
        connection = ConnectHandler(**j1)
        
        output = connection.send_command('show system processes extensive')
        return JsonResponse({
            'proc': output,
        })
        
    except Exception as e:
        return JsonResponse({
            'error': str(e)
        }, status=500)


def router_system_storage_j1(request):

    j1 = {
    'device_type': 'juniper_junos_telnet',
    'host': '127.0.0.1',
    'port': 5000,
    'username': 'admin',
    'password': 'root123',
}
    connection = None
    output = {}

    try:
        connection = ConnectHandler(**j1)
        
        output = connection.send_command('show system storage')
        return JsonResponse({
            'storage': output,
        })
        
    except Exception as e:
        return JsonResponse({
            'error': str(e)
        }, status=500)


def router_ospf_j1(request):

    j1 = {
    'device_type': 'juniper_junos_telnet',
    'host': '127.0.0.1',
    'port': 5000,
    'username': 'admin',
    'password': 'root123',
}
    connection = None
    output = {}

    try:
        connection = ConnectHandler(**j1)
        
        output = connection.send_command('show configuration protocols ospf')
        return JsonResponse({
            'ospf': output,
        })
        
    except Exception as e:
        return JsonResponse({
            'error': str(e)
        }, status=500)


def router_bgp_j1(request):

    j1 = {
    'device_type': 'juniper_junos_telnet',
    'host': '127.0.0.1',
    'port': 5000,
    'username': 'admin',
    'password': 'root123',
}
    connection = None
    output = {}

    try:
        connection = ConnectHandler(**j1)
        
        output = connection.send_command('show configuration protocols bgp')
        return JsonResponse({
            'bgp': output,
        })
        
    except Exception as e:
        return JsonResponse({
            'error': str(e)
        }, status=500)



def router_bgp_j2(request):
    j2 = {
        'device_type': 'juniper_junos_telnet',
        'host': '127.0.0.1',
        'port': 5001,
        'username': 'admin',
        'password': 'root123',
}
    connection = None
    output = {}

    try:
        connection = ConnectHandler(**j2)
        
        output = connection.send_command('show configuration protocols bgp')
        return JsonResponse({
            'bgp': output,
        })
        
    except Exception as e:
        return JsonResponse({
            'error': str(e)
        }, status=500)




def router_bgp_j3(request):
    j3 = {
        'device_type': 'juniper_junos_telnet',
        'host': '127.0.0.1',
        'port': 5003,
        'username': 'admin',
        'password': 'root123',
}
    connection = None
    output = {}

    try:
        connection = ConnectHandler(**j3)
        
        output = connection.send_command('show configuration protocols bgp')
        return JsonResponse({
            'bgp': output,
        })
        
    except Exception as e:
        return JsonResponse({
            'error': str(e)
        }, status=500)



def router_bgp_j4(request):

    j4 = {
        'device_type': 'juniper_junos_telnet',
        'host': '127.0.0.1',
        'port': 5002,
        'username': 'admin',
        'password': 'root123',
    }
    connection = None
    output = {}

    try:
        connection = ConnectHandler(**j4)
        
        output = connection.send_command('show configuration protocols bgp')
        return JsonResponse({
            'bgp': output,
        })
        
    except Exception as e:
        return JsonResponse({
            'error': str(e)
        }, status=500)
