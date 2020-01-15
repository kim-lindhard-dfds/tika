import { Request, Response, Application } from 'express'

export class AccessControlListsInterface {
    public configureApp(accessControlLists: AccessControlLists, app: Application) {
        
        app.post('/access-control-lists', async function (req: Request, res: Response) {
            console.log('post /access-control-lists');

            await accessControlLists.createAccessControlList(
                req.body.serviceAccountId as number,
                req.body.allow as boolean,
                req.body.operation,
                req.body.topicPrefix,
                req.body.consumerGroupPrefix
            );
            res.sendStatus(200);
        });

        app.post('/access-control-lists/delete', async function (req: Request, res: Response) {
            console.log('delete /access-control-lists/delete');

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
            console.log('get /access-control-lists');

            res.json(await accessControlLists.getAccessControlLists());
        });
    }
}
