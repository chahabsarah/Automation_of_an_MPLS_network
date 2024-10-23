import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTreeModule } from '@angular/material/tree';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HomeComponent } from './home/home.component';
import { DentalComponent } from './dental/dental.component';
import { StaffComponent } from './staff/staff.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { RouterModalComponent } from './dental/router-modal/router-modal.component';
import { NetworkModalComponentComponent } from './staff/network-modal-component/network-modal-component.component';
import { LoginComponent } from './login/login.component';
import { TestingAppComponent } from '../testing-app/testing-app.component';
import { ReferenceConfigurationComponent } from './reference-configuration/reference-configuration.component';
import { MPLSNetworkComponent } from './mpls-network/mpls-network.component';
import { RouterComponent } from './router/router.component';
import { Router } from '@angular/router';
import { InterfacePingTestComponent } from './interface-ping-test/interface-ping-test.component';
import { VrfTestComponent } from './vrf-test/vrf-test.component';
import { OspfTestComponent } from './ospf-test/ospf-test.component';
import { BgpTestComponent } from './bgp-test/bgp-test.component';
import { MplsTestComponent } from './mpls-test/mpls-test.component';
import { SystemRessourcesComponent } from './system-ressources/system-ressources.component';
import { CpuTestComponent } from './cpu-test/cpu-test.component';
import { MemoryTestComponent } from './memory-test/memory-test.component';
import { HardDiskTestComponent } from './hard-disk-test/hard-disk-test.component';
import { BgpInterfaceToTestComponent } from './bgp-interface-to-test/bgp-interface-to-test.component';
import { OspfInterfaceToTestComponent } from './ospf-interface-to-test/ospf-interface-to-test.component';
import { VrfInterfaceToTestComponent } from './vrf-interface-to-test/vrf-interface-to-test.component';
import { MplsInterfaceToTestComponent } from './mpls-interface-to-test/mpls-interface-to-test.component';
import { ComparaisonConfigComponent } from './comparaison-config/comparaison-config.component';
import { ComparaisonResultComponent } from './comparaison-result/comparaison-result.component';
import { LogsComponent } from './logs/logs.component';
import { StatistiquesComponent } from './statistiques/statistiques.component';

@NgModule({
  declarations: [
    HomeComponent,
    DentalComponent,
    StaffComponent,
    AboutComponent,
    ContactComponent,
    RouterModalComponent,
    NetworkModalComponentComponent,
    LoginComponent,
    TestingAppComponent,
    ReferenceConfigurationComponent,
    MPLSNetworkComponent,
    RouterComponent,
    InterfacePingTestComponent,
    VrfTestComponent,
    OspfTestComponent,
    BgpTestComponent,
    MplsTestComponent,
    SystemRessourcesComponent,
    CpuTestComponent,
    MemoryTestComponent,
    HardDiskTestComponent,
    BgpInterfaceToTestComponent,
    OspfInterfaceToTestComponent,
    VrfInterfaceToTestComponent,
    MplsInterfaceToTestComponent,
    ComparaisonConfigComponent,
    ComparaisonResultComponent,
    LogsComponent,
    StatistiquesComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatMenuModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatTabsModule,
    MatExpansionModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatSortModule,
    MatTreeModule,
    MatProgressBarModule,
    MatTooltipModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    LoginComponent,
    HomeComponent,
    DentalComponent,
    StaffComponent,
    AboutComponent,
    ContactComponent,
    TestingAppComponent,
    ReferenceConfigurationComponent,
    MPLSNetworkComponent,
    RouterComponent,
    InterfacePingTestComponent,
    VrfTestComponent,
    OspfTestComponent,
    BgpTestComponent,
    MplsTestComponent,
    SystemRessourcesComponent,
    CpuTestComponent,
    MemoryTestComponent,
    HardDiskTestComponent,
    BgpInterfaceToTestComponent,
    OspfInterfaceToTestComponent,
    VrfInterfaceToTestComponent,
    MplsInterfaceToTestComponent,
    ComparaisonConfigComponent,
    ComparaisonResultComponent,
    LogsComponent,
    StatistiquesComponent



  ]
})
export class FeatureModule { }
