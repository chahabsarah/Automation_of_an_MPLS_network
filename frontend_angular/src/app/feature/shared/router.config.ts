import { MatTableDataSource } from "@angular/material/table";

export class RouterConfig {
    public id?: number;
    public host?: string;
    public port?: number;
    public username?: string;
    public password?: string;
    public hostToDisplay?;
    public portToDisplay?;
    public usernameToDisplay?;
    public passwordToDisplay?;
  
    static mapCombineData(data: RouterConfig[]): MatTableDataSource<RouterConfig> {
        data.forEach(item => {
            item.hostToDisplay = item.host;
            item.portToDisplay = item.port.toString(); // Convert port to string if needed
            item.usernameToDisplay = item.username;
            item.passwordToDisplay = item.password;
        });
        
        const combinedData = new MatTableDataSource(data);
        return combinedData;
    }
}
