import {CcloudTopicAlreadyExistsException} from "../model/error";

export class NotConnectedTopics implements Topics {

    private static instance: NotConnectedTopics;

    public static getInstance(): NotConnectedTopics {
        if (!NotConnectedTopics.instance) {
            NotConnectedTopics.instance = new NotConnectedTopics();
        }

        return NotConnectedTopics.instance;
    }

    topics: string[];

    constructor() {
        this.topics = [];
    }

    async getTopics(): Promise<string[]> {
        return this.topics;
    }

    async createTopic(name: string, partitionCount: number): Promise<void> {
        let theTopicExists = this.topics.indexOf(name) !== -1;
        if (theTopicExists) {
            throw new CcloudTopicAlreadyExistsException();
        }

        this.topics.push(name);
    }

    async deleteTopic(name: string): Promise<void> {
        this.topics = this.topics.filter(t => t !== name);
    }
}
