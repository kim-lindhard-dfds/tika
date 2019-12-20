export class NotConnectedTopics implements Topics {
    
  private static instance: NotConnectedTopics;

  public static getInstance(): NotConnectedTopics {
    if (!NotConnectedTopics.instance) {
        NotConnectedTopics.instance = new NotConnectedTopics();
    }

    return NotConnectedTopics.instance;
  }
    
    getTopics(): Promise<string[]> {
        throw new Error("Method not implemented.");
    }

    createTopic(name: string, partitionCount: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

    deleteTopic(name: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
