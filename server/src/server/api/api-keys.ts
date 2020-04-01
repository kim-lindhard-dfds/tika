import { Request, Response, Application } from 'express'

export class ApiKeysInterface {
    public configureApp(apiKeys: ApiKeys, app: Application) {
    
        app.post('/api-keys', async function (req: Request, res: Response) {

            let apiKey = await apiKeys.createApiKey(
                parseInt(req.body.serviceAccountId),
                req.body.description
            );
            res.json(apiKey);
        });

        app.get('/api-keys', async function (req: Request, res: Response) {

            res.json(await apiKeys.getApiKeys());
        });

        app.delete('/api-keys/:id', async function (req: Request, res: Response) {

            await apiKeys.deleteApiKey(req.params.id);

            res.sendStatus(200);
        });
    }
}
