import { Request, Response, Application } from 'express'
import {CcloudTopicAlreadyExistsException} from "../wrapper/model/error";
import { transcode } from 'buffer';

export class TopicsInterface {

    public configureApp(topic: Topics, app: Application) {

        app.get('/topics', async function (req: Request, res: Response) {
            console.log('get /topics');

            res.json(await topic.getTopics());
        });

        app.post('/topics', async function (req: Request, res: Response) {
            console.log('post /topics');
            let good : boolean = true;

            try {
                await topic.createTopic(
                    req.body.name,
                    parseInt(req.body.partitionCount),
                );
            }
            catch (err) {
                console.log(err);
                if (err.name.valueOf() === new CcloudTopicAlreadyExistsException().name.valueOf()) {
                    res.status(409).json({errName: err.name, errMessage: err.message});
                } else {
                    res.status(500).json({errName: err.name, errMessage: err.message});
                }

                good = false;
            }


            if (good) {
                res.sendStatus(200);
            }
        });

        app.delete('/topics/:name', async function (req: Request, res: Response) {
            console.log('delete /topics/' + req.params.name);

            await topic.deleteTopic(
                req.params.name,
            );

            res.sendStatus(200);
        });
    }
}