import { TopicAlreadyExistsException, NoTopicFoundException } from "../model/error";

export class NotConnectedTopics implements Topics {

    private static instance: NotConnectedTopics;

    public static getInstance(): NotConnectedTopics {
        if (!NotConnectedTopics.instance) {
            NotConnectedTopics.instance = new NotConnectedTopics();
        }

        return NotConnectedTopics.instance;
    }

    topics: Topic[];

    constructor() {
        this.topics = [];
    }


    async getTopics(): Promise<string[]> {
        return this.topics.map(t => t.Name);
    }

    describeTopic(name: string): Promise<Topic> {
        return new Promise((resolve, reject) => {

            let topicFound = this.topics.find(t => t.Name === name);
            if (topicFound !== undefined) {
                return resolve(topicFound);
            }

            return reject(new NoTopicFoundException(name));
        });
    }

    async createTopic(topic: Topic): Promise<void> {
        return new Promise((resolve, reject) => {
            const existingTopic = this.topics.find(t => t.Name === topic.Name);
            if (existingTopic !== undefined) {

                Object
                .keys(topic.Configurations)
                .forEach(function (key){
                    if (existingTopic.Configurations[key] != topic.Configurations[key]) {
                        return reject(new TopicAlreadyExistsException());
                    }
                });
              
                return resolve();
            }
            this.topics.push(topic);
            return resolve();
        });
    }

    async deleteTopic(name: string): Promise<void> {
        this.topics = this.topics.filter(t => t.Name !== name);
    }
}
