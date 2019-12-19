import { Request, Response, Application } from 'express'

export class AccessControlListsInterface {
    public configureApp(accessControlLists: AccessControlLists, app: Application) {
        
        app.post('/access-control-lists', async function (req: Request, res: Response) {
            console.log('post /service-accounts');

            let newServiceAccount = await accessControlLists.createAccessControlList(
                req.body.serviceAccountId as number,
                req.body.allow as boolean,
                req.body.operation,
                req.body.topicPrefix,
            );
            res.json(newServiceAccount);
        });

        app.get('/access-control-lists', async function (req: Request, res: Response) {
            console.log('get /access-control-lists');

            res.json(await accessControlLists.getAccessControlLists());
        });
    }
}

/* 
createAccessControlLis(
    serviceAccountId: number, 
    allow: boolean, 
    operation: string, 
    topicPrefix: string
  ): Promise<void> { */