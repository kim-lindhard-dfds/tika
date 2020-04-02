import { Request, Response, Application } from 'express'
import { TopicAlreadyExistsException } from "../wrapper/model/error";

export class TopicsInterface {

    public configureApp(topics: Topics, app: Application) {

        app.get('/topics', async function (req: Request, res: Response) {
            console.log('get /topics');

            res.json(await topics.getTopics());
        });

        app.get('/topics/:name', async function (req: Request, res: Response) {
            console.log('get /topics/' + req.params.name);
            var topic = await topics.describeTopic(req.params.name);
            res.json(topic);
        });

        app.post('/topics', async function (req: Request, res: Response) {
            console.log('post /topics');
            let good: boolean = true;

            const topic = req.body as Topic;

            try {
                await topics.createTopic(topic);
            }
            catch (err) {
                console.log(err);
                if (err.name.valueOf() === new TopicAlreadyExistsException().name.valueOf()) {
                    res.status(409).json({ errName: err.name, errMessage: err.message });
                } else {
                    res.status(500).json({ errName: err.name, errMessage: err.message });
                }

                good = false;
            }


            if (good) {
                res.sendStatus(200);
            }
        });

        app.delete('/topics/:name', async function (req: Request, res: Response) {
            console.log('delete /topics/' + req.params.name);

            await topics.deleteTopic(
                req.params.name,
            );

            res.sendStatus(200);
        });
    }
}