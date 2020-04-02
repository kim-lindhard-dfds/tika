import { Request, Response, Application, NextFunction } from 'express'
import {TopicAlreadyExistsException} from "../wrapper/model/error";
import { transcode } from 'buffer';

export class TopicsInterface {

    public configureApp(topic: Topics, app: Application) {

        app.get('/topics', async function (req: Request, res: Response, next : NextFunction) {

            try {
                res.json(await topic.getTopics());
            }
            catch (err) {
                next(err);
            }
        });

        app.post('/topics', async function (req: Request, res: Response, next : NextFunction) {
            let good : boolean = true;

            try {
                await topic.createTopic(
                    req.body.name,
                    parseInt(req.body.partitionCount),
                );
            }
            catch (err) {
                next(err);
                good = false;
            }


            if (good) {
                res.sendStatus(200);
            }
        });

        app.delete('/topics/:name', async function (req: Request, res: Response, next : NextFunction) {
            
            try {
                await topic.deleteTopic(
                    req.params.name,
                );
    
                res.sendStatus(200);
            }
            catch (err) {
                next(err);
            }
        });
    }
}