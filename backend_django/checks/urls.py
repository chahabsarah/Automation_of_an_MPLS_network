from django.urls import path
from .views import (
    router_interfaces_r1,
    router_interfaces_r2,
    router_interfaces_r3,
    router_interfaces_r4,
    router_interfaces_j1,
    router_interfaces_j2,
    router_interfaces_j3,
    router_interfaces_j4,

)
from checks.views import router_ospf_j2, router_bgp_j2, router_ospf_j3,\
    router_bgp_j3, router_ospf_j1, router_ospf_j4, router_bgp_j4,\
    router_mpls_route_table_j2, router_mpls_route_table_j1,\
    router_mpls_route_table_j4, router_mpls_route_table_j3,\
    router_routing_instances_j4, router_routing_instances_j3,\
    router_routing_instances_j2, router_routing_instances_j1,\
    router_system_storage_j2, router_system_storage_j3, router_system_storage_j4,\
    router_system_storage_j1, router_system_memory_j2, router_system_memory_j3,\
    router_system_memory_j4, router_system_memory_j1, router_system_processes_j2,\
    router_system_processes_j3, router_system_processes_j4,\
    router_system_processes_j1, router_bgp_j1

urlpatterns = [
    # interfaces done
    path('router/r1/', router_interfaces_r1, name='router_r1'),
    path('router/r2/', router_interfaces_r2, name='router_r2'),
    path('router/r3/', router_interfaces_r3, name='router_r3'),
    path('router/r4/', router_interfaces_r4, name='router_r4'),
    path('router/j1/', router_interfaces_j1, name='router_j1'),
    path('router/j2/', router_interfaces_j2, name='router_j2'),
    path('router/j3/', router_interfaces_j3, name='router_j3'),
    path('router/j4/', router_interfaces_j4, name='router_j4'),
    
    #ospf done
    path('router/j4/ospf/', router_ospf_j4, name='ospf_j4'),
    path('router/j3/ospf/', router_ospf_j3, name='ospf_j3'),
    path('router/j2/ospf/', router_ospf_j2, name='ospf_j2'),
    path('router/j1/ospf/', router_ospf_j1, name='ospf_j1'),
    #bgp done
    path('router/j4/bgp/', router_bgp_j4, name='bgp_j4'),
    path('router/j3/bgp/', router_bgp_j3, name='bgp_j3'),
    path('router/j2/bgp/', router_bgp_j2, name='bgp_j2'),
    path('router/j1/bgp/', router_bgp_j1, name='bgp_j1'),
    #mpls done
    path('router/j1/mpls/', router_mpls_route_table_j1, name='mpls_j1'),
    path('router/j4/mpls/', router_mpls_route_table_j4, name='mpls_j4'),
    path('router/j3/mpls/', router_mpls_route_table_j3, name='mpls_j3'),
    path('router/j2/mpls/', router_mpls_route_table_j2, name='mpls_j2'),
    #vrf done
    path('router/j1/vrf/', router_routing_instances_j1, name='vrf_j1'),
    path('router/j4/vrf/', router_routing_instances_j4, name='vrf_j4'),
    path('router/j3/vrf/', router_routing_instances_j3, name='vrf_j3'),
    path('router/j2/vrf/', router_routing_instances_j2, name='vrf_j2'),
    #system process
    path('router/j1/sp/', router_system_processes_j1, name='sp_j1'),
    path('router/j4/sp/', router_system_processes_j4, name='sp_j4'),
    path('router/j3/sp/', router_system_processes_j3, name='sp_j3'),
    path('router/j2/sp/', router_system_processes_j2, name='sp_j2'),
    #system memory
    path('router/j1/sm/', router_system_memory_j1, name='sm_j1'),
    path('router/j4/sm/', router_system_memory_j4, name='sm_j4'),
    path('router/j3/sm/', router_system_memory_j3, name='sm_j3'),
    path('router/j2/sm/', router_system_memory_j2, name='sm_j2'),
    #system storage
    path('router/j1/ss/', router_system_storage_j1, name='ss_j1'),
    path('router/j4/ss/', router_system_storage_j4, name='ss_j4'),
    path('router/j3/ss/', router_system_storage_j3, name='ss_j3'),
    path('router/j2/ss/', router_system_storage_j2, name='ss_j2'),
]
