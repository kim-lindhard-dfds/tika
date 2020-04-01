import { Request, Response, Application } from 'express'

export class AccessControlListsInterface {
    public configureApp(accessControlLists: AccessControlLists, app: Application) {
        
        app.post('/access-control-lists', async function (req: Request, res: Response) {

            try {
                await accessControlLists.createAccessControlList(
                    req.body.serviceAccountId as number,
                    req.body.allow as boolean,
                    req.body.operation,
                    req.body.topicPrefix,
                    req.body.consumerGroupPrefix
                );
            }
            catch (err) {
                res.status(500).json({errName: err.name, errMessage: err.message});
            }

            res.sendStatus(200);
        });

        app.post('/access-control-lists/delete', async function (req: Request, res: Response) {

            await accessControlLists.deleteAccessControlList(
                req.body.serviceAccountId as number,
                req.body.allow as boolean,
                req.body.operation,
                req.body.topicPrefix,
                req.body.consumerGroupPrefix
            );
            res.sendStatus(200);
        });

        app.get('/access-control-lists', async function (req: Request, res: Response) {

            res.json(await accessControlLists.getAccessControlLists());
        });
    }
}
