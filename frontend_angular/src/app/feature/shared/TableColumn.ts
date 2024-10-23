export class TableColumn {
    constructor(
      public header: string,
      public property: string,
      public isVisible: boolean = true,
      public backgroundColor: number = 1
    ) {}
  }