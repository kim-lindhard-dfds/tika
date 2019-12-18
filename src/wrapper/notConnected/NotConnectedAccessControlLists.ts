export class NotConnectedAccessControlLists implements AccessControlLists {
  private static instance: NotConnectedAccessControlLists;


  public static getInstance(): AccessControlLists {
      if (!NotConnectedAccessControlLists.instance) {
        NotConnectedAccessControlLists.instance = new NotConnectedAccessControlLists();
      }

      return NotConnectedAccessControlLists.instance;
  }

  
  getAccessControlLists(): Promise<AccessControlList[]> {
      throw new Error("Method not implemented.");
    }
  }