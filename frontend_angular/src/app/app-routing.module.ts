import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './feature/login/login.component'; // Import LoginComponent
import { HomeComponent } from './feature/home/home.component';
import { DentalComponent } from './feature/dental/dental.component';
import { StaffComponent } from './feature/staff/staff.component';
import { AboutComponent } from './feature/about/about.component';
import { ContactComponent } from './feature/contact/contact.component';
import { AuthGuard } from '../app/nav/AuthGuard ';
import { TestingAppComponent } from './testing-app/testing-app.component';
import { ReferenceConfigurationComponent } from './feature/reference-configuration/reference-configuration.component';
import { MPLSNetworkComponent } from './feature/mpls-network/mpls-network.component';
import { RouterComponent } from './feature/router/router.component';
import { InterfacePingTestComponent } from './feature/interface-ping-test/interface-ping-test.component';
import { VrfTestComponent } from './feature/vrf-test/vrf-test.component';
import { OspfTestComponent } from './feature/ospf-test/ospf-test.component';
import { BgpTestComponent } from './feature/bgp-test/bgp-test.component';
import { CpuTestComponent } from './feature/cpu-test/cpu-test.component';
import { MemoryTestComponent } from './feature/memory-test/memory-test.component';
import { HardDiskTestComponent } from './feature/hard-disk-test/hard-disk-test.component';
import { SystemRessourcesComponent } from './feature/system-ressources/system-ressources.component';
import { MplsTestComponent } from './feature/mpls-test/mpls-test.component';
import { MplsInterfaceToTestComponent } from './feature/mpls-interface-to-test/mpls-interface-to-test.component';
import { BgpInterfaceToTestComponent } from './feature/bgp-interface-to-test/bgp-interface-to-test.component';
import { OspfInterfaceToTestComponent } from './feature/ospf-interface-to-test/ospf-interface-to-test.component';
import { VrfInterfaceToTestComponent } from './feature/vrf-interface-to-test/vrf-interface-to-test.component';
import { ComparaisonConfigComponent } from './feature/comparaison-config/comparaison-config.component';
import { ComparaisonResultComponent } from './feature/comparaison-result/comparaison-result.component';
import { LogsComponent } from './feature/logs/logs.component';
import { StatistiquesComponent } from './feature/statistiques/statistiques.component';

const routes: Routes = [
 // Redirect to LoginComponent by default
  { path: 'login', component: LoginComponent }, // Route for LoginComponent
  { path: 'home', component: HomeComponent },
  { path: 'dental', component: DentalComponent },
  { path: 'staff', component: StaffComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'refConf', component: ReferenceConfigurationComponent },
  { path: 'mpls', component: MPLSNetworkComponent },

  { path: 'router/:id', component: RouterComponent },

  { path: 'interfacePingTest', component: InterfacePingTestComponent },

  { path: 'vrf/:id', component: VrfTestComponent },
  { path: 'ospf/:id', component: OspfTestComponent },
  { path: 'bgp/:id', component: BgpTestComponent },
  { path: 'cpu', component: CpuTestComponent },
  { path: 'memory', component: MemoryTestComponent },
  { path: 'hardDisk', component: HardDiskTestComponent },
  { path: 'mpls/:id', component: MplsTestComponent },

  { path: 'vrfToTest', component: VrfInterfaceToTestComponent },
  { path: 'ospfToTest', component: OspfInterfaceToTestComponent },
  { path: 'bgpToTest', component: BgpInterfaceToTestComponent },
  { path: 'mplsToTest', component: MplsInterfaceToTestComponent },
  { path: 'conf', component: ComparaisonConfigComponent },
  { path: 'conf/:id', component: ComparaisonResultComponent },

  { path: 'ressources', component: SystemRessourcesComponent },
  { path: 'logs', component: LogsComponent },
  { path: 'stat', component: StatistiquesComponent },










  { path: 'testing', component: TestingAppComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
