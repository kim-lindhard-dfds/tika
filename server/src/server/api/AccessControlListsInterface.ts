import { Request, Response, Application, NextFunction } from 'express'

export class AccessControlListsInterface {
    public configureApp(accessControlLists: AccessControlLists, app: Application) {
        
        app.post('/access-control-lists', async function (req: Request, res: Response, next : NextFunction) {

            try {
                await accessControlLists.createAccessControlList(
                    req.body.serviceAccountId as number,
                    req.body.allow as boolean,
                    req.body.operation,
                    req.body.topicPrefix,
                    req.body.consumerGroupPrefix
                );

                res.sendStatus(200);
            }
            catch (err) {
                next(err);
            }
        });

        app.post('/access-control-lists/delete', async function (req: Request, res: Response, next : NextFunction) {

            try {
                await accessControlLists.deleteAccessControlList(
                    req.body.serviceAccountId as number,
                    req.body.allow as boolean,
                    req.body.operation,
                    req.body.topicPrefix,
                    req.body.consumerGroupPrefix
                );
                res.sendStatus(200);
            }
            catch (err) {
                next(err);
            }
        });

        app.get('/access-control-lists', async function (req: Request, res: Response, next : NextFunction) {

            try {
                res.json(await accessControlLists.getAccessControlLists());
            }
            catch (err) {
                next(err);
            }
        });
    }
}
