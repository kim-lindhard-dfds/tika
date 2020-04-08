import { Request, Response, Application, NextFunction } from 'express'

export class TopicsInterface {

    public configureApp(topics: Topics, app: Application) {

        app.get('/topics', async function (req: Request, res: Response, next: NextFunction) {

            try {
                res.json(await topics.getTopics());
            }
            catch (err) {
                next(err);
            }
        });

        app.get('/topics/:name', async function (req: Request, res: Response, next: NextFunction) {

            try {
                var topic = await topics.describeTopic(req.params.name);
                res.json(topic);
            }
            catch (err) {
                next(err);
            }
        });

        app.post('/topics', async function (req: Request, res: Response, next: NextFunction) {

            const topic = req.body as Topic;
            let good: boolean = true;

            try {
                await topics.createTopic(topic);
            }
            catch (err) {
                next(err);
                good = false;
            }


            if (good) {
                res.sendStatus(200);
            }
        });

        app.delete('/topics/:name', async function (req: Request, res: Response, next: NextFunction) {

            try {
                await topics.deleteTopic(
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