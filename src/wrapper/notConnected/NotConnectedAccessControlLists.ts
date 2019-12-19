export class NotConnectedAccessControlLists implements AccessControlLists {
 
  private static instance: NotConnectedAccessControlLists;


  public static getInstance(): AccessControlLists {
      if (!NotConnectedAccessControlLists.instance) {
        NotConnectedAccessControlLists.instance = new NotConnectedAccessControlLists();
      }

      return NotConnectedAccessControlLists.instance;
  }

  createAccessControlList(
    serviceAccountId: number, 
    allow: boolean, 
    operation: string, 
    topicPrefix: string
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }

  getAccessControlLists(): Promise<AccessControlList[]> {
      throw new Error("Method not implemented.");
    }
  }