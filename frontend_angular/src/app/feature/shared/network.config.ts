import { MatTableDataSource } from "@angular/material/table";


export class NetworkConfiguration {
    public id?: number;
    public clientname?: string;
    public interface?: string;
    public ip_address?: string;
    public subnet?: string;
    public vrf?: string;
    public members_target?: string;
    public route_distinguisher?: string;
    public status?: string;
    public clientnameToDisplay?;
    public interfaceToDisplay?;
    public ipadressToDisplay?;
    public subnetToDisplay?;
    public vrfToDisplay?;
    public memebertargetToDisplay?;
    public routedisToDisplay?;
    public statusToDisplay?;
    static mapCombineData(data: NetworkConfiguration[]): MatTableDataSource<NetworkConfiguration> {
        data.forEach(item => {
            item.clientnameToDisplay = item.clientname;
            item.interfaceToDisplay = item.interface;
            item.ipadressToDisplay = item.ip_address;
            item.subnetToDisplay = item.subnet;
            item.vrfToDisplay = item.vrf;
            item.memebertargetToDisplay = item.members_target;
            item.routedisToDisplay = item.route_distinguisher;
            item.statusToDisplay = item.status;
        });
        
        const combinedData = new MatTableDataSource(data);
        return combinedData;
    }
}
