from django.contrib.auth import authenticate, login
import json
import re
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
import telnetlib
import time
from .forms import RouterForm, NetworkConfigurationForm,SignUpForm,LoginForm
from .models import Router,NetworkConfiguration,SignUp
from .utils import write_router_logs
from django.shortcuts import get_object_or_404
from urllib.parse import unquote 
from django.contrib import messages
from django.views.decorators.http import require_POST
from rest_framework import generics
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework.response import Response
from rest_framework import status
from tutorial.quickstart.serializers import UserSerializer
from myapp.serializers import SignUpSerializer, LoginSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

def success_view(request):
    return render(request, 'success.html')

def verify_configuration_success():
    # Logic to verify configuration success/failure
    return True

telnet_connections = {}


def configure_router_view(request):
    if request.method == 'POST':
        # Parse JSON data from the request body
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            write_router_logs("Unknown", "Unknown", "Unknown", "Unknown", "Failure", "Invalid JSON data")
            return JsonResponse({"error": "Invalid JSON data"}, status=400)

        # Create a form instance with the parsed JSON data
        form = RouterForm(data)

        # Check if the form is valid
        if form.is_valid():
            # Extract form data
            host = form.cleaned_data['host']
            port = form.cleaned_data['port']
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']

            # Trigger equipment verification
            tn = access_router(host, port, username, password)
            if tn:
                report_status = trigger_equipment_verification(tn)
                if report_status != "ok":
                    write_router_logs("Unknown", "Unknown", "Unknown", "Unknown", "Failure", tn)
                    return HttpResponse("Equipment status is not ok. Please check the equipment.")


                key = f"{username}:{password}@{host}:{port}"
                telnet_connections[key] = tn

                # Save the form data to the database
                network_config = form.save(commit=False)  # Don't save to DB yet
                network_config.save()  # Now save to DB

                # Redirect to form view
                return JsonResponse({"key": key})
            else:
                write_router_logs(username, host, port, "Unknown", "Failure", "Failed to connect to the router")
                return JsonResponse({"error": "Failed to connect to the router"}, status=500)
        else:
            write_router_logs("Unknown", "Unknown", "Unknown", "Unknown", "Failure", form.errors)
            # Return errors as JSON response
            return JsonResponse({"error": "Invalid form data", "errors": form.errors}, status=400)

    


def get_router_config_by_id(request, id):
    # Retrieve the router configuration by its ID
    router_config = get_object_or_404(Router, id=id)

    
    
    # Serialize the configuration data to JSON
    config_data = {
        "id"  : router_config.id,
        "host": router_config.host,
        "port": router_config.port,
        "username": router_config.username,
        "password": router_config.password
    }
    return JsonResponse(config_data)

def get_all_router_configs(request):
    # Retrieve all router configurations
    all_configs = Router.objects.all()
    
    # Serialize all configurations to a list of JSON objects
    configs_data = []
    for config in all_configs:
        config_data = {
            "id": config.id,
            "host": config.host,
            "port": config.port,
            "username": config.username,
            "password": config.password
        }
        configs_data.append(config_data)
    
    return JsonResponse(configs_data, safe=False)


def delete_router_config(request, id):
    try:
        # Attempt to retrieve the router configuration by its ID
        router_config = Router.objects.get(id=id)
        # Delete the router configuration
        router_config.delete()
        return JsonResponse({"message": f"Router configuration with id {id} deleted successfully"})
    except Router.DoesNotExist:
        # If the router configuration with the given ID does not exist
        return JsonResponse({"error": f"Router configuration with id {id} does not exist"}, status=404)
    except Exception as e:
        # Other unexpected errors
        return JsonResponse({"error": "An error occurred while deleting the router configuration"}, status=500)


def access_router(host, port, username, password):
    try:
        tn = telnetlib.Telnet(host, port)
        print("Connected to", host)
        tn.read_until(b"Username: ", timeout=2)
        tn.write(username.encode("ascii") + b"\n")
        print("Sent username")

        time.sleep(1)

        tn.read_until(b"Password: ", timeout=2)
        # Send password
        tn.write(password.encode("ascii") + b"\n")
        print("Sent password")
           # Send commands
        tn.write(b"cli\n")
        time.sleep(2)

        response = tn.read_until(b"\n", timeout=2).decode("ascii")
        if "Login failed" in response:
            raise Exception("Login failed: " + response.strip())
        
        return tn
    except Exception as e:
        print(f"Connection error: {e}")
        return None


def trigger_equipment_verification(tn):
    report_status = "not ok"  # Default status

    try:
        # Send command via Telnet
        tn.write(b"show chassis alarms\n")
        time.sleep(2)

        # Read response
        response = tn.read_until(b"\n", timeout=2).decode("ascii")
        print("Output of 'show chassis alarms':")
        print(response)

        # Check for alarm count
        alarm_count = len(response.splitlines()) - 1  # Exclude header line
        alarm_limit = 10  # Example alarm limit
        report_status = "not ok" if alarm_count > alarm_limit else "ok"

        # Generate report
        report = f"Alarm Count: {alarm_count}, Status: {report_status}"
        print(report)

    except Exception as e:
        print("Error:", e)

    return report_status  # Return the report_status value


def get_last_router_config():
    try:
        last_config = Router.objects.latest('id')
        return last_config
    except Router.DoesNotExist:
        return None


def get_last_router_config_data():
    last_config = get_last_router_config()
    if last_config:
        host = last_config.host
        port = last_config.port
        username = last_config.username
        password = last_config.password
        key = f"{username}:{password}@{host}:{port}"
        return key
    else:
        return None, None, None, None

def my_form_view(request):
    key = get_last_router_config_data() # Extract the key from the headers

    # Retrieve Telnet session using the key
    tn = telnet_connections.get(key)

    if not tn:
        return HttpResponse("Telnet session not found. Please configure the router first.")

    if request.method == 'POST':
        # Extract JSON data from the request body
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)

        # Create a form instance with the parsed JSON data
        form = NetworkConfigurationForm(data)

        # Check if the form is valid
        if form.is_valid():
            try:
                # Extract form data
                clientname = form.cleaned_data['clientname']
                interface = form.cleaned_data['interface']
                ip_address = form.cleaned_data['ip_address']
                subnet = form.cleaned_data['subnet']
                vrf = form.cleaned_data['vrf']
                members_target = form.cleaned_data['members_target']
                route_distinguisher = form.cleaned_data['route_distinguisher']
                router_key = key

                # Check if the configuration exists in the NetworkConfiguration model
                existing_configuration = NetworkConfiguration.objects.filter(ip_address=ip_address, vrf=vrf, route_distinguisher=route_distinguisher, members_target=members_target).first()
                
                if existing_configuration:
                    # Check if the existing configuration has the same router key
                    if existing_configuration.router_key == router_key:
                        # Construct specific error message based on which field(s) already exist
                        error_messages = []
                        if existing_configuration.ip_address == ip_address:
                            error_messages.append("IP address already exists.")
                        if existing_configuration.vrf == vrf:
                            error_messages.append("VRF already exists.")
                        if existing_configuration.route_distinguisher == route_distinguisher:
                            error_messages.append("Route distinguisher already exists.")
                        if existing_configuration.members_target == members_target:
                            error_messages.append("Members target already exists.")
                        
                        error_message = ", ".join(error_messages)  # Set error message variable

                        # Render the form with the error message
                        return JsonResponse({"error": error_message}, status=400)

                # Save the form data to the database
                network_config = form.save(commit=False)  # Don't save to DB yet

                # Telnet commands
                commands = [
                    b"configure\n",
                    f"set interfaces {interface} unit 0 family inet address {ip_address}/{subnet}\n".encode("ascii"),
                    f"set routing-instances {vrf} instance-type vrf\n".encode("ascii"),
                    f"set routing-instances {vrf} route-distinguisher 1.1.1.1:{route_distinguisher}\n".encode("ascii"),
                    f"set routing-instances {vrf} vrf-table-label\n".encode("ascii"),
                    b"exit\n"
                    b"\n"
                ]
                status = 'SUCCESS'

                for cmd in commands:
                    tn.write(cmd)
                    time.sleep(2)

                    # Read the output of the command
                    output = tn.read_very_eager().decode("ascii")

                    # Check if "error" is present in the output
                    error_pattern = re.compile(r"error|missing argument", re.IGNORECASE)
                    if error_pattern.search(output):
                        status = 'FAILURE'
                        tn.write(b"exit\n")
                        time.sleep(2)
                        tn.write(b"exit\n")
                        time.sleep(2)

                        break  # Stop processing further commands
                # Create a NetworkConfiguration instance and save to the database
                network_config.router_key = router_key
                network_config.status = status
                network_config.save()

                write_router_logs(clientname, interface, ip_address, subnet, vrf, members_target, route_distinguisher, status)

                # Redirect to success page
                return JsonResponse({"success": "Configuration saved successfully"})
            except Exception as e:
                # Handle exceptions
                return JsonResponse({"error": f"Error: {e}"}, status=500)
        else:
            # Form is not valid
            return JsonResponse({"error": "Invalid form data", "errors": form.errors}, status=400)

    # If request method is not POST, return an error response
    return JsonResponse({"error": "Only POST requests are supported for this endpoint"}, status=405)



def get_network_config_by_id(request, id):
    # Retrieve the network configuration by its ID
    network_config = get_object_or_404(NetworkConfiguration, id=id)
    
    # Serialize the configuration data to JSON
    config_data = {
        "id": network_config.id,
        "clientname": network_config.clientname,
        "interface": network_config.interface,
        "ip_address": network_config.ip_address,
        "subnet": network_config.subnet,
        "vrf": network_config.vrf,
        "members_target": network_config.members_target,
        "route_distinguisher": network_config.route_distinguisher,
        "status": network_config.status,
        # Add other fields if needed
    }
    return JsonResponse(config_data)

def get_all_network_configs(request):
    # Retrieve all network configurations
    all_configs = NetworkConfiguration.objects.all()
    
    # Serialize all configurations to a list of JSON objects
    configs_data = []
    for config in all_configs:
        config_data = {
            "id": config.id,
            "clientname": config.clientname,
            "interface": config.interface,
            "ip_address": config.ip_address,
            "subnet": config.subnet,
            "vrf": config.vrf,
            "members_target": config.members_target,
            "route_distinguisher": config.route_distinguisher,
            "status": config.status,
            # Add other fields if needed
        }
        configs_data.append(config_data)
    
    return JsonResponse(configs_data, safe=False)



def write_router_logs(clientname, interface, ip_address, subnet, vrf, members_target, route_distinguisher, status):
    key = get_last_router_config_data() # Extract the key from the headers
    
    tn = telnet_connections.get(key)
    try:
        # Send command via Telnet
        tn.write(b"show system rollback 0 compare 1\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n")
        time.sleep(1)

        # Read response
        response = tn.read_until(b"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", timeout=4).decode("ascii")

        logs_start_index = response.find("show system rollback 0 compare 1")
        logs_end_index = response.rfind(">")
        logs = response[logs_start_index:logs_end_index].strip()

       
        # Déterminez le chemin complet du fichier de logs
        logfile_name = f"logsOf{clientname}.txt"
        log_file_path = f'C:\\Users\\sarra\\OneDrive\\Bureau\\nessrine\\django\\{logfile_name}'  # Remplacez par le chemin de votre fichier logs.txt

        # Ouvrez le fichier en mode ajout pour ajouter les nouveaux logs
        with open(log_file_path, 'a') as file:
            # Écrivez les informations dans le fichier
            file.write(f"Client Name: {clientname}\n")
            file.write(f"Interface: {interface}\n")
            file.write(f"IP Address: {ip_address}\n")
            file.write(f"Subnet: {subnet}\n")
            file.write(f"Status: {status}\n\n")
            file.write(f"logs: {logs}\n")

    except Exception as e:
        print("Error:", e)

    return logs


def network_configuration_view(request):
    configurations = NetworkConfiguration.objects.all()
    return render(request, 'network_configuration.html', {'configurations': configurations})


def router_configuration_view(request):
    routers = Router.objects.all()
    return render(request, 'router.html', {'routers': routers})

def get_router_config_data(request, id):
    if request.method == 'POST':
        router_config = get_object_or_404(Router, id=id)
        if router_config:
            host = router_config.host
            port = router_config.port
            username = router_config.username
            password = router_config.password
            key = f"{username}:{password}@{host}:{port}"
            tn = access_router(host, port, username, password)
            if tn:
                report_status = trigger_equipment_verification(tn)
                if report_status != "ok":
                    write_router_logs(host, port, username, password, "Failure", tn)
                    return JsonResponse({"error": "Equipment status is not ok. Please check the equipment."}, status=500)
                else:
                    # If everything is fine, return router configuration data in JSON
                    return JsonResponse({"key": key, "host": host, "port": port, "username": username, "password": password})
            else:
                return JsonResponse({"error": "Unable to access router."}, status=500)
        else:
            return JsonResponse({"error": "Router not found"}, status=404)
    else:
        return JsonResponse({"error": "Method not allowed. Use POST request."}, status=405)
    
    
    # views.py



User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = SignUpSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)  # Cela va lancer une exception si la validation échoue
        
        # Save the new user
        user = serializer.save()
        return Response({'success': True, 'message': 'Signup successful'}, status=status.HTTP_201_CREATED)
class LoginView(TokenObtainPairView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        username = serializer.validated_data['username']
        password = serializer.validated_data['password']
        user = authenticate(request, username=username, password=password)

        if user is not None:
            # Generate access and refresh tokens
            access = AccessToken.for_user(user)

            # You can also include user roles or permissions in the response
            response_data = {
                'access': str(access),
                'is_admin': user.is_superuser and user.is_staff, 
                'is_technician': not user.is_superuser and not user.is_staff
            }
            return Response(response_data, status=status.HTTP_200_OK)

        return Response({'error': 'Nom d utilisateur ou mot de passe incorrect'}, status=status.HTTP_400_BAD_REQUEST)

